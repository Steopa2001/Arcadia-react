import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CatalogPage = ({ fixedCategoryId }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  // stato ordinamento
  const [sortOption, setSortOption] = useState("name_asc");

  // carica prodotti
  useEffect(() => {
    axios.get("http://localhost:3000/products").then((res) => {
      setAllProducts(res.data);
    });
  }, []);

  // filtro per categoria
  const productsByCategory = fixedCategoryId
    ? allProducts.filter(
        (product) => String(product.category_id) === String(fixedCategoryId)
      )
    : allProducts;

  // filtro per nome
  const filteredProducts = productsByCategory.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ordinamento su nome/prezzo
  // parto dalla lista dei prodotti già filtrati
  let sortedProducts = [...filteredProducts];

  // se l'utente sceglie "Nome dalla A alla Z"
  if (sortOption === "name_asc") {
    sortedProducts.sort(function (firstProduct, secondProduct) {
      // confronto i nomi in ordine alfabetico
      if (firstProduct.name < secondProduct.name) {
        return -1; // il primo resta prima
      }

      if (firstProduct.name > secondProduct.name) {
        return 1; // il primo va dopo
      }

      return 0; // i nomi sono uguali
    });
  }

  // se l'utente sceglie "Nome dalla Z alla A"
  if (sortOption === "name_desc") {
    sortedProducts.sort(function (firstProduct, secondProduct) {
      // qui faccio l'opposto: i nomi che vengono dopo devono stare prima
      if (firstProduct.name > secondProduct.name) {
        return -1; // sposto in alto
      }

      if (firstProduct.name < secondProduct.name) {
        return 1; // sposto in basso
      }

      return 0; // i nomi sono uguali
    });
  }

  // se l'utente sceglie "Prezzo crescente"
  if (sortOption === "price_asc") {
    sortedProducts.sort(function (firstProduct, secondProduct) {
      // metto prima i prodotti con prezzo più basso
      return firstProduct.price - secondProduct.price;
    });
  }

  // se l'utente sceglie "Prezzo decrescente"
  if (sortOption === "price_desc") {
    sortedProducts.sort(function (firstProduct, secondProduct) {
      // metto prima i prodotti con prezzo più alto
      return secondProduct.price - firstProduct.price;
    });
  }

  return (
    <div className="container py-4">
      {/* barra superiore: search + controlli vista + select ordinamento in linea */}
      <div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-3">
        {/* blocco ricerca */}
        <div className="flex-grow-1">
          <label className="form-label">Cerca</label>
          <input
            id="search"
            type="text"
            className="form-control"
            placeholder="Cerca un prodotto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* blocco per scegliere la visualizzazione + select ordinamento */}
        <div className="d-flex align-items-center gap-3">
          {/* vista */}
          <div className="d-flex align-items-center gap-2">
            <span className="fw-semibold text-uppercase">Visualizza</span>
            <button
              type="button"
              className={`btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              Griglia
            </button>
            <button
              type="button"
              className={`btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              Lista
            </button>
          </div>

          {/*select ordinamento  */}
          <div>
            <label className="form-label mb-0 small">Ordina per</label>
            <select
              className="form-select form-select-sm"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="name_asc">Nome A-Z</option>
              <option value="name_desc">Nome Z-A</option>
              <option value="price_asc">Prezzo crescente</option>
              <option value="price_desc">Prezzo decrescente</option>
            </select>
          </div>
        </div>
      </div>

      {/* lista prodotti */}
      {viewMode === "grid" ? (
        <div className="row g-3">
          {sortedProducts.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100">
                <Link
                  to={`/dettaglio-prodotto/${product.slug}`}
                  className="text-decoration-none"
                  style={{ color: "inherit" }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-img-top"
                    loading="lazy"
                    style={{
                      height: "250px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Link>

                <div className="card-body">
                  <h6 className="card-title mb-2">{product.name}</h6>
                  <div className="fw-bold">
                    € {Number(product.price).toFixed(2)}
                  </div>
                </div>

                {/* footer con bottone carrello */}
                <div className="card-footer bg-white border-0">
                  <button
                    type="button"
                    className="btn btn-dark btn-sm w-100"
                    onClick={() => {
                      // aggiunge al carrello via api
                      axios.post("http://localhost:3000/cart", product);
                      // avviso semplice
                      alert(`${product.name} è stato aggiunto al carrello`);
                    }}
                  >
                    Aggiungi al carrello
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="vstack gap-2">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded p-3 d-flex gap-3 align-items-center"
            >
              <Link to={`/dettaglio-prodotto/${product.slug}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                />
              </Link>

              <div className="flex-grow-1">
                <Link
                  to={`/dettaglio-prodotto/${product.slug}`}
                  className="text-decoration-none text-dark"
                >
                  <h5 className="mb-1">{product.name}</h5>
                </Link>
                <div className="text-muted">{product.description}</div>
              </div>

              <div className="fw-bold text-end" style={{ minWidth: 120 }}>
                € {Number(product.price).toFixed(2)}
              </div>

              <div style={{ minWidth: 180 }}>
                <button
                  type="button"
                  className="btn btn-dark btn-sm w-100"
                  onClick={() => {
                    // aggiunge al carrello via api
                    axios.post("http://localhost:3000/cart", product);
                    // avviso semplice
                    alert(`${product.name} è stato aggiunto al carrello`);
                  }}
                >
                  Aggiungi al carrello
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* nessun risultato */}
      {sortedProducts.length === 0 && (
        <div className="py-5 text-center text-muted">
          Nessun prodotto trovato
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
