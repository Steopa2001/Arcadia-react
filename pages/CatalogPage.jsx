import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// pagina catalogo riutilizzabile
export default function CatalogPage({ fixedCategoryId }) {
  // stato prodotti
  const [allProducts, setAllProducts] = useState([]);
  // stato ui
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortOption, setSortOption] = useState("name_asc");
  const [searchTerm, setSearchTerm] = useState("");

  // carica prodotti
  useEffect(() => {
    setIsLoading(true);
    setErrorMessage("");
    axios
      .get("http://localhost:3000/products")
      .then((response) => setAllProducts(Array.isArray(response.data) ? response.data : []))
      .catch((error) => setErrorMessage(error.message || "Errore caricamento prodotti"))
      .finally(() => setIsLoading(false));
  }, []);

  // copia modificabile
  let visibleProducts = Array.isArray(allProducts) ? allProducts.slice() : [];

  // filtro per categoria con SOLO category_id
  if (fixedCategoryId != null) {
    visibleProducts = visibleProducts.filter((product) => {
      return String(product.category_id) === String(fixedCategoryId);
    });
  }

  // filtro ricerca
  if (searchTerm) {
    const searchQuery = searchTerm.trim().toLowerCase();
    visibleProducts = visibleProducts.filter((product) => {
      const matchesName = product.name && String(product.name).toLowerCase().includes(searchQuery);
      const matchesPrice = String(product.price).includes(searchQuery);
      return matchesName || matchesPrice;
    });
  }

  // ordinamento
  const [sortKey, sortDirection] = String(sortOption).split("_");
  visibleProducts.sort((productA, productB) => {
    const valueA = sortKey === "price" ? Number(productA.price) : String(productA.name || "");
    const valueB = sortKey === "price" ? Number(productB.price) : String(productB.name || "");
    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // ui
  return (
    <div className="container py-4">
      {/* controlli */}
      <div className="d-flex flex-wrap align-items-end gap-3 mb-4">
        {/* ricerca */}
        <div className="flex-grow-1">
          <label htmlFor="searchProducts" className="form-label mb-1">Cerca</label>
          <input
            id="searchProducts"
            className="form-control"
            placeholder="Cerca un prodotto..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        {/* vista */}
        <div className="d-flex align-items-center gap-2">
          <span className="fw-semibold text-uppercase">Visualizza</span>
          <button
            type="button"
            className={`btn btn-outline-dark ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            Griglia
          </button>
          <button
            type="button"
            className={`btn btn-outline-dark ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
          >
            Lista
          </button>
        </div>

        {/* ordina */}
        <div className="ms-auto">
          <label className="form-label mb-1">Ordina per</label>
          <select
            className="form-select"
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
          >
            <option value="name_asc">Nome A-Z</option>
            <option value="name_desc">Nome Z-A</option>
            <option value="price_asc">Prezzo crescente</option>
            <option value="price_desc">Prezzo decrescente</option>
          </select>
        </div>

        {/* conteggio */}
        <div className="text-muted">{visibleProducts.length} risultati</div>
      </div>

      {/* stati */}
      {isLoading && <div className="py-5">Caricamento…</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {!isLoading && !errorMessage && visibleProducts.length === 0 && (
        <div className="py-5">Nessun prodotto trovato.</div>
      )}

      {/* lista prodotti */}
      {!isLoading && !errorMessage && visibleProducts.length > 0 && (
        viewMode === "grid" ? (
          <div className="row g-3">
            {visibleProducts.map((product) => (
              <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100" style={{ border: "1px solid #e5e5e5" }}>
                  <Link to={`/dettaglio-prodotto/${product.slug}`} className="text-decoration-none" style={{ color: "inherit" }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="card-img-top"
                      loading="lazy"
                      style={{ height: "250px", width: "100%", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h6 className="card-title mb-2">{product.name}</h6>
                      <div className="fw-bold">€ {Number(product.price).toFixed(2)}</div>
                    </div>
                  </Link>
                  <div className="card-footer bg-white border-0">
                    <button type="button" className="btn btn-dark btn-sm w-100" onClick={() => {
                      axios.post('http://localhost:3000/cart', product);
                      alert(`${product.name} è stato aggiunto al carrello`)
                    }}>
                      Aggiungi al carrello
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="vstack gap-2">
            {visibleProducts.map((product) => (
              <div key={product.id} className="border rounded p-3 d-flex gap-3 align-items-center">
                <Link to={`/dettaglio-prodotto/${product.slug}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: 6 }}
                  />
                </Link>
                <div className="flex-grow-1">
                  <Link to={`/dettaglio-prodotto/${product.slug}`} className="text-decoration-none text-dark" style={{ fontWeight: 500 }}>
                    <h6 className="mb-1">{product.name}</h6>
                  </Link>
                </div>
                <div className="fw-bold" style={{ minWidth: 120, textAlign: "right" }}>
                  € {Number(product.price).toFixed(2)}
                </div>
                <div style={{ minWidth: 180, textAlign: "right" }}>
                  <button type="button" className="btn btn-dark btn-sm">
                    Aggiungi al carrello
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
