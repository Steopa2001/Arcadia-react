import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Checkout from "../components/Checkout";
import ModalCheckout from "../components/ModalCheckout";
import CartContext from "../src/contexts/cartContext";


const Cart = () => {
  const [cart, setCart] = useState([]);
  const [maxQuantity, setMaxQuantity] = useState(10);
  const [showCheckout, setShowCheckout] = useState(false);
  const { setNumberCart } = useContext(CartContext);

  const [showModal, setShowModal] = useState(false);
  const [showClearCartModal, setShowClearCartModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // carica il carrello
  useEffect(() => {
    axios.get("http://localhost:3000/cart").then((resp) => {
      const productsWithQuantity = resp.data.map((product) => ({
        ...product,
        quantity: product.quantity || 1,
      }));

      setCart(productsWithQuantity);

      // Calcola il totale direttamente qui, senza usare "cart"
      const totalCart = productsWithQuantity.reduce(
        (sum, product) => sum + (product.quantity || 1),
        0
      );
      setNumberCart(totalCart);
    });
  }, [setNumberCart]);

  useEffect(() => {
    const total = cart.reduce(
      (sum, product) => sum + (product.quantity || 1),
      0
    );
    setNumberCart(total);
    localStorage.setItem("numberCart", parseInt(total));
  }, [cart, setNumberCart]);

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
            .catch((err) =>
              console.error("Errore aggiornamento quantità:", err)
            );

          return { ...product, quantity: safeQuantity };
        }
        return product;
      })
    );
  };

  // Apri modale
  const handleRemoveClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Conferma rimozione
  const confirmRemove = () => {
    if (!selectedProduct) return;

    axios
      .delete(`http://localhost:3000/cart/${selectedProduct.id}`)
      .then(() => {
        // aggiorna lista carrello
        setCart((prev) =>
          prev.filter((item) => item.id !== selectedProduct.id)
        );
        // aggiorna badge
        setNumberCart((prev) =>
          Math.max(0, prev - (selectedProduct.quantity || 1))
        );
      })
      .catch((err) =>
        console.error("Errore durante la rimozione dal carrello:", err)
      );

    setShowModal(false);
    setSelectedProduct(null);
  };

  // Annulla
  const cancelRemove = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const confirmClearCart = () => {
    axios
      .get("http://localhost:3000/cart")
      .then((resp) => {
        const deleteRequests = resp.data.map((product) =>
          axios.delete(`http://localhost:3000/cart/${product.id}`)
        );

        // Promise.all per eseguire più operazioni asincrone in parallelo e aspettare che tutte siano completate
        Promise.all(deleteRequests).then(() => {
          setCart([]);
          setNumberCart(0);
          localStorage.setItem("numberCart", 0);
        });
      })
      .catch((err) => console.error("Errore durante la pulizia del carrello:", err));

    setShowClearCartModal(false)
  }

  const cancelClearCart = () => {
    setShowClearCartModal(false)
  }

  return (
    <div className="cart-container">
      <div className="container">
        {cart.length === 0 ? (
          <h2 className="text-center">Il carrello &egrave; vuoto</h2>
        ) : (
          <>
            <h2 className="cart-title d-flex justify-content-between">
              CARRELLO
              <img
                src="/img/Nostradamus.gif"
                alt=""
                className="cart-wizard-gif"
              />
              <button
                className="btn btn-danger"
                onClick={() => { setShowClearCartModal(true) }}
              >
                Rimuovi tutti i prodotti
              </button>
            </h2>
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
                  const { image, price, quantity, id, name, discount } =
                    productCart;

                  return (
                    <tr className="align-middle" key={id}>
                      <td>
                        <img className="w-100px" src={image} alt={name} />
                        <p className="mt-2 fw-semibold">{name}</p>
                      </td>
                      {Number(discount) > 0 ? (
                        <td>
                          <div className="price-wrapper justify-content-center">
                            <span className="old-price">
                              € {Number(price).toFixed(2)}
                            </span>
                            <span className="new-price">
                              €{" "}
                              {(
                                Number(price) -
                                (Number(price) * Number(discount)) / 100
                              ).toFixed(2)}
                            </span>
                          </div>
                        </td>
                      ) : (
                        <td>€ {Number(price).toFixed(2)}</td>
                      )}
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
                              handleRemoveClick(productCart);
                            } else {
                              refreshQuantity(id, -1);
                            }
                          }}
                        >
                          -
                        </button>
                      </td>
                      {Number(discount) > 0 ? (
                        <td>
                          <div className="price-wrapper justify-content-center">
                            <span className="old-price">
                              € {(Number(price) * Number(quantity)).toFixed(2)}
                            </span>
                            <span className="new-price">
                              €{" "}
                              {(
                                (Number(price) -
                                  (Number(price) * Number(discount)) / 100) *
                                quantity
                              ).toFixed(2)}
                            </span>
                          </div>
                        </td>
                      ) : (
                        <td>
                          € {(parseFloat(price) * parseInt(quantity)).toFixed(2)}
                        </td>
                      )}
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleRemoveClick(productCart)}
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

        {/* checkout */}
        <div className="text-center">
          <button
            className="btn btn-primary"
            onClick={() => setShowCheckout(true)}
          >
            Checkout
          </button>

          <ModalCheckout
            show={showCheckout}
            onClose={() => setShowCheckout(false)}
            cartItems={cart}
          />
        </div>
        {showModal && (
          <div
            className="modal fade show"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
              position: "fixed",
              inset: 0,
              zIndex: 1050,
            }}
          >
            <div
              className="bg-white p-4 rounded-4 shadow"
              style={{ minWidth: "320px", textAlign: "center" }}
            >
              <p className="modal-text mb-3 fs-5 fw-semibold">
                Sicuro di volerlo rimuovere dal carrello?
              </p>
              <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-dark" onClick={confirmRemove}>
                  Sì
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={cancelRemove}
                >
                  Annulla
                </button>
              </div>
            </div>
          </div>
        )}
        {showClearCartModal && (
          <div
            className="modal fade show"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
              position: "fixed",
              inset: 0,
              zIndex: 1050,
            }}
          >
            <div
              className="bg-white p-4 rounded-4 shadow"
              style={{ minWidth: "320px", textAlign: "center" }}
            >
              <p className="modal-text mb-3 fs-5 fw-semibold">
                Sicuro di voler rimuovere tutti i prodotti dal carrello?
              </p>
              <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-dark" onClick={confirmClearCart}>
                  Sì
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={cancelClearCart}
                >
                  Annulla
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
