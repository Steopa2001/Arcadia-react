import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../src/contexts/cartContext";

const Header = () => {

  const { numberCart } = useContext(CartContext);

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
            <i className="fa-solid fa-cart-shopping">
              {numberCart > 0 && <span className="cart-count">{numberCart}</span>}
            </i>
          </Link>
        </div>
      </div>

      {/* navbar */}
      <nav className="header-nav">
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/catalogo/giochi-da-tavolo">
            <li>Giochi da Tavolo</li>
          </Link>
          <Link to="/catalogo/carte-collezionabili">
            <li>Carte Collezionabili</li>
          </Link>
          <Link to="/catalogo/cardistry">
            <li>Cardistry</li>
          </Link>
          <Link to="/catalogo/modellismo">
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
