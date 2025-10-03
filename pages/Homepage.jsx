import { Link } from "react-router-dom";
const homepage = () => {
  return (
    <>
      <div className="jumbotron"></div>
      <div className="container my-5">
        <div className="row">
          <div className="col-sm-12  col-md-3 category-card">
            <Link to="/giochi-da-tavolo">
              <div className="card-image">
                <img className="img-fluid" src="/imgs/virtuoso.jpg" alt="" />
              </div>
            </Link>
          </div>
          <div className="col-sm-12 col-md-3 category-card">
            <div className="card-image">
              <img className="img-fluid" src="/imgs/virtuoso.jpg" alt="" />
            </div>
          </div>
          <div className="col-sm-12 col-md-3 category-card">
            <div className="card-image">
              <img className="img-fluid" src="/imgs/virtuoso.jpg" alt="" />
            </div>
          </div>
          <div className="col-sm-12 col-md-3 category-card">
            <div className="card-image">
              <img className="img-fluid" src="/imgs/virtuoso.jpg" alt="" />
            </div>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default homepage;
