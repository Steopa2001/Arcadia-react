import { Link } from "react-router-dom";
const DetailProductPage = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>PAGINA DI DETTAGLIO</h2>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <img className="img-fluid" src="/imgs/virtuoso.jpg" alt="" />
            </div>
            <div className="col-12 col-md-6">
              <h3>NOME DEL PRODOTTO</h3>
              <p>
                <em>prezzo</em> 20$
              </p>
              <hr />
              <p>genere: ... </p>
              <p>Numero giocatori: ... </p>
              <p>età consigliata: ... </p>
              <p>lingua: ...</p>
              <p>durata: ...</p>
              <p>difficoltà: ...</p>
              <p>
                descrizione: Lorem ipsum dolor sit, amet consectetur adipisicing
                elit. Magnam ullam quisquam reprehenderit tenetur suscipit,
                dicta praesentium alias neque fugit veniam voluptatem! Est
                dolores quam beatae debitis explicabo error tempora voluptatem.
              </p>
              <hr />
              <div className="d-flex gap-3 align-items-center">
                <Link to="/carrello-prodotti">
                  <div className="btn btn-primary">Aggiungi al Carrello</div>
                </Link>
                <Link to="/wishlist-prodotti">
                  <i className="fa-solid fa-heart"></i>
                </Link>
                <div>quantità</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductPage;
