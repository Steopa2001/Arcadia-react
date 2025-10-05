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
    <div className="container">
      <div className="row  py-5">
        <div className="col-12 col-md-6">
          <img className="img-fluid" src={products.image} alt={products.name} />
        </div>
        <div className="col-12 col-md-6">
          <h3>{products.name}</h3>
          <p>
            <em>{products.price} &euro;</em>
          </p>
          <hr />
          <p>GENERE: {products.genre} </p>
          {products.player_number == null ? (
            <p></p>
          ) : (
            <p>NUMERO GIOCATORI: {products.player_number}</p>
          )}

          <p>ETA' CONSIGLIATA: {products.recommended_age}</p>
          <p>LINGUA: {products.language}</p>
          <p>DURATA: {products.duration}</p>
          <p>DIFFICOLTA': {products.complexity}</p>
          <p>
            DESCRIZIONE: <br />
            {products.description}
          </p>
          <hr />
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
  );
};

export default DetailProductPage;
