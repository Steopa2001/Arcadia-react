import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ModelPage = () => {
  const [products, setProducts] = useState([]);
  const categoryId = 4; // ID categoria

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/category/${categoryId}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, [categoryId]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>MODELLISMO</h1>
        </div>
        {products.map((prod) => (
          <div key={prod.id} className="col-sm-12 col-md-3 category-card mb-3">
            <p>{prod.name}</p>
            <Link to={`/dettaglio-prodotto/${prod.slug}`}>
              <div className="card-image">
                <img className="img-fluid" src={prod.image} alt={prod.name} />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelPage;
