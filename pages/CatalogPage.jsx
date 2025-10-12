import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import CartContext from "../src/contexts/cartContext";

const CatalogPage = () => {
  const { slug } = useParams();

  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortOption, setSortOption] = useState("name_asc");

  const { numberCart, setNumberCart } = useContext(CartContext);

  const handleAddToWishlist = (product) => {
    axios
      .post("http://localhost:3000/wishlist", product)
      .then(() => {
        alert(`${product.name} è stato aggiunto alla wishlist 💖`);
      })
      .catch((err) => {
        if (err.response?.status === 409) {
          alert("Questo prodotto è già nella tua wishlist!");
        } else {
          console.error("Errore aggiunta wishlist:", err);
          alert("Errore durante l'aggiunta alla wishlist");
        }
      });
  };
  //Definisco una funzione che, quando viene chiamata, carica i prodotti dal back-end
  function loadProducts() {
    axios
      .get("http://localhost:3000/products", {
        params: {
          q: searchTerm,
          slug: slug,
          sort: sortOption.split("_")[0],
          order: sortOption.split("_")[1],
        },
      })
      .then((res) => {
        setItems(res.data);
      });
  }

  // chiama il backend all’avvio e quando cambiano ricerca/ordinamento/categoria
  useEffect(() => {
    loadProducts();
  }, [searchTerm, sortOption, slug]);

  return (
    <div className="container py-4">
      {/* controlli */}
      <div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-3">
        <div className="flex-grow-1">
          <label className="form-label">Cerca</label>
          <input
            type="text"
            className="form-control"
            placeholder="Cerca un prodotto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-2">
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

      {/* lista */}
      {viewMode === "grid" ? (
        <div className="row g-3">
          {items.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100" style={{ position: "relative" }}>
                <button
                  type="button"
                  onClick={() => handleAddToWishlist(product)}
                  className="btn btn-light"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    borderRadius: "50%",
                    width: "38px",
                    height: "38px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.65)",
                  }}
                >
                  <i className="fa-solid fa-heart"></i>
                </button>
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
                <div className="card-footer bg-white border-0">
                  <button
                    type="button"
                    className="btn btn-dark btn-sm w-100"
                    onClick={() => {
                      axios.post("http://localhost:3000/cart", product);
                      setNumberCart(numberCart + 1);
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
          {items.map((product) => (
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
                    axios.post("http://localhost:3000/cart", product);
                    setNumberCart(numberCart + 1);
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

      {items.length === 0 && (
        <div className="py-5 text-center text-muted">
          {searchTerm
            ? `Nessun risultato per "${searchTerm}"`
            : "Nessun prodotto trovato"}
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
