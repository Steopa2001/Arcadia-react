import { useState, useEffect } from "react";
import axios from "axios";

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    <div className="container my-5">
      <h2 className="text-center mb-4">LA TUA WISHLIST</h2>

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
              const { id, image, name, price } = product;

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
                  <td>{parseFloat(price).toFixed(2)} €</td>
                  <td>
                    <button
                      className="btn btn-dark me-2"
                      onClick={() =>
                        alert(`${name} aggiunto al carrello (demo)`)
                      }
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
            <p className="mb-3 fs-5 fw-semibold">
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
    </div>
  );
};

export default WishList;
