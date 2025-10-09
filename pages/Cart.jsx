import { useState, useEffect } from "react";
import axios from "axios";
import Checkout from "../components/checkout";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [maxQuantity, setMaxQuantity] = useState(10);
  const [showCheckout, setShowCheckout] = useState(false);

  // carica il carrello
  useEffect(() => {
    axios.get("http://localhost:3000/cart").then((resp) => {
      const productsWithQuantity = resp.data.map((product) => ({
        ...product,
        quantity: product.quantity || 1,
      }));
      setCart(productsWithQuantity);
    });
  }, []);

  // aggiorna quantità prodotto
  const refreshQuantity = (id, operation) => {
    setCart((products) =>
      products.map((product) => {
        if (product.id === id) {
          const newQuantity = (product.quantity || 1) + operation;
          const safeQuantity = newQuantity < 1 ? 1 : newQuantity;

          // aggiorna il backend (PATCH)
          axios
            .patch(`http://localhost:3000/cart/${id}`, {
              quantity: safeQuantity,
            })
            .then(() => {
              // aggiorna anche header
              window.dispatchEvent(new Event("cart-updated"));
            })
            .catch((err) =>
              console.error("Errore aggiornamento quantità:", err)
            );

          return { ...product, quantity: safeQuantity };
        }
        return product;
      })
    );
  };

  return (
    <div className="container my-5">
      {cart.length === 0 ? (
        <h2 className="text-center">Il carrello &egrave; vuoto</h2>
      ) : (
        <>
          <h2>CARRELLO</h2>
          <table className="table text-center my-4">
            <thead className="cart-header">
              <tr>
                <th className="col-product">PRODOTTO</th>
                <th className="col-price">PREZZO</th>
                <th className="col-quantity">QUANTITÀ</th>
                <th className="col-total">TOTALE</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((productCart) => {
                const { image, price, quantity, id, name } = productCart;

                return (
                  <tr className="align-middle" key={id}>
                    <td>
                      <img className="w-100px" src={image} alt={name} />
                    </td>
                    <td>{parseFloat(price).toFixed(2)} &euro;</td>
                    <td>
                      <button
                        className="px-2 fs-6"
                        onClick={() => {
                          if (quantity < maxQuantity) {
                            refreshQuantity(id, +1);
                          }
                        }}
                      >
                        +
                      </button>
                      <br />
                      {quantity}
                      <br />
                      <button
                        className="px-3 fs-6"
                        onClick={() => {
                          if (quantity === 1) {
                            axios.delete(`http://localhost:3000/cart/${id}`);
                            alert(`${name} è stato rimosso dal carrello`);
                            axios
                              .get("http://localhost:3000/cart")
                              .then((resp) => {
                                const productsWithQuantity = resp.data.map(
                                  (product) => ({
                                    ...product,
                                    quantity: product.quantity || 1,
                                  })
                                );
                                setCart(productsWithQuantity);
                                window.dispatchEvent(new Event("cart-updated"));
                              });
                          } else {
                            refreshQuantity(id, -1);
                          }
                        }}
                      >
                        -
                      </button>
                    </td>
                    <td>
                      {(parseFloat(price) * parseInt(quantity)).toFixed(2)}{" "}
                      &euro;
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          axios.delete(`http://localhost:3000/cart/${id}`);
                          alert(`${name} è stato rimosso dal carrello`);
                          axios
                            .get("http://localhost:3000/cart")
                            .then((resp) => {
                              const productsWithQuantity = resp.data.map(
                                (product) => ({
                                  ...product,
                                  quantity: product.quantity || 1,
                                })
                              );
                              setCart(productsWithQuantity);
                              window.dispatchEvent(new Event("cart-updated"));
                            });
                        }}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}

      <div className="text-center">
        <div className="checkout">
          <button
            className="btn btn-primary"
            onClick={() => setShowCheckout(!showCheckout)}
          >
            {showCheckout ? "Chiudi checkout" : "Checkout"}
          </button>
        </div>

        {showCheckout && (
          <div className="mt-4">
            <Checkout cartItems={cart} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
