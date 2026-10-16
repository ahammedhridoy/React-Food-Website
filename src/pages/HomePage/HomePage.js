import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { FiTruck, FiCreditCard, FiClock } from "react-icons/fi";
import { useMealContext } from '../../context/mealContext';
import { startFetchMealsBySearch } from '../../actions/mealsActions';
import Loader from "../../components/Loader/Loader";
import CategoryList from "../../components/Category/CategoryList";
import NotFound from "../../components/NotFound/NotFound";
import MealList from "../../components/Meal/MealList";
import Hero from "../../components/Hero/Hero";
import "./HomePage.scss";

const HomePage = () => {
  const { categories, meals, categoryLoading, mealsLoading, dispatch } = useMealContext();
  const showSearchResults = meals && meals.length > 0;

  // Default popular meals so #popular section always exists
  useEffect(() => {
    if (!meals || meals.length === 0) {
      startFetchMealsBySearch(dispatch, "chicken");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className='main-content home-main'>
      <Hero />

      <div className='container'>
        <div className='trust-row'>
          <div className='trust-card'>
            <span className='t-icon'><FiTruck /></span>
            <div className='t-text'><b>Fast delivery</b><span>25 min average</span></div>
          </div>
          <div className='trust-card'>
            <span className='t-icon'><FiCreditCard /></span>
            <div className='t-text'><b>Easy checkout</b><span>Card, cash, bKash</span></div>
          </div>
          <div className='trust-card'>
            <span className='t-icon'><FiClock /></span>
            <div className='t-text'><b>Live tracking</b><span>Cart → doorstep</span></div>
          </div>
        </div>
      </div>

      {mealsLoading ? <Loader /> : meals === null ? <NotFound /> : showSearchResults ? (
        <MealList meals={meals} title="Popular right now" subtitle="Add anything you like straight to cart." sectionId="popular" />
      ) : null}

      {categoryLoading ? <Loader /> : <CategoryList categories={categories} />}

      {!showSearchResults && (
        <div className='container'>
          <div className='cta-banner'>
            <div>
              <h2>Hungry? Get 20% off your first order 🔥</h2>
              <p>Use code <b>WELCOME20</b> at checkout. Free delivery over $40.</p>
            </div>
            <Link to="/cart" className='btn-primary'>View cart</Link>
          </div>

          <div className='how' id="how">
            <div className='how-card'><span className='step'>1</span><h4>Search & pick</h4><p>Browse 300+ dishes by category or craving.</p></div>
            <div className='how-card'><span className='step'>2</span><h4>Add to cart</h4><p>One tap to add, qty control on every dish.</p></div>
            <div className='how-card'><span className='step'>3</span><h4>Checkout fast</h4><p>Address + payment, order in under a minute.</p></div>
          </div>
        </div>
      )}
    </main>
  );
};

export default HomePage;
