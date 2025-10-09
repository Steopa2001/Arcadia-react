import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const resp = await axios.get("http://localhost:3000/cart");
        const totalItems = resp.data.reduce(
          (sum, item) => sum + (item.quantity || 1),
          0
        );
        setCartCount(totalItems);
      } catch (error) {
        console.error("Errore nel recupero del carrello:", error);
      }
    };

    // chiamata iniziale
    fetchCart();

    // ascolta evento personalizzato
    const handleCartUpdated = () => fetchCart();
    window.addEventListener("cart-updated", handleCartUpdated);

    // fallback: controlla ogni 2 secondi
    const interval = setInterval(fetchCart, 2000);

    // cleanup
    return () => {
      window.removeEventListener("cart-updated", handleCartUpdated);
      clearInterval(interval);
    };
  }, []);

  return (
    <header>
      {/* logo - scritta - icone */}
      <div className="header-top d-flex justify-content-between align-items-center">
        {/* logo */}
        <Link to="/">
          <img src="/img/Arcadia-logo.png" alt="logo" className="logo" />
        </Link>

        {/* scritta centrale */}
        <div className="header-center-text">
          <h1>Dove i giochi prendono vita</h1>
        </div>

        {/* icone */}
        <div className="icons-header">
          <Link to="/wishlist-prodotti">
            <i className="fa-solid fa-heart"></i>
          </Link>

          <Link to="/account">
            <i className="fa-solid fa-user"></i>
          </Link>

          {/* carrello con contatore */}
          <Link to="/carrello-prodotti" className="cart-icon">
            <i className="fa-solid fa-cart-shopping"></i>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </div>

      {/* navbar */}
      <nav className="header-nav">
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/giochi-da-tavolo">
            <li>Giochi da Tavolo</li>
          </Link>
          <Link to="/carte-collezionabili">
            <li>Carte Collezionabili</li>
          </Link>
          <Link to="/cardistry">
            <li>Cardistry</li>
          </Link>
          <Link to="/modellismo">
            <li>Modellismo</li>
          </Link>
          <Link to="/tutti-prodotti">
            <li>Tutti i Prodotti</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
