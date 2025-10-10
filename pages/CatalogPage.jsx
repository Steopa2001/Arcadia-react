import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CartContext from "../src/contexts/cartContext";

const CatalogPage = ({ fixedCategoryId }) => {
  // stato che contiene tutti i prodotti caricati
  const [allProducts, setAllProducts] = useState([]);

  // stato per il termine di ricerca
  const [searchTerm, setSearchTerm] = useState("");

  // stato per la modalità di visualizzazione (griglia o lista)
  const [viewMode, setViewMode] = useState("grid");

  // stato per l'opzione di ordinamento selezionata
  const [sortOption, setSortOption] = useState("name_asc");

  const { numberCart, setNumberCart } = useContext(CartContext)

  // carica i prodotti dal backend al primo render
  useEffect(() => {
    axios.get("http://localhost:3000/products").then((res) => {
      setAllProducts(res.data);
    });
  }, []);

  // filtro per categoria (se viene passato un fixedCategoryId)
  const productsByCategory = fixedCategoryId
    ? allProducts.filter(
      (product) => String(product.category_id) === String(fixedCategoryId)
    )
    : allProducts;

  // filtro per nome del prodotto (ricerca)
  const filteredProducts = productsByCategory.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // array ordinato da visualizzare (partendo dai prodotti filtrati)
  let sortedProducts = [...filteredProducts];

  // ordinamento alfabetico A-Z
  if (sortOption === "name_asc") {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  // ordinamento alfabetico Z-A
  if (sortOption === "name_desc") {
    sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
  }

  // ordinamento prezzo crescente
  if (sortOption === "price_asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  // ordinamento prezzo decrescente
  if (sortOption === "price_desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="container py-4">
      {/* barra superiore: search + controlli vista + select ordinamento in linea */}
      <div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-3 controls-bar">
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
          {/* vista (griglia / lista) */}
          <div className="d-flex align-items-center gap-2 view-mode">
            <button
              type="button"
              className={`view-toggle ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <i className="fa-solid fa-grip"></i>
            </button>
            <button
              type="button"
              className={`view-toggle ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <i className="fa-solid fa-list"></i>
            </button>
          </div>

          {/* select ordinamento */}
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
                {/* immagine e link al dettaglio prodotto */}
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

                {/* corpo card con nome e prezzo */}
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
                      // aggiunge al carrello via API
                      axios.post("http://localhost:3000/cart", product);
                      setNumberCart(numberCart + 1)
                      // avviso semplice all’utente
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
        // modalità lista
        <div className="vstack gap-2">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded p-3 d-flex gap-3 align-items-center"
            >
              {/* immagine e link al dettaglio prodotto */}
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

              {/* descrizione e nome */}
              <div className="flex-grow-1">
                <Link
                  to={`/dettaglio-prodotto/${product.slug}`}
                  className="text-decoration-none text-dark"
                >
                  <h5 className="mb-1">{product.name}</h5>
                </Link>
                <div className="text-muted">{product.description}</div>
              </div>

              {/* prezzo + bottone carrello */}
              <div className="fw-bold text-end" style={{ minWidth: 120 }}>
                € {Number(product.price).toFixed(2)}
              </div>

              <div style={{ minWidth: 180 }}>
                <button
                  type="button"
                  className="btn btn-dark btn-sm w-100"
                  onClick={() => {
                    // aggiunge al carrello via API
                    axios.post("http://localhost:3000/cart", product);
                    setNumberCart(numberCart + 1)
                    // avviso semplice all’utente
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

      {/* messaggio se nessun prodotto viene trovato */}
      {sortedProducts.length === 0 && (
        <div className="py-5 text-center text-muted">
          Nessun prodotto trovato
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
