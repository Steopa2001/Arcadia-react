import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailProductPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1); // stato quantità

  const fetchProduct = () => {
    axios.get(`http://localhost:3000/products/slug/${slug}`).then((resp) => {
      setProduct(resp.data);
    });
  };

  useEffect(fetchProduct, [slug]);

  const handleAddToCart = () => {
    const productWithQuantity = { ...product, quantity };
    axios.post("http://localhost:3000/cart", productWithQuantity);
    alert(`${product.name} (${quantity}x) è stato aggiunto al carrello`);
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
          <div className="col-12 col-md-6">
            <h3 className="detail-title">{product.name}</h3>
            <p>
              <em>{product.price} &euro;</em>
            </p>

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

              {/* wishlist */}
              <Link to="/wishlist-prodotti">
                <i className="fa-solid fa-heart"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductPage;
