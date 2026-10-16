import React from 'react';
import { useSidebarContext } from '../../context/sidebarContext';
import { ImCancelCircle } from "react-icons/im";
import { FiHome, FiShoppingBag, FiLock } from "react-icons/fi";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { useMealContext } from '../../context/mealContext';
import { useCart } from '../../context/cartContext';

const Sidebar = () => {
    const { isSidebarOpen, closeSidebar } = useSidebarContext();
    const { categories } = useMealContext();
    const { count } = useCart();

    return (
        <>
            {isSidebarOpen && <div className='sidebar-backdrop' onClick={() => closeSidebar()} />}
            <nav className={`sidebar ${isSidebarOpen ? 'sidebar-visible' : ""}`}>
                <button type="button" className='navbar-hide-btn' onClick={() => closeSidebar()} aria-label="close">
                    <ImCancelCircle size={20} />
                </button>

                <div className='side-content'>
                    <div className='side-top'>
                        <Link to="/" className='side-link main' onClick={() => closeSidebar()}><FiHome /> Home</Link>
                        <Link to="/cart" className='side-link main' onClick={() => closeSidebar()}><FiShoppingBag /> Cart ({count})</Link>
                        <Link to="/checkout" className='side-link main cta' onClick={() => closeSidebar()}><FiLock /> Checkout</Link>
                    </div>
                    <p className='side-label'>Categories</p>
                    <ul className='side-nav'>
                        {categories.map(category => (
                            <li className='side-item' key={category.idCategory}>
                                <Link to={`/meal/category/${category.strCategory}`} className='side-link ls-1 fs-13' onClick={() => closeSidebar()}>
                                    {category.strCategory}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Sidebar
