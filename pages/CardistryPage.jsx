import { Link } from "react-router-dom";


const CardistryPage = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>CARDISTRY</h1>
          </div>
          <div className="row">
            <div className="col-sm-12  col-md-3 category-card">
              <Link to="/dettaglio-prodotto">
                <div className="card-image">
                  <img className="img-fluid" src="/img/virtuoso.jpg" alt="" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardistryPage;
