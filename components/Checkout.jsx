import React, { useState } from "react";
import axios from "axios";

const Checkout = ({ cartItems }) => {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const [isPaying, setIsPaying] = useState(false);

  const showToast = (message, variant = "success") => {
    setToast({ show: true, message, variant });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 2500);
  };

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
    cap: "",
    city: "",
    province: "",
    phone: "",
  });

  // --------------------------FATTURAZIONE------------------------------------
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [billingData, setBillingData] = useState({
    name: "",
    surname: "",
    company: "",
    address: "",
    cap: "",
    city: "",
    province: "",
    phone: "",
  });

  // ---------------------------PAGAMENTO------------------------------------
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    cardHolder: "",
  });

  // -------- Totale con sconti (15 => 15%)
  const total = cartItems.reduce((acc, i) => {
    const price = parseFloat(i.price);
    const discount = parseFloat(i.discount) || 0;
    const qty = parseInt(i.quantity);
    const discountedPrice = price - (price * discount) / 100;
    return acc + discountedPrice * qty;
  }, 0);

  // ----------------------Handlers-----------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  // -----------------------Submit---------------------------
const handleSubmit = (e) => {
  e.preventDefault();

  // dati minimi degli items
  const items = cartItems.map(i => ({
    id: i.id,
    name: i.name,
    qty: i.quantity || 1,
  }));

  // billing opzionale (se diverso dalla spedizione)
  const billing = billingSameAsShipping ? {} : {
    billing_name: billingData.name,
    billing_surname: billingData.surname,
    billing_company: billingData.company || null,
    billing_address: billingData.address,
    billing_cap: billingData.cap,
    billing_city: billingData.city,
    billing_province: billingData.province,
    billing_phone: billingData.phone || null,
  };

  // payload ordine (usa il tuo `total` già calcolato nel componente)
  const body = {
    name: formData.name,
    surname: formData.surname,
    email: formData.email,
    address: formData.address,
    cap: formData.cap,
    city: formData.city,
    province: formData.province,
    phone: formData.phone,
    total: Number(total.toFixed(2)),
    items,
    payment_method: paymentMethod,
    ...billing,
  };

  axios.post("http://localhost:3000/orders", body)
    .then(() => {
      showToast("Pagamento riuscito! Ordine creato", "success");
      // prova a svuotare il carrello ma non bloccare l'esperienza se fallisce
      return axios.delete("http://localhost:3000/cart").catch(() => {});
    })
    .catch(() => {
      showToast("Errore durante il pagamento", "error");
    });
};



  const clearCart = () => {
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
      .catch((err) =>
        console.error("Errore durante la pulizia del carrello:", err)
      );

    setShowClearCartModal(false);
  };

  return (
    <div className="container py-4">
      <h2 className="checkout-title">Checkout</h2>

      <form onSubmit={handleSubmit}>
        {/* Spedizione */}
        <div className="card mb-4">
          <div className="card-body">
            <h3 className="h5 mb-3">Dati di spedizione</h3>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Nome</label>
                <input
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nome"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Cognome</label>
                <input
                  className="form-control"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  placeholder="Cognome"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label">Indirizzo</label>
                <input
                  className="form-control"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Indirizzo"
                  required
                />
              </div>

              <div className="col-sm-6 col-md-3">
                <label className="form-label">CAP</label>
                <input
                  className="form-control"
                  name="cap"
                  value={formData.cap}
                  onChange={handleChange}
                  placeholder="CAP"
                  required
                />
              </div>

              <div className="col-sm-6 col-md-5">
                <label className="form-label">Città</label>
                <input
                  className="form-control"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Città"
                  required
                />
              </div>

              <div className="col-sm-6 col-md-2">
                <label className="form-label">Provincia</label>
                <input
                  className="form-control"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  placeholder="Provincia"
                  required
                />
              </div>

              <div className="col-sm-6 col-md-2">
                <label className="form-label">Telefono</label>
                <input
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Telefono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pagamento */}
        <div className="card mb-4">
          <div className="card-body">
            <h3 className="h5 mb-3">Pagamento</h3>

            <div className="list-group mb-3">
              <label className="list-group-item d-flex align-items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Carta di credito</span>
              </label>

              <label className="list-group-item d-flex align-items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>PayPal</span>
              </label>
            </div>

            {paymentMethod === "card" && (
              <div className="row g-3 mb-3">
                <div className="col-12">
                  <label className="form-label">Numero carta</label>
                  <input
                    className="form-control"
                    name="cardNumber"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    value={cardData.cardNumber}
                    onChange={handleCardChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>

                <div className="col-sm-6">
                  <label className="form-label">Data di scadenza (MM/AA)</label>
                  <input
                    className="form-control"
                    name="expiry"
                    value={cardData.expiry}
                    onChange={handleCardChange}
                    placeholder="MM/AA"
                    required
                  />
                </div>

                <div className="col-sm-6">
                  <label className="form-label">Codice di sicurezza</label>
                  <input
                    className="form-control"
                    name="cvc"
                    value={cardData.cvc}
                    onChange={handleCardChange}
                    placeholder="CVC"
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Nome sulla carta</label>
                  <input
                    className="form-control"
                    name="cardHolder"
                    autoComplete="cc-name"
                    value={cardData.cardHolder}
                    onChange={handleCardChange}
                    placeholder="Nome e cognome come sulla carta"
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="billingSame"
                checked={billingSameAsShipping}
                onChange={(e) => setBillingSameAsShipping(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="billingSame">
                Usa l’indirizzo di spedizione come indirizzo di fatturazione
              </label>
            </div>

            {!billingSameAsShipping && (
              <>
                <h4 className="h6 mb-3">Indirizzo di fatturazione</h4>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Nome</label>
                    <input
                      className="form-control"
                      name="name"
                      value={billingData.name}
                      onChange={handleBillingChange}
                      placeholder="Nome"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Cognome</label>
                    <input
                      className="form-control"
                      name="surname"
                      value={billingData.surname}
                      onChange={handleBillingChange}
                      placeholder="Cognome"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Azienda (facoltativo)</label>
                    <input
                      className="form-control"
                      name="company"
                      value={billingData.company}
                      onChange={handleBillingChange}
                      placeholder="Azienda"
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Indirizzo</label>
                    <input
                      className="form-control"
                      name="address"
                      value={billingData.address}
                      onChange={handleBillingChange}
                      placeholder="Indirizzo"
                      required
                    />
                  </div>

                  <div className="col-sm-6 col-md-3">
                    <label className="form-label">CAP</label>
                    <input
                      className="form-control"
                      name="cap"
                      value={billingData.cap}
                      onChange={handleBillingChange}
                      placeholder="CAP"
                      required
                    />
                  </div>

                  <div className="col-sm-6 col-md-5">
                    <label className="form-label">Città</label>
                    <input
                      className="form-control"
                      name="city"
                      value={billingData.city}
                      onChange={handleBillingChange}
                      placeholder="Città"
                      required
                    />
                  </div>

                  <div className="col-sm-6 col-md-2">
                    <label className="form-label">Provincia</label>
                    <input
                      className="form-control"
                      name="province"
                      value={billingData.province}
                      onChange={handleBillingChange}
                      placeholder="Provincia"
                      required
                    />
                  </div>

                  <div className="col-sm-6 col-md-2">
                    <label className="form-label">Telefono (facoltativo)</label>
                    <input
                      className="form-control"
                      name="phone"
                      value={billingData.phone}
                      onChange={handleBillingChange}
                      placeholder="Telefono"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Riepilogo */}
        <div className="card mb-4">
          <div className="card-body text-center">
            <h3 className="h5 mb-3">Riepilogo ordine</h3>

            <ul className="list-group mb-3">
              {cartItems.map((item) => {
                const price = parseFloat(item.price);
                const discount = parseFloat(item.discount) || 0; // 15 = 15%
                const qty = parseInt(item.quantity) || 0;
                const unit = price * (1 - discount / 100);
                const hasDiscount = discount > 0;

                return (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>
                      {item.name} ×{qty}
                    </span>

                    <div className="text-end" style={{ minWidth: 160 }}>
                      {hasDiscount ? (
                        <div
                          className="price-wrapper"
                          style={{ justifyContent: "flex-end" }}
                        >
                          <span className="old-price">
                            € {price.toFixed(2)}
                          </span>
                          <span className="new-price">€ {unit.toFixed(2)}</span>
                        </div>
                      ) : (
                        // per i non-scontati mostro il prezzo unitario "nuovo" direttamente
                        <div
                          className="price-wrapper"
                          style={{ justifyContent: "flex-end" }}
                        >
                          <span className="new-price">€ {unit.toFixed(2)}</span>
                        </div>
                      )}

                      <small className="text-muted">
                        Subtotale: € {(unit * qty).toFixed(2)}
                      </small>
                    </div>
                  </li>
                );
              })}

              <li className="list-group-item d-flex justify-content-between">
                <strong>Totale</strong>
                <strong>€{total.toFixed(2)}</strong>
              </li>
            </ul>

            <button
              type="submit"
              className="btn btn-primary text-center"
              disabled={isPaying}
            >
              {isPaying ? "Elaboro..." : "Paga ora"}{" "}
            </button>
          </div>
        </div>
      </form>
      <div
        className={`app-toast ${toast.show ? "show" : ""} ${toast.variant}`}
        role="status"
        aria-live="polite"
      >
        {toast.message}
      </div>
    </div>
  );
};

export default Checkout;
