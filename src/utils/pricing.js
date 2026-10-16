export const getPriceForMeal = (id) => {
  const num = parseInt(id, 10) || 0;
  const base = 7.99 + ((num % 23) * 1.15) + ((num % 7) * 0.6) + ((num % 5) * 0.4);
  return Math.round(base * 100) / 100;
};

export const formatPrice = (n) => `$${Number(n || 0).toFixed(2)}`;

export const normalizeMealForCart = (mealItem) => {
  const id = mealItem?.idMeal || mealItem?.id;
  return {
    id: String(id),
    title: mealItem?.strMeal || mealItem?.title || "Tasty Meal",
    thumbnail: mealItem?.strMealThumb || mealItem?.thumbnail || "",
    category: mealItem?.strCategory || mealItem?.category || "Special",
    area: mealItem?.strArea || mealItem?.area || "",
    price: getPriceForMeal(id),
  };
};
