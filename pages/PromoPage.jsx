import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../src/contexts/cartContext";

const PromoPage = () => {
  const [promos, setPromos] = useState([]);
  const { numberCart, setNumberCart } = useContext(CartContext);

  // Aggiungi prodotto alla wishlist
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

  // chiamate API
  useEffect(() => {
    axios.get("http://localhost:3000/products").then((resp) => {
      setPromos(resp.data);
    });
  }, []);

  return (
    <div className="container py-4">
      <div className="row g-3">
        {promos.length > 0 ? (
          promos.map((promo) => {
            if (Number(promo.discount) !== 0) {
              return (
                <div
                  key={promo.id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                >
                  <div className="card h-100" style={{ position: "relative" }}>
                    {/* badge discount */}
                    {Number(promo.discount) > 0 && (
                      <div className="discount-badge">
                        -{Number(promo.discount)}%
                      </div>
                    )}

                    {/* Bottone wishlist */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToWishlist(promo);
                      }}
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
                        zIndex: 2,
                      }}
                      aria-label="Aggiungi alla wishlist"
                      title="Aggiungi alla wishlist"
                    >
                      <i className="fa-solid fa-heart"></i>
                    </button>

                    <Link
                      to={`/dettaglio-prodotto/${promo.slug}`}
                      className="text-decoration-none"
                      style={{ color: "inherit" }}
                    >
                      <img
                        src={promo.image}
                        alt={promo.name}
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
                      <h6 className="card-title mb-2">{promo.name}</h6>

                      {/* prezzo normale sbarrato + prezzo scontato */}
                      <div className="price-wrapper">
                        <span className="old-price">
                          € {Number(promo.price).toFixed(2)}
                        </span>
                        <span className="new-price">
                          €{" "}
                          {(
                            promo.price -
                            (promo.price * promo.discount) / 100
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="card-footer bg-white border-0">
                      <button
                        type="button"
                        className="btn btn-dark btn-sm w-100"
                        onClick={() => {
                          axios.post("http://localhost:3000/cart", promo);
                          setNumberCart(numberCart + 1);
                          alert(`${promo.name} è stato aggiunto al carrello`);
                        }}
                      >
                        Aggiungi al carrello
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })
        ) : (
          <div className="py-5 text-center text-muted">
            Caricamento prodotti...
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoPage;