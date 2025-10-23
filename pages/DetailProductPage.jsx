import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CartContext from "../src/contexts/cartContext";
import axiosClient from "../src/api/axiosClient";

const DetailProductPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1); // stato quantità
  const { numberCart, setNumberCart } = useContext(CartContext);
  const navigate = useNavigate();

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

  const fetchProduct = () => {
    axiosClient
      .get(`/products/slug/${slug}`)
      .then((resp, err) => {
        setProduct(resp.data);
      })
      .catch((err) => navigate("/not-found", { replace: true }));
  };

  useEffect(fetchProduct, [slug]);

  const handleAddToCart = async () => {
    // Se quantità <= 10
    try {
      const productWithQuantity = { ...product, quantity };

      const response = await axiosClient.post(
        "/cart",
        productWithQuantity
      );

      if (response.status === 201) {
        const updatedCart = response.data.cart;

        const totalItems = updatedCart.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        setNumberCart(totalItems);

        showToast(
          `${product.name} ${quantity}x è stato aggiunto al carrello`,
          "success"
        );
      }
    } catch (error) {
      // Se quantità > 10
      if (error.response && error.response.status === 400) {
        showToast(
          "Hai raggiunto la quantità massima (10) per questo prodotto.",
          "error"
        );
      } else {
        console.error(error);
        showToast(
          "Errore durante l'aggiunta al carrello",
          "error"
        );
      }
    }
  };

  // Aggiungi prodotto alla wishlist
  const handleAddToWishlist = () => {
    axiosClient
      .post("/wishlist", product)
      .then(() => {
        showToast(`${product.name} è stato aggiunto alla wishlist 💖`, "success");
      })
      .catch((err) => {
        if (err.response?.status === 409) {
          showToast("Questo prodotto è già nella tua wishlist!", "info");
        } else {
          console.error("Errore aggiunta wishlist:", err);
           showToast("Errore durante l'aggiunta alla wishlist", "error");
        }
      });
  };

  const increaseQuantity = () => {
    setQuantity((prev) => (prev < 10 ? prev + 1 : prev)); // limite massimo 10
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="detail-page">
      <div className="container">
        <div className="row py-5">
          {/* immagine prodotto */}
          <div className="col-12 col-md-6">
            <img className="img-fluid" src={product.image} alt={product.name} />
          </div>

          {/* dettagli prodotto */}
          <div className="col-12 col-md-6 text-start">
            <h3 className="detail-title">{product.name}</h3>
            {/* prezzo normale sbarrato e prezzo scontato */}
            {Number(product.discount) > 0 ? (
              <div className="price-wrapper">
                <span className="old-price">
                  € {Number(product?.price).toFixed(2)}
                </span>
                <span className="new-price">
                  €{" "}
                  {(
                    Number(product?.price) -
                    (Number(product?.price) * Number(product?.discount)) / 100
                  ).toFixed(2)}
                </span>
              </div>
            ) : (
              <p>
                <em>€ {Number(product?.price).toFixed(2)}</em>
              </p>
            )}

            <hr className="detail-separator" />

            <p className="detail-info">
              <span className="detail-label">GENERE:</span> {product.genre}
            </p>

            {product.player_number != null && (
              <p className="detail-info">
                <span className="detail-label">NUMERO GIOCATORI:</span>{" "}
                {product.player_number}
              </p>
            )}

            <p className="detail-info">
              <span className="detail-label">ETÀ CONSIGLIATA:</span>{" "}
              {product.recommended_age}
            </p>

            <p className="detail-info">
              <span className="detail-label">LINGUA:</span> {product.language}
            </p>

            <p className="detail-info">
              <span className="detail-label">DURATA:</span> {product.duration}
            </p>

            <p className="detail-info">
              <span className="detail-label">DIFFICOLTÀ:</span>{" "}
              {product.complexity}
            </p>

            <p className="detail-info">
              <span className="detail-label">DESCRIZIONE:</span> <br />
              {product.description}
            </p>

            <hr className="detail-separator" />

            <div className="d-flex gap-3 align-items-center">
              {/* selezione quantità */}
              <div className="d-flex align-items-center quantity-selector">
                <button
                  className="btn btn-light quantity-btn"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <span className="quantity-value mx-2">{quantity}</span>
                <button
                  className="btn btn-light quantity-btn"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>

              {/* bottone carrello */}
              <div className="btn btn-primary" onClick={handleAddToCart}>
                Aggiungi al Carrello
              </div>

              {/* bottone wishlist */}
              <button className="btn-wishlist" onClick={handleAddToWishlist}>
                <i className="fa-solid fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      {product.length === 0 && (
        <div className="py-5 text-center text-muted">
          {searchTerm
            ? `Nessun risultato per "${searchTerm}"`
            : "Nessun prodotto trovato"}
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

export default DetailProductPage;
