import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-footer d-flex pt-5">
            <div className="col-3">
              <div className='lofo-f'>
                <img src="/img/Arcadia-logo.png" alt="logo" className="logo" />
              </div>
              <div className="text">Arcadia è un e-commerce italiano di giochi da tavolo, carte collezionabili, cardistry e modellismo. Arcadia è un marchio registrato. Ogni utilizzo o riproduzione non espressamente autorizzata è severatamente vietata.</div>
            </div>
            <div className="col-3 text-center"><h4>ACCOUNT</h4>
              <ul className='list-unstyled'>
                <li>Arcadia Premium</li>
                <li>Gestioni iscrizioni</li>
              </ul>
            </div>
            <div className="col-3 text-center"><h4>MENU</h4>
              <ul className='list-unstyled'>
                <Link to="/" className='link'><li>Home</li>
                </Link>
                <li>Arcadia premium</li>
                <Link to="/giochi-da-tavolo" className='link'>
                  <li>Giochi da tavolo</li>
                </Link>
                <Link to="/carte-collezionabili" className='link'>
                  <li>Carte collezionabili</li></Link>
                <Link to="cardistry" className='link'>
                  <li>Cardistry</li></Link>
                <Link to="modellismo" className='link'>
                  <li>Modellismo</li></Link>
                <li>Promo</li>
              </ul>
            </div>
            <div className="col-3 text-center"><h4>ARCADIA</h4>
              <ul className='list-unstyled'>
                <Link to="/" className='link'><li>Home</li>
                </Link>
                <li>Chi siamo</li>
                <li>Contattaci</li>
                <li>Arcadia premium</li>
              </ul>
            </div>
          </div>
          <div className="col-12 mt-5 mb-5">
            <div className="icons">
              <i className="fa-brands fa-square-instagram fa-1x"></i>
              <i className="fa-brands fa-facebook fa-1x"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
