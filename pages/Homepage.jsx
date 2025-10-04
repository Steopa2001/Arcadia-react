import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const homepage = () => {
  // variabile di stato
  const [games, setGames] = useState([]);
  // chiamata per tutti i prodotti
  const fetchGames = () => {
    axios.get("http://localhost:3000/products").then((resp) => {
      setGames(resp.data);
    });
  };

  useEffect(fetchGames, []);

  return (
    <>
      {/* ------------------CATEGORIE-------------------- */}
      <div className="jumbotron"></div>
      <div className="container my-5">
        <div className="row">
          <div className="col-sm-12  col-md-3 category-card">
            <Link to="/giochi-da-tavolo">
              <div className="card-image">
                <img className="img-fluid" src="/img/giochi-tavolo-categoria.jpg" alt="" />
              </div>
            </Link>
          </div>
          <div className="col-sm-12 col-md-3 category-card">
            <div className="card-image">
              <img className="img-fluid" src="/img/carte-collezionabili.jpeg" alt="" />
            </div>
          </div>
          <div className="col-sm-12 col-md-3 category-card">
            <div className="card-image">
              <img id="cardistry" className="img-fluid" src="/img/cardistry.png" alt="" />
            </div>
          </div>
          <div className="col-sm-12 col-md-3 category-card">
            <div className="card-image">
              <img className="img-fluid" src="/img/modellismo.jpg" alt="" />
            </div>
          </div>
        </div>
        <hr />
        {/*----------LISTA PRODOTTI--------------  */}
        <div className="row">
          {games.map((game) => {
            return (
              <div className="col-12 col-md-3" key={game.id}>
                <Link to="/dettaglio-prodotto">
                  <div className="card-image">
                    <img className="img-fluid" src={game.image} alt="" />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default homepage;
