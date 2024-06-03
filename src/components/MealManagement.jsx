import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MealManagement() {
  const token = localStorage.getItem('token');
  const [meals, setMeals] = useState([]);
  const [newFoodItem, setNewFoodItem] = useState({
    mealType: '',
    foodId: '',
    quantity: 0
  });
  const [availableFoods, setAvailableFoods] = useState([]);

  useEffect(() => {
    fetchUserMeals();
    fetchAvailableFoods();
  }, []);

  const fetchUserMeals = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/meals', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMeals(response.data);
    } catch (error) {
      console.error('Error fetching user meals:', error);
    }
  };

  const fetchAvailableFoods = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/Food');
      setAvailableFoods(response.data);
    } catch (error) {
      console.error('Error fetching available foods:', error);
    }
  };

  const handleMealChange = (e) => {
    const { name, value } = e.target;
    const selectedFood = availableFoods.find(food => food._id === value);
    setNewFoodItem({ ...newFoodItem, [name]: value, Nazwa: selectedFood ? selectedFood.Nazwa : '' });
  };
  

  const addFoodToMeal = async () => {
    console.log(newFoodItem);
    console.log(token);
  
    const mealData = {
      mealType: newFoodItem.mealType,
      foodId: newFoodItem.foodId,
      quantity: newFoodItem.quantity
    };
  
    try {
      await axios.post('http://localhost:5000/api/meals', mealData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchUserMeals();
      // Zresetuj nowy produkt
      setNewFoodItem({
        mealType: '',
        foodId: '',
        quantity: 0
      });
    } catch (error) {
      console.error('Error adding food to meal:', error);
    }
  };
  

  const deleteFoodFromMeal = async (mealId, foodItemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/meals/${mealId}/foods/${foodItemId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchUserMeals();
    } catch (error) {
      console.error('Error deleting food from meal:', error);
    }
  };

  return (
    <div>
      <h1>Posiłki użytkownika</h1>
      <h2>Dodaj produkt do posiłku</h2>
      <select name="mealType" value={newFoodItem.mealType} onChange={handleMealChange} required>
        <option value="">Wybierz typ posiłku</option>
        <option value="sniadanie">Śniadanie</option>
        <option value="obiad">Obiad</option>
        <option value="kolacja">Kolacja</option>
        <option value="przekaski">Przekąski</option>
      </select>
      <select name="foodId" value={newFoodItem.foodId} onChange={handleMealChange} required>
        <option value="">Wybierz produkt</option>
        {availableFoods.map(food => (
          <option key={food._id} value={food._id}>{food.Nazwa}</option>
        ))}
      </select>
      <input type="number" name="quantity" value={newFoodItem.quantity} onChange={handleMealChange} required />
      <button onClick={addFoodToMeal}>Dodaj produkt</button>
      
      <ul>
      {meals.map(meal => (
  <li key={meal._id}>
    <h3>{meal.type}</h3>
    <ul>
      {meal.foodItems.map(item => {
       
        return (
          <li key={item._id}>
            {item.Nazwa}: {item.quantity} sztuk
            <button onClick={() => deleteFoodFromMeal(meal._id, item._id)}>Usuń produkt</button>
          </li>
        );
      })}
    </ul>
  </li>
))}

</ul>
    </div>
  );
}

export default MealManagement;
