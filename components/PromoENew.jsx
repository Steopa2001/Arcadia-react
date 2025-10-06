import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PromoENew = () => {
  const [promos, setPromos] = useState([]);
  // chiamate API
  useEffect(() => {
    axios.get("http://localhost:3000/products").then((resp) => {
      setPromos(resp.data);
    });
  }, []);

  const promoRef = useRef(null);
  const newRef = useRef(null);

  const scroll = (ref, direction) => {
    if (direction === "left") {
      ref.current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      ref.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* PROMO */}
      <div className="promo-section">
        <h2>Le promo</h2>
        <Link to="/promo-prodotti">
          <p className="section-link">tutte le promo</p>
        </Link>
        <div className="scroll-container">
          <button
            className="scroll-btn left"
            onClick={() => scroll(promoRef, "left")}
          >
            &#10094;
          </button>
          <div className="products" ref={promoRef}>
            {promos.map((promo) => {
              if (promo.discount != 0.0) {
                return (
                  <div className="product-card" key={promo.id}>
                    <Link to={`/dettaglio-prodotto/${promo.slug}`}>
                      <img src={promo.image} alt={promo.name} />
                    </Link>
                    <p className="product-title">{promo.name}</p>
                  </div>
                );
              }
            })}
          </div>

          <button
            className="scroll-btn right"
            onClick={() => scroll(promoRef, "right")}
          >
            &#10095;
          </button>
        </div>
      </div>

      {/* LE NOSTRE SCELTE */}
      <div className="promo-section">
        <h2>Le nostre scelte</h2>
        <Link to="/prodotti-preferiti">
          <p className="section-link">tutte le nostre scelte</p>
        </Link>
        <div className="scroll-container">
          <button
            className="scroll-btn left"
            onClick={() => scroll(newRef, "left")}
          >
            &#10094;
          </button>

          <div className="products" ref={newRef}>
            {promos.map((promo) => {
              if (promo.price >= 50.0) {
                return (
                  <div className="product-card" key={promo.id}>
                    <Link to={`/dettaglio-prodotto/${promo.slug}`}>
                      <img src={promo.image} alt={promo.name} />
                    </Link>
                    <p className="product-title">{promo.name}</p>
                  </div>
                );
              }
            })}
          </div>

          <button
            className="scroll-btn right"
            onClick={() => scroll(newRef, "right")}
          >
            &#10095;
          </button>
        </div>
      </div>
    </>
  );
};

export default PromoENew;
