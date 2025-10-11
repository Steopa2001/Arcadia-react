import React from "react";
import Checkout from "./Checkout.jsx";

const ModalCheckout = ({ show, onClose, cartItems }) => {
  if (!show) return null;

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1050,
      }}
    >
      <div
        className="modal-content arcadia-modal"
        style={{
          maxWidth: "800px",
          borderradius: "0",
          width: "90%",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {/* Bottone chiudi */}
        <button
          onClick={onClose}
          className="btn-close"
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            fontSize: "1.2rem",
          }}
        ></button>

        {/* Checkout form */}
        <Checkout cartItems={cartItems} />
      </div>
    </div>
  );
};

export default ModalCheckout;
