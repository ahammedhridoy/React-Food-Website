import React from 'react';
import { BsSearch, BsStarFill, BsTruck, BsShieldCheck } from "react-icons/bs";
import { useMealContext } from '../../context/mealContext';
import { startFetchMealsBySearch } from '../../actions/mealsActions';

const Hero = () => {
  const [term, setTerm] = React.useState("");
  const { dispatch } = useMealContext();

  const submit = (e) => {
    e.preventDefault();
    if (!term.trim()) return;
    startFetchMealsBySearch(dispatch, term.trim());
    document.getElementById("popular")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className='hero'>
      <div className='container'>
        <div className='hero-grid grid'>
          <div className='hero-copy'>
            <span className='pill'>🔥 #1 Food delivery in town</span>
            <h1>Crave it.<br />We <span className='hl'>cook & deliver</span><br />in minutes.</h1>
            <p className='hero-sub'>Search 300+ world cuisines, add to cart and checkout in seconds. Fresh, hot and at your door.</p>
            <form className='hero-search' onSubmit={submit}>
              <div className='hs-row'>
                <BsSearch className='s-icon' />
                <input value={term} onChange={(e) => setTerm(e.target.value)} placeholder='Search biryani, pizza, sushi ...' />
              </div>
              <button type="submit" className='btn-primary'>Search</button>
            </form>
            <div className='hero-meta flex align-center'>
              <div className='avatars flex align-center'>
                <img src="https://i.pravatar.cc/64?img=5" alt="u" />
                <img src="https://i.pravatar.cc/64?img=12" alt="u" />
                <img src="https://i.pravatar.cc/64?img=32" alt="u" />
                <span className='more'>12k+</span>
              </div>
              <div className='rating'>
                <span className='stars flex align-center'><BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /> <b>4.9</b></span>
                <span className='fs-14 op-07'>12,400+ happy reviews</span>
              </div>
            </div>
            <div className='hero-badges flex'>
              <span className='flex align-center'><BsTruck /> Free delivery over $40</span>
              <span className='flex align-center'><BsShieldCheck /> Cash / Card / bKash</span>
            </div>
          </div>
          <div className='hero-visual'>
            <div className='hero-img-main'>
              <img src="https://www.themealdb.com/images/media/meals/58oia61564916529.jpg" alt="hero food" />
              <div className='float-card fc1'>
                <img src="https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg" alt="small" />
                <div><b>Chicken Handi</b><span>⭐ 4.8 • 15 min</span></div>
              </div>
              <div className='float-card fc2'>
                <b>🚴 25 min</b><span>Avg. delivery</span>
              </div>
            </div>
            <div className='hero-stats flex'>
              <div><b>300+</b><span>Dishes</span></div>
              <div><b>14</b><span>Categories</span></div>
              <div><b>25min</b><span>Delivery</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
