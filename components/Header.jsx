import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      {/* logo - search - icone */}
      <div className="header-top d-flex justify-content-between align-items-center">
        <Link to="/">
          <img src="/img/Arcadia-logo.png" alt="logo" className="logo" />
        </Link>
        <div className="search-bar">
          <input type="text" placeholder="Cerca per prodotto..." />
        </div>
        <div className="icons">
          <Link to="/wishlist-prodotti">
            <i className="fa-solid fa-heart"></i>
          </Link>
          <Link to="/account">
            <i className="fa-solid fa-user"></i>
          </Link>
          <Link to="/carrello-prodotti">
            <i className="fa-solid fa-cart-shopping"></i>
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
          <Link to='/carte-collezionabili'>
          <li>Carte Collezionabili</li>
          </Link>
          <Link to='cardistry'>
          <li>Cardistry</li>
          </Link>
          <Link to='modellismo'>
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
