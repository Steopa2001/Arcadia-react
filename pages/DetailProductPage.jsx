import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailProductPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState({});

  const fetchProduct = () => {
    axios.get(`http://localhost:3000/products/${id}`).then((resp) => {
      setProducts(resp.data);
    });
  };

  useEffect(fetchProduct, []);

  return (
    <div className="detail-page">
      <div className="container">
        <div className="row py-5">
          {/* immagine prodotto */}
          <div className="col-12 col-md-6">
            <img
              className="img-fluid"
              src={products.image}
              alt={products.name}
            />
          </div>

          {/* dettagli prodotto */}
          <div className="col-12 col-md-6">
            <h3 className="detail-title">{products.name}</h3>
            <p>
              <em>{products.price} &euro;</em>
            </p>

            {/* separatore */}
            <hr className="detail-separator" />

            <p className="detail-info">
              <span className="detail-label">GENERE:</span> {products.genre}
            </p>

            {products.player_number == null ? null : (
              <p className="detail-info">
                <span className="detail-label">NUMERO GIOCATORI:</span>{" "}
                {products.player_number}
              </p>
            )}

            <p className="detail-info">
              <span className="detail-label">ETÀ CONSIGLIATA:</span>{" "}
              {products.recommended_age}
            </p>

            <p className="detail-info">
              <span className="detail-label">LINGUA:</span> {products.language}
            </p>

            <p className="detail-info">
              <span className="detail-label">DURATA:</span> {products.duration}
            </p>

            <p className="detail-info">
              <span className="detail-label">DIFFICOLTÀ:</span>{" "}
              {products.complexity}
            </p>

            <p className="detail-info">
              <span className="detail-label">DESCRIZIONE:</span> <br />
              {products.description}
            </p>

            {/* separatore */}
            <hr className="detail-separator" />

            <div className="d-flex gap-3 align-items-center">
              <Link to="/carrello-prodotti">
                <div className="btn btn-primary">Aggiungi al Carrello</div>
              </Link>
              <Link to="/wishlist-prodotti">
                <i className="fa-solid fa-heart"></i>
              </Link>
              <div>quantità</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductPage;
