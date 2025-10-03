import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <div className="d-flex justify-content-between align-items-center">
        <img src="./imgs/Arcadia-logo.png" alt="logo" />
        <div>
          <input
            className="form-control"
            type="text"
            placeholder="cerca per prodotto"
          />
        </div>
        <div className="icons">
          <Link to="/wishlist-prodotti">
            <i className="fa-solid fa-heart"></i>
          </Link>
          <Link to="/carrello-prodotti">
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>
        </div>
      </div>
      <div className="navbar d-flex justify-content-center">
        <ul className="d-flex list-unstyled">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/giochi-da-tavolo">
            <li>Giochi da Tavolo</li>
          </Link>
          <li>Carte Collezionabili</li>
          <li>Cardistry</li>
          <li>Modellismo</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
