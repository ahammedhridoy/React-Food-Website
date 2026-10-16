import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiCheck, FiClock, FiStar } from "react-icons/fi";
import { useCart } from '../../context/cartContext';
import { getPriceForMeal, formatPrice } from '../../utils/pricing';

let toastTimer = null;
const showToast = (msg) => {
  let el = document.querySelector(".cart-toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "cart-toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 1800);
};

const MealCard = ({ mealItem }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const { idMeal: id, strArea: area, strCategory: category, strMeal: meal, strMealThumb: thumbnail } = mealItem;
  const price = getPriceForMeal(id);
  const rating = `4.${(Number(id) % 5) + 4}`;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(mealItem, 1);
    setAdded(true);
    showToast(`${meal} added to cart`);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="meal-card">
      <Link to={`/meal/${id}`} className="meal-media">
        <img src={thumbnail} alt={meal} loading="lazy" />
        <span className="meal-gradient" />
        <span className="meal-cat">{category || "Special"}</span>
        <span className="meal-rating"><FiStar /> {rating}</span>
        <span className="meal-price">{formatPrice(price)}</span>
      </Link>
      <div className="meal-info">
        <span className="meal-area">{area || "World cuisine"}</span>
        <Link to={`/meal/${id}`} className="meal-name">{meal}</Link>
        <div className="meal-foot">
          <span className="meal-time"><FiClock /> 15-25 min • Free delivery</span>
          <button className={`add-btn ${added ? 'ok' : ''}`} onClick={handleAdd} aria-label="add to cart">
            {added ? <><FiCheck /> Added</> : <><FiPlus /> Add</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
