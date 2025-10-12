import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Checkout from "./Checkout.jsx";

const ModalCheckout = ({ show, onClose, cartItems }) => {
  if (!show) return null;

  // blocca lo scroll sotto
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const modalContent = (
    <div className="checkout-portal-overlay">
      <div className="checkout-portal-modal">
        <button className="checkout-portal-close" onClick={onClose}>
          ✕
        </button>
        <Checkout cartItems={cartItems} />
      </div>
    </div>
  );

  // Monta il modale nel body (fuori dal resto dell'app)
  return ReactDOM.createPortal(modalContent, document.body);
};

export default ModalCheckout;
