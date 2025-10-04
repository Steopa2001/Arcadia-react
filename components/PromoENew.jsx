import { useRef } from "react";

const PromoENew = () => {
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
        <div className="scroll-container">
          <button
            className="scroll-btn left"
            onClick={() => scroll(promoRef, "left")}
          >
            &#10094;
          </button>

          <div className="products" ref={promoRef}>
            <div className="product-card">
              <img src="/imgs/virtuoso.jpg" alt="Promo 1" />
              <p>Promo 1</p>
            </div>
            <div className="product-card">
              <img src="/imgs/virtuoso.jpg" alt="Promo 2" />
              <p>Promo 2</p>
            </div>
            <div className="product-card">
              <img src="/imgs/virtuoso.jpg" alt="Promo 3" />
              <p>Promo 3</p>
            </div>
            <div className="product-card">
              <img src="/imgs/virtuoso.jpg" alt="Promo 4" />
              <p>Promo 4</p>
            </div>
            <div className="product-card">
              <img src="/imgs/virtuoso.jpg" alt="Promo 5" />
              <p>Promo 5</p>
            </div>
            <div className="product-card">
              <img src="/imgs/virtuoso.jpg" alt="Promo 6" />
              <p>Promo 6</p>
            </div>
            <div className="product-card">
              <img src="/imgs/virtuoso.jpg" alt="Promo 7" />
              <p>Promo 7</p>
            </div>
            <div className="product-card">
              <img src="/imgs/virtuoso.jpg" alt="Promo 8" />
              <p>Promo 8</p>
            </div>
            <div className="product-card">
              <img src="/imgs/virtuoso.jpg" alt="Promo 9" />
              <p>Promo 9</p>
            </div>
            <div className="product-card">
              <img src="/imgs/virtuoso.jpg" alt="Promo 10" />
              <p>Promo 10</p>
            </div>
          </div>

          <button
            className="scroll-btn right"
            onClick={() => scroll(promoRef, "right")}
          >
            &#10095;
          </button>
        </div>
      </div>

      {/* NUOVI ARRIVI */}
      <div className="promo-section">
        <h2>Nuovi Arrivi</h2>
        <div className="scroll-container">
          <button
            className="scroll-btn left"
            onClick={() => scroll(newRef, "left")}
          >
            &#10094;
          </button>

          <div className="products" ref={newRef}>
            <div className="product-card">
              <img src="/imgs/virtuoso.jpg" alt="Nuovo 1" />
              <p>Nuovo 1</p>
            </div>
            <div className="product-card">
              <img src="/imgs/virtuoso.jpg" alt="Nuovo 2" />
              <p>Nuovo 2</p>
            </div>
            <div className="product-card">
              <img src="/imgs/virtuoso.jpg" alt="Nuovo 3" />
              <p>Nuovo 3</p>
            </div>
            <div className="product-card">
              <img src="/imgs/virtuoso.jpg" alt="Nuovo 4" />
              <p>Nuovo 4</p>
            </div>
            <div className="product-card">
              <img src="/imgs/virtuoso.jpg" alt="Nuovo 5" />
              <p>Nuovo 5</p>
            </div>
            <div className="product-card">
              <img src="/imgs/virtuoso.jpg" alt="Nuovo 6" />
              <p>Nuovo 6</p>
            </div>
            <div className="product-card">
              <img src="/imgs/virtuoso.jpg" alt="Nuovo 7" />
              <p>Nuovo 7</p>
            </div>
            <div className="product-card">
              <img src="/imgs/virtuoso.jpg" alt="Nuovo 8" />
              <p>Nuovo 8</p>
            </div>
            <div className="product-card">
              <img src="/imgs/virtuoso.jpg" alt="Nuovo 9" />
              <p>Nuovo 9</p>
            </div>
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
