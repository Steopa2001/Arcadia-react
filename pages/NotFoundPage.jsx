import { Link } from "react-router-dom";

const NotFoundPage = () => {
  const handleNoClick = () => {
    window.location.reload(); // ricarica la pagina
  };

  return (
    <div className="notfound-container">
      <img
        src="https://i.pinimg.com/originals/c9/ee/c6/c9eec6c6fd9a0471cb3ffdde3236d643.gif"
        alt="Game Over 404"
        className="notfound-bg"
      />

      {/* overlay cliccabile invisibile per YES e NO */}
      <Link
        to="/"
        className="hotspot hotspot-yes"
        aria-label="Torna alla homepage"
      ></Link>
      <button
        onClick={handleNoClick}
        className="hotspot hotspot-no"
        aria-label="Riprova"
      ></button>
    </div>
  );
};

export default NotFoundPage;
