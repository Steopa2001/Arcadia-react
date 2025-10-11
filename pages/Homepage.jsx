import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import PromoENew from "../components/PromoENew";

const Homepage = () => {
  const sectionRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [games, setGames] = useState([]);

  const handleScroll = () => {
    if (sectionRef.current) {
      const y =
        sectionRef.current.getBoundingClientRect().top + window.scrollY - 200;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // chiamate API dei colleghi
  useEffect(() => {
    axios.get("http://localhost:3000/categories").then((resp) => {
      setCategories(resp.data);
    });
    axios.get("http://localhost:3000/products").then((resp) => {
      setGames(resp.data);
    });
  }, []);

  return (
    <div className="homepage" style={{ overflow: "auto" }}>
      {/* jumbotron */}
      <div className="jumbotron">
        <div className="jumbotron-content">
          <h1>Benvenuto in Arcadia</h1>
          <button onClick={handleScroll} className="btn-cta">
            Scopri ora
          </button>
        </div>
      </div>

      {/* ---------------- CATEGORIE ---------------- */}
      <div ref={sectionRef} className="container section-cards">
        <h2 className="categories-title">CATEGORIE</h2>
        <div className="row">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category.id}
                className="col-sm-12 col-md-3 category-card"
              >
               <Link to={`/catalogo/${category.slug}`}>
                  <div className="card-image">
                    <img
                      className="img-fluid"
                      src={category.image}
                      alt={category.name}
                    />
                    <div className={`overlay ${category.slug}`}>
                      <span>{category.name}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p style={{ color: "#fff", textAlign: "center" }}>
              Caricamento categorie...
            </p>
          )}
        </div>
        <hr />
      </div>

      {/* ---------------- PROMO & NUOVI ARRIVI ---------------- */}
      <PromoENew />
    </div>
  );
};

export default Homepage;
