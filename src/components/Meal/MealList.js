import React, { useEffect, useState } from 'react';
import "./Meal.scss";
import MealCard from './MealCard';

const PAGE_SIZE = 8;

const MealList = ({ meals, title = "Popular meals", subtitle = "Handpicked dishes our customers love the most.", sectionId = "popular", pageSize = PAGE_SIZE }) => {
  const [visible, setVisible] = useState(pageSize);

  // reset when a new result set arrives (search / category change)
  const firstId = meals?.[0]?.idMeal;
  const total = meals?.length || 0;
  useEffect(() => {
    setVisible(pageSize);
  }, [firstId, total, pageSize]);

  if (!total) return null;
  const shown = meals.slice(0, visible);
  const remaining = total - shown.length;

  return (
    <div className='section-wrapper meal-section' id={sectionId}>
      <div className='container'>
        <div className='flex align-center justify-between' style={{ gap: 16, flexWrap: "wrap" }}>
          <div>
            <div className='sc-title' style={{ marginBottom: 6 }}>{title}</div>
            <p className='sc-subtitle' style={{ margin: 0, marginBottom: 22 }}>{subtitle}</p>
          </div>
          <span className='pill'>Showing {shown.length} of {total}</span>
        </div>
        <section className='meal-grid grid'>
          {shown.map((mealItem) => (
            <MealCard key={mealItem.idMeal} mealItem={mealItem} />
          ))}
        </section>
        {remaining > 0 && (
          <div className='load-more-wrap'>
            <button className='btn-primary' onClick={() => setVisible((v) => v + pageSize)}>
              Load more ({remaining} remaining)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealList;
