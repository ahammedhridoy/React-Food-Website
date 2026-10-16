import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Header.scss";
import { MdFoodBank } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { FiShoppingBag, FiSearch } from "react-icons/fi";
import { useSidebarContext } from '../../context/sidebarContext';
import { useCart } from '../../context/cartContext';

const Navbar = () => {
  const { openSidebar } = useSidebarContext();
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goSection = (id) => {
    const scroll = () => {
      // retry a few times — section may render after API loads
      let tries = 0;
      const tick = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else if (tries++ < 20) setTimeout(tick, 200);
      };
      tick();
    };
    if (location.pathname !== "/") navigate("/");
    setTimeout(scroll, location.pathname !== "/" ? 350 : 0);
  };

  return (
    <nav className={`navbar-modern ${scrolled ? 'scrolled' : ""}`}>
      <div className='container w-100'>
        <div className='nav-inner flex align-center justify-between'>
          <Link to="/" className='brand flex align-center'>
            <span className='brand-icon'><MdFoodBank /></span>
            <span className='brand-text'>FastEat<span className='dot'>.</span></span>
          </Link>

          <div className='nav-links flex align-center'>
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
            <button className='nav-link as-btn' onClick={() => goSection("categories")}>Categories</button>
            <button className='nav-link as-btn' onClick={() => goSection("popular")}>Popular</button>
            <button className='nav-link as-btn' onClick={() => goSection("how")}>How it works</button>
          </div>

          <div className='nav-actions flex align-center'>
            <button className='icon-btn hide-md' onClick={() => goSection("popular")} aria-label="search">
              <FiSearch size={19} />
            </button>
            <button className='cart-btn flex align-center' onClick={() => navigate("/cart")} aria-label="cart">
              <FiShoppingBag size={19} />
              <span className='cart-label hide-sm'>Cart</span>
              {count > 0 && <span className='cart-count'>{count > 99 ? "99+" : count}</span>}
            </button>
            <Link to="/checkout" className='btn-primary nav-cta hide-sm'>Order Now</Link>
            <button type="button" className='icon-btn menu-btn' onClick={() => openSidebar()} aria-label="menu">
              <IoMdMenu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
