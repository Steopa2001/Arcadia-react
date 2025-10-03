import React from "react";

const Cart = () => {
  return (
    <div className="container">
      <h2>CARRELLO</h2>
      <table className="table text-center">
        <thead className="table-secondary">
          <tr>
            <th>PRODOTTO</th>
            <th>PREZZO</th>
            <th>QUANTITA'</th>
            <th>TOTALE</th>
          </tr>
        </thead>
        <tbody>
          <tr className="align-middle">
            <td>
              <img className="w-100px" src="/imgs/virtuoso.jpg" alt="img"/> 
            </td>
            <td>PREZZO</td>
            <td>QUANTITA'</td>
            <td>TOTALE</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Cart;

              
