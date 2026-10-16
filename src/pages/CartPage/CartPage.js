import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FiMinus, FiPlus, FiTrash2, FiArrowLeft, FiLock } from "react-icons/fi";
import { useCart } from '../../context/cartContext';
import { formatPrice } from '../../utils/pricing';
import "./CartPage.scss";

const CartPage = () => {
  const { items, setQty, removeFromCart, clearCart, subtotal, deliveryFee, tax, total } = useCart();
  const navigate = useNavigate();

  if (!items.length) {
    return (
      <main className='container py-6'>
        <div className='empty-cart'>
          <div className='e-emoji'>🛒</div>
          <h2>Your cart is empty</h2>
          <p className='op-07'>Looks like you haven't added anything yet. Let's fix that!</p>
          <Link to="/" className='btn-primary'>Browse meals</Link>
        </div>
      </main>
    );
  }

  return (
    <main className='container py-5'>
      <button className='btn-ghost' onClick={() => navigate("/")}><FiArrowLeft /> Continue shopping</button>
      <h1 className='cart-title'>Your cart <span>({items.length} items)</span></h1>

      <div className='cart-grid grid'>
        <div className='cart-items'>
          {items.map((it) => (
            <div className='cart-row' key={it.id}>
              <img src={it.thumbnail} alt={it.title} onClick={() => navigate(`/meal/${it.id}`)} />
              <div className='ci-info'>
                <b onClick={() => navigate(`/meal/${it.id}`)}>{it.title}</b>
                <span className='fs-14 op-07'>{it.category}</span>
                <span className='c-price'>{formatPrice(it.price)}</span>
              </div>
              <div className='ci-actions'>
                <div className='qty'>
                  <button onClick={() => setQty(it.id, it.qty - 1)}><FiMinus /></button>
                  <b>{it.qty}</b>
                  <button onClick={() => setQty(it.id, it.qty + 1)}><FiPlus /></button>
                </div>
                <b className='line-total'>{formatPrice(it.price * it.qty)}</b>
                <button className='del' onClick={() => removeFromCart(it.id)} aria-label="remove"><FiTrash2 /></button>
              </div>
            </div>
          ))}
          <button className='clear' onClick={clearCart}>Clear cart</button>
        </div>

        <aside className='summary'>
          <h3>Order summary</h3>
          <div className='s-row'><span>Subtotal</span><b>{formatPrice(subtotal)}</b></div>
          <div className='s-row'><span>Delivery {subtotal > 40 ? "(FREE)" : ""}</span><b>{formatPrice(deliveryFee)}</b></div>
          <div className='s-row'><span>Tax (8%)</span><b>{formatPrice(tax)}</b></div>
          <div className='s-row total'><span>Total</span><b>{formatPrice(total)}</b></div>
          {subtotal <= 40 && <p className='fs-14 op-07'>Add {formatPrice(40 - subtotal)} more for FREE delivery 🎉</p>}
          <button className='btn-primary w-100 justify-center' onClick={() => navigate("/checkout")}><FiLock /> Checkout securely</button>
          <p className='fs-13 op-07 secure'>🔒 Cash, Card & bKash accepted</p>
        </aside>
      </div>
    </main>
  );
};

export default CartPage;
