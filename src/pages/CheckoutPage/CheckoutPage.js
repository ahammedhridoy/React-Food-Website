import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FiCheckCircle, FiLock } from "react-icons/fi";
import { useCart } from '../../context/cartContext';
import { formatPrice } from '../../utils/pricing';
import "./CheckoutPage.scss";

const CheckoutPage = () => {
  const { items, subtotal, deliveryFee, tax, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", payment: "cash", note: "" });
  const [placed, setPlaced] = useState(null);
  const [error, setError] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const placeOrder = (e) => {
    e.preventDefault();
    if (!items.length) { setError("Your cart is empty."); return; }
    if (form.name.trim().length < 3) { setError("Please enter your full name."); return; }
    if (form.phone.replace(/\D/g, "").length < 6) { setError("Please enter a valid phone number."); return; }
    if (form.address.trim().length < 8) { setError("Please enter full delivery address."); return; }
    setError("");
    const orderId = "FE-" + Math.floor(100000 + Math.random() * 900000);
    setPlaced({ id: orderId, ...form, total, count: items.length });
    clearCart();
  };

  if (placed) {
    return (
      <main className='container py-6'>
        <div className='success-card'>
          <FiCheckCircle className='s-icon' />
          <h2>Order placed! 🎉</h2>
          <p>Thanks <b>{placed.name}</b>! Order <b>{placed.id}</b> ({placed.count} items, {formatPrice(placed.total)}) is on its way.</p>
          <p className='op-07 fs-15'>Pay via <b>{placed.payment}</b> • Deliver to: {placed.address}, {placed.city}</p>
          <div className='flex justify-center' style={{ gap: 12, marginTop: 20, flexWrap: "wrap" }}>
            <button className='btn-primary' onClick={() => navigate("/")}>Order more</button>
            <button className='btn-ghost' onClick={() => navigate("/cart")}>Back to cart</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='container py-5'>
      <h1 className='cart-title'>Checkout <span>fast & secure</span></h1>
      <form className='co-grid grid' onSubmit={placeOrder}>
        <div className='co-form'>
          <div className='card'>
            <h3>1. Delivery details</h3>
            <div className='f-grid grid'>
              <label>Full name*<input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder='e.g. Tanvir Ahmed' /></label>
              <label>Phone*<input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder='01XXXXXXXXX' /></label>
            </div>
            <label>Address*<input value={form.address} onChange={(e) => set("address", e.target.value)} placeholder='House, Road, Area' /></label>
            <div className='f-grid grid'>
              <label>City<input value={form.city} onChange={(e) => set("city", e.target.value)} placeholder='Dhaka' /></label>
              <label>Note (optional)<input value={form.note} onChange={(e) => set("note", e.target.value)} placeholder='Gate code, floor ...' /></label>
            </div>
          </div>

          <div className='card'>
            <h3>2. Payment</h3>
            <div className='pay-grid grid'>
              {[
                { id: "cash", t: "💵 Cash on delivery", d: "Pay at door" },
                { id: "card", t: "💳 Card", d: "Visa / Mastercard" },
                { id: "bkash", t: "📱 bKash", d: "Mobile payment" },
              ].map((p) => (
                <button type="button" key={p.id} className={`pay ${form.payment === p.id ? 'active' : ''}`} onClick={() => set("payment", p.id)}>
                  <b>{p.t}</b><span>{p.d}</span>
                </button>
              ))}
            </div>
          </div>
          {error && <p className='err'>{error}</p>}
        </div>

        <aside className='summary'>
          <h3>Your order ({items.length})</h3>
          <div className='co-items'>
            {items.map((it) => (
              <div key={it.id} className='co-item'>
                <img src={it.thumbnail} alt={it.title} />
                <div><b>{it.title}</b><span>Qty {it.qty} × {formatPrice(it.price)}</span></div>
                <b>{formatPrice(it.qty * it.price)}</b>
              </div>
            ))}
            {!items.length && <p className='op-07'>No items — cart was cleared.</p>}
          </div>
          <div className='s-row'><span>Subtotal</span><b>{formatPrice(subtotal)}</b></div>
          <div className='s-row'><span>Delivery</span><b>{formatPrice(deliveryFee)}</b></div>
          <div className='s-row'><span>Tax</span><b>{formatPrice(tax)}</b></div>
          <div className='s-row total'><span>Total</span><b>{formatPrice(total)}</b></div>
          <button className='btn-primary w-100 justify-center' type="submit" disabled={!items.length}><FiLock /> Place order • {formatPrice(total)}</button>
        </aside>
      </form>
    </main>
  );
};

export default CheckoutPage;
