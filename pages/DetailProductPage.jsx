import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CartContext from "../src/contexts/cartContext";

const DetailProductPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1); // stato quantità
  const { numberCart, setNumberCart } = useContext(CartContext);
  const navigate = useNavigate();

  const fetchProduct = () => {
    axios
      .get(`http://localhost:3000/products/slug/${slug}`)
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

      const response = await axios.post("http://localhost:3000/cart", productWithQuantity);

      if (response.status === 201) {

        const updatedCart = response.data.cart;

        const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
        setNumberCart(totalItems);

        alert(`${product.name} (${quantity}x) è stato aggiunto al carrello`);
      }
    } catch (error) {
      // Se quantità > 10
      if (error.response && error.response.status === 400) {
        alert("Hai raggiunto la quantità massima (10) per questo prodotto.");
      }
      else {
        console.error(error);
        alert("Si è verificato un errore durante l'aggiunta al carrello.");
      }
    }
  };

  // const handleAddToCart = () => {
  //   const productWithQuantity = { ...product, quantity };
  //   axios.post("http://localhost:3000/cart", productWithQuantity);
  //   setNumberCart(numberCart + quantity);
  //   alert(`${product.name} (${quantity}x) è stato aggiunto al carrello`);
  // };

  // Aggiungi prodotto alla wishlist
  const handleAddToWishlist = () => {
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

              {/* bottone wishlist */}
              <button className="btn-wishlist" onClick={handleAddToWishlist}>
                <i className="fa-solid fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductPage;
