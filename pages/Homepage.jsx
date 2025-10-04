import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const homepage = () => {
  // variabile di stato
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);

  // chiamata per tutti i prodotti
  const fetchGames = () => {
    axios.get("http://localhost:3000/products").then((resp) => {
      setGames(resp.data);
    });
  };

  const fetchCategories = () => {
    axios.get("http://localhost:3000/categories").then((resp) => {
      setCategories(resp.data);
    })
  }

  useEffect(fetchGames, []);

  useEffect(fetchCategories, []);

  return (
    <>
      {/* ------------------CATEGORIE-------------------- */}
      <div className="jumbotron"></div>
      <div className="container my-5">
        <div className="row">
          {categories.map((category) => {
            return (
              <div className="col-sm-12  col-md-3 category-card">
                <Link to={`/${category.slug}`}>
                  <div className="card-image">
                    <img className="img-fluid" src={category.image} alt={category.name} />
                  </div>
                </Link>
              </div>
            )
          })}

        </div>
        <hr />
        {/*----------LISTA PRODOTTI--------------  */}
        <div className="row">
          {games.map((game) => {
            return (
              <div className="col-12 col-md-3" key={game.id}>
                <Link to="/dettaglio-prodotto">
                  <div className="card-image">
                    <img className="img-fluid" src={game.image} alt={game.name} />
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
