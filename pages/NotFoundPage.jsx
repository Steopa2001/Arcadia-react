import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center flex-column mt-5">
          <div className="text-center">
            <h2>Pagina non trovata</h2>
            <p>Ci dispiace, ma la pagina cercata non esiste</p>
          </div>
          <Link className="btn-main mt-3 mb-5" to="/">Torna alla homepage</Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage