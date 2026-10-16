import React, { useState } from 'react';
import "./Meal.scss";
import { AiFillHome } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { BiChevronsRight } from "react-icons/bi";
import { FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";
import { useCart } from '../../context/cartContext';
import { getPriceForMeal, formatPrice } from '../../utils/pricing';

const MealSingle = ({ meal }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  if (!meal?.id) return null;

  const price = getPriceForMeal(meal.id);
  let instructions = meal?.instructions?.split('\r\n');
  instructions = instructions?.filter((i) => i.length > 1)?.slice(0, 8);

  const buy = (goCheckout) => {
    addToCart({ idMeal: meal.id, strMeal: meal.title, strMealThumb: meal.thumbnail, strCategory: meal.category, strArea: meal.area }, qty);
    if (goCheckout) navigate("/checkout");
    else navigate("/cart");
  };

  return (
    <div className='meal-details-wrap'>
      <div className='container'>
        <div className='breadcrumb bg-white'>
          <ul className='flex align-center my-2'>
            <li className='breadcrumb-item'>
              <Link to="/" className='flex align-center'><AiFillHome size={22} /></Link>
            </li>
            <li className='flex align-center mx-1'><BiChevronsRight size={23} /></li>
            <li className='breadcrumb-item flex'><span className='fs-15 fw-5'>{meal?.title}</span></li>
          </ul>
        </div>

        <div className='detail-grid grid'>
          <div className='detail-gallery'>
            <img src={meal?.thumbnail} alt={meal?.title} className='img-cover' />
          </div>

          <div className='detail-info'>
            <span className='pill'>{meal?.category || "Special"} • {meal?.area || "World"}</span>
            <h1 className='my-2'>{meal?.title}</h1>
            <div className='meta-row'>
              <span className='meta-chip'>⭐ 4.8 (2.3k reviews)</span>
              <span className='meta-chip'>🕒 15-25 min</span>
              <span className='meta-chip'>🔥 Free delivery over $40</span>
            </div>
            <div className='price-row'>
              <span className='price'>{formatPrice(price)}</span>
              <span className='old'>{formatPrice(price * 1.25)}</span>
              <span className='pill'>20% OFF</span>
            </div>

            <div className='qty-row'>
              <div className='qty'>
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}><FiMinus /></button>
                <b>{qty}</b>
                <button onClick={() => setQty((q) => Math.min(20, q + 1))}><FiPlus /></button>
              </div>
              <button className='btn-ghost' onClick={() => buy(false)}><FiShoppingBag /> Add to cart</button>
              <button className='btn-primary' onClick={() => buy(true)}>Buy now • {formatPrice(price * qty)}</button>
            </div>

            {meal?.tags && (
              <div className='tags'>
                {meal.tags.split(',').slice(0, 4).map((t, i) => <span key={i}>#{t.trim()}</span>)}
              </div>
            )}

            <div className='ing-box'>
              <h4>Ingredients ({meal?.ingredients?.length || 0})</h4>
              <ul>
                {meal?.ingredients?.slice(0, 10).map((ing, idx) => (
                  <li key={idx}>{idx + 1}. {ing} {meal?.measures?.[idx] ? `— ${meal.measures[idx]}` : ""}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className='instructions-card'>
          <div className='sc-title'>How we cook it</div>
          <ul>
            {instructions?.map((ins, idx) => (
              <li key={idx}><span className='n'>{idx + 1}</span><span>{ins}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MealSingle;
