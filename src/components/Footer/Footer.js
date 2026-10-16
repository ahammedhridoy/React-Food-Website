import React from 'react';
import { Link } from "react-router-dom";
import { MdFoodBank } from "react-icons/md";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='footer-grid grid'>
          <div>
            <Link to="/" className='brand flex align-center'>
              <span className='brand-icon'><MdFoodBank /></span>
              <span className='brand-text'>FastEat<span className='dot'>.</span></span>
            </Link>
            <p className='op-07'>Hot, fresh & fast. Your favourite meals delivered in minutes.</p>
            <div className='pay-row'>
              <span>Cash</span><span>Card</span><span>bKash</span><span>COD</span>
            </div>
          </div>
          <div>
            <h4>Shop</h4>
            <Link to="/" className='flink'>All meals</Link>
            <a href="#categories" className='flink'>Categories</a>
            <Link to="/cart" className='flink'>Cart</Link>
            <Link to="/checkout" className='flink'>Checkout</Link>
          </div>
          <div>
            <h4>Help</h4>
            <span className='flink'>Track order</span>
            <span className='flink'>Delivery info</span>
            <span className='flink'>Support 24/7</span>
          </div>
          <div className='news'>
            <h4>Get 20% off</h4>
            <p className='op-07 fs-14'>Join newsletter for tasty deals.</p>
            <form onSubmit={(e) => e.preventDefault()} className='flex'>
              <input placeholder='Email address' />
              <button className='btn-primary' type="submit">Join</button>
            </form>
          </div>
        </div>
        <div className='copy flex align-center justify-between'>
          <span>© {new Date().getFullYear()} FastEat. All rights reserved.</span>
          <span>Made with ❤️ for foodies</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
