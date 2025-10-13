import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../src/contexts/cartContext";

const OurChoiches = () => {
  const [promos, setPromos] = useState([]);
  const { numberCart, setNumberCart } = useContext(CartContext);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const showToast = (message, variant = "success") => {
    setToast({ show: true, message, variant });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 2500);
  };

  // Aggiungi prodotto alla wishlist
  const handleAddToWishlist = (product) => {
    axios
      .post("http://localhost:3000/wishlist", product)
      .then(() => {
        showToast(
          `${product.name} è stato aggiunto alla wishlist 💖`,
          "success"
        );
      })
      .catch((err) => {
        if (err.response?.status === 409) {
          showToast("Questo prodotto è già nella wishlist", "info");
        } else {
          console.error("Errore aggiunta wishlist:", err);
          showToast("Errore durante l'aggiunta alla wishlist", "error");
        }
      });
  };

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
            if (promo.price >= 50.0) {
              return (
                <div
                  key={promo.id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                >
                  <div className="card h-100" style={{ position: "relative" }}>
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
                      <div className="fw-bold">
                        € {Number(promo.price).toFixed(2)}
                      </div>
                    </div>
                    <div className="card-footer bg-white border-0">
                      <button
                        type="button"
                        className="btn btn-dark btn-sm w-100"
                        onClick={() => {
                          axios
                            .post("http://localhost:3000/cart", {
                              ...promo,
                              quantity: promo.quantity || 1,
                            })
                            .then(() => {
                              setNumberCart((prev) => Number(prev) + 1); // somma sicura
                              showToast(
                                `${promo.name} è stato aggiunto al carrello`,
                                "success"
                              );
                            })
                            .catch(() => {
                              showToast(
                                "Errore durante l'aggiunta al carrello",
                                "error"
                              );
                            });
                        }}
                      >
                        Aggiungi al carrello
                      </button>
                    </div>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })
        ) : (
          <div className="py-5 text-center text-muted">
            Caricamento prodotti...
          </div>
        )}
      </div>
      {/* Toast bottom-right */}
      <div
        className={`app-toast ${toast.show ? "show" : ""} ${toast.variant}`}
        role="status"
        aria-live="polite"
      >
        {toast.message}
      </div>
    </div>
  );
};

export default OurChoiches;
