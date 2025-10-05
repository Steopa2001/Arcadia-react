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
            <img
              className="img-fluid"
              src={products.image}
              alt={products.name}
            />
          </div>
          <div className="col-12 col-md-6">
            <h3>{products.name}</h3>
            <p>
              <em>{products.price}</em>
            </p>
            <hr />
            <p>{products.genre} </p>
            <p>{products.player_number}</p>
            <p>{products.recommended_age}</p>
            <p>{products.language}</p>
            <p>{products.duration}</p>
            <p>{products.complexity}</p>
            <p>{products.description}</p>
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
