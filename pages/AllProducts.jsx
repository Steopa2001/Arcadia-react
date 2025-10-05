import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllProducts = () => {
  // chiamate API dei colleghi
  useEffect(() => {
    axios.get("http://localhost:3000/products").then((resp) => {
      setGames(resp.data);
    });
  }, []);

  const [games, setGames] = useState([]);
  return (
    <>
      {/* ---------------- PRODOTTI ---------------- */}
      <div className="container my-5">
        <div className="row gy-4">
          {games.length > 0 ? (
            games.map((game) => (
              <div key={game.id} className="col-12 col-md-3">
                <Link to={`/dettaglio-prodotto/${game.id}`}>
                  <div className="card-image">
                    <img
                      className="img-fluid"
                      src={game.image}
                      alt={game.name}
                    />
                  </div>
                </Link>
                    <p className="text-center">{game.name}</p>
              </div>
            ))
          ) : (
            <p style={{ color: "#fff", textAlign: "center" }}>
              Caricamento prodotti...
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
