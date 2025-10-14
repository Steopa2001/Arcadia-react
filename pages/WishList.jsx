import { useState, useEffect, useContext } from "react";
import axios from "axios";
import CartContext from "../src/contexts/cartContext";

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showGif, setShowGif] = useState(false);
  const { numberCart, setNumberCart } = useContext(CartContext);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const showToast = (message, variant = "success") => {
    setToast({ show: true, message, variant });
    // nascondi dopo 2.5s
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 2500);
  };

  // funzione per aggiungere un prodotto della wishlist al carrello
  const handleAddToCart = async (product) => {
    try {
      const productWithQuantity = {
        ...product,
        quantity: product.quantity || 1,
      };
      const resp = await axios.post(
        "http://localhost:3000/cart",
        productWithQuantity
      );
      console.log("✅ Prodotto aggiunto al carrello:", resp.data);

      // Mostra la GIF
      setShowGif(true);
      setTimeout(() => setShowGif(false), 2000); // dopo 2s scompare
      setNumberCart(numberCart + 1)
    } catch (err) {
      console.error("Errore durante l'aggiunta al carrello:", err);
      if (product.quantity = 10) {
        showToast(
          "Hai raggiunto la quantità massima (10) per questo prodotto.",
          "error"
        );
      }
      else {
        showToast(
          "Errore durante l'aggiunta al carrello",
          "error"
        );
      }
    }
  };

  // Carica wishlist dal backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/wishlist")
      .then((resp) => setWishlist(resp.data))
      .catch((err) =>
        console.error("Errore nel caricamento della wishlist:", err)
      );
  }, []);

  // Funzione per mostrare il popup di conferma
  const handleRemoveClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Conferma rimozione
  const confirmRemove = () => {
    if (!selectedProduct) return;

    axios
      .delete(`http://localhost:3000/wishlist/${selectedProduct.id}`)
      .then(() => {
        setWishlist((prev) =>
          prev.filter((item) => item.id !== selectedProduct.id)
        );
      })
      .catch((err) =>
        console.error("Errore durante la rimozione del prodotto:", err)
      );

    setShowModal(false);
    setSelectedProduct(null);
  };

  // Annulla rimozione
  const cancelRemove = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="wishlist-container">
      {wishlist.length === 0 ? (
        <h4 className="text-center text-muted">La tua wishlist è vuota 💔</h4>
      ) : (
        <table className="table text-center my-4">
          <thead className="wishlist-header">
            <tr>
              <th>PRODOTTO</th>
              <th>PREZZO</th>
              <th>AZIONI</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map((product) => {
              const { id, image, name, price, discount } = product;

              return (
                <tr key={id} className="align-middle">
                  <td>
                    <img
                      src={image}
                      alt={name}
                      style={{ width: "100px", borderRadius: "10px" }}
                    />
                    <p className="mt-2 fw-semibold">{name}</p>
                  </td>
                  {Number(discount) > 0 ? (
                    <td>
                      <div className="price-wrapper justify-content-center sm-column">
                        <span className="old-price">
                          € {Number(price).toFixed(2)}
                        </span>
                        <span className="new-price">
                          €{" "}
                          {(
                            Number(price) -
                            (Number(price) * Number(discount)) / 100
                          ).toFixed(2)}
                        </span>
                      </div>
                    </td>
                  ) : (
                    <td>€ {Number(price).toFixed(2)}</td>
                  )}
                  {/* <td>€ {parseFloat(price).toFixed(2)}</td> */}
                  <td>
                    <button
                      className="btn-wishlist me-3"
                      onClick={() => handleAddToCart(product)}
                    >
                      Aggiungi al carrello
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleRemoveClick(product)}
                    >
                      Rimuovi
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Modale di conferma */}
      {showModal && (
        <div
          className="modal fade show"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "fixed",
            inset: 0,
            zIndex: 1050,
          }}
        >
          <div
            className="bg-white p-4 rounded-4 shadow"
            style={{ minWidth: "320px", textAlign: "center" }}
          >
            <p className="modal-text mb-3 fs-5 fw-semibold">
              Sicuro di volerlo rimuovere dalla wishlist?
            </p>
            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-dark" onClick={confirmRemove}>
                Sì
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={cancelRemove}
              >
                Annulla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GIF overlay dopo aggiunta al carrello */}
      {showGif && (
        <div className="wishlist-gif-overlay">
          <img
            src="/img/magic.gif"
            alt="Aggiunto al carrello"
            className="wishlist-gif"
          />
        </div>
      )}
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

export default WishList;
