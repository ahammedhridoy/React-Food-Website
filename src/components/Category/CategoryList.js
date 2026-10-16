import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from "react-icons/fi";
import "./Category.scss";

const GRADS = [
  "linear-gradient(135deg,#ffedd5,#fed7aa)",
  "linear-gradient(135deg,#fee2e2,#fecaca)",
  "linear-gradient(135deg,#dcfce7,#bbf7d0)",
  "linear-gradient(135deg,#fef9c3,#fde68a)",
  "linear-gradient(135deg,#e0e7ff,#c7d2fe)",
  "linear-gradient(135deg,#fae8ff,#f5d0fe)",
  "linear-gradient(135deg,#cffafe,#a5f3fc)",
  "linear-gradient(135deg,#ffe4e6,#fecdd3)",
];

const CategoryList = ({ categories }) => {
  if (!categories?.length) return null;
  return (
    <div className='cat-section' id="categories">
      <div className='container'>
        <div className='cat-head'>
          <div>
            <div className='sc-title' style={{ marginBottom: 6 }}>Explore categories</div>
            <p className='sc-subtitle' style={{ margin: 0, marginBottom: 22 }}>Pick your craving — beef, chicken, vegan, dessert & more.</p>
          </div>
          <span className='pill'>{categories.length} categories</span>
        </div>
        <section className='cat-grid'>
          {categories.map((category, i) => {
            const { idCategory: id, strCategory: title, strCategoryThumb: thumbnail } = category;
            return (
              <Link to={`/meal/category/${title}`} className="cat-card" key={id} style={{ background: GRADS[i % GRADS.length] }}>
                <span className='cat-num'>{String(i + 1).padStart(2, "0")}</span>
                <div className='cat-img'>
                  <img src={thumbnail} alt={title} loading="lazy" />
                </div>
                <div className='cat-foot'>
                  <div><b>{title}</b><span>Explore dishes</span></div>
                  <span className='go'><FiArrowUpRight /></span>
                </div>
              </Link>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default CategoryList;
