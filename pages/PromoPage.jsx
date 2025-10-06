import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PromoPage = () => {
  const [promos, setPromos] = useState([]);

  // chiamate API
  useEffect(() => {
    axios.get("http://localhost:3000/products").then((resp) => {
      setPromos(resp.data);
    });
  }, []);

  return (
    <div className="container my-5">
      <div className="row gy-4">
        {promos.length > 0 ? (
          promos.map((promo) => {
            if (promo.discount != 0.0) {
              return (
                <div key={promo.id} className="col-12 col-md-3">
                  <Link to={`/dettaglio-prodotto/${promo.slug}`}>
                    <div className="card-image">
                      <img
                        className="img-fluid"
                        src={promo.image}
                        alt={promo.name}
                      />
                    </div>
                  </Link>
                  <p className="text-center">{promo.name}</p>
                </div>
              );
            } else {
              return null;
            }
          })
        ) : (
          <p style={{ color: "#fff", textAlign: "center" }}>
            Caricamento prodotti...
          </p>
        )}
      </div>
    </div>
  );
};

export default PromoPage;
