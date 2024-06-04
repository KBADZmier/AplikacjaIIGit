import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MealManagement() {
  const token = localStorage.getItem('token');
  const [meals, setMeals] = useState([]);
  const [newFoodItem, setNewFoodItem] = useState({
    mealType: '',
    foodId: '',
    quantity: 0,
    Nazwa: '',
    Kcal: 0,
    Jednostka: '',
    Ilosc_tluszczu: 0,
    Ilosc_bialka: 0,
    Ilosc_weglowodanow: 0,
    Rodzaj: ''
  });
  const [availableFoods, setAvailableFoods] = useState([]);
  const [kcalSum, setKcalSum] = useState(0);
  const [carboSum, setCarboSum] = useState(0);
  const [fatSum, setFatSum] = useState(0);
  const [proteinSum, setProteinSum] = useState(0);

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
      const mealsData = response.data;
      console.log(mealsData)
      setMeals(mealsData);

     
      let totalKcal= 0;
      let totalProtein=0;
      let totalCarbo= 0;
      let totalFat =0;
    
      mealsData.forEach(meal => {
        meal.foodItems.forEach(item => {
          
          console.log(item.foodId.Ilosc_weglowodanow)
          totalKcal += item.foodId.Kcal * item.quantity;
          totalCarbo += item.foodId.Ilosc_weglowodanow*item.quantity;
          totalProtein += item.foodId.Ilosc_bialka*item.quantity;
          totalFat += item.foodId.Ilosc_tluszczu*item.quantity;
        });
      });





      
      setKcalSum(totalKcal);
      setCarboSum(totalCarbo);
      setFatSum(totalFat);
      setProteinSum(totalProtein);
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

    if (name === 'foodId') {
      const selectedFood = availableFoods.find(food => food._id === value);
      setNewFoodItem({
        ...newFoodItem,
        [name]: value,
        Nazwa: selectedFood ? selectedFood.Nazwa : '',
        Kcal: selectedFood ? selectedFood.Kcal : 0,
        Jednostka: selectedFood ? selectedFood.Jednostka : '',
        Ilosc_tluszczu: selectedFood ? selectedFood.Ilosc_tluszczu  : 0,
        Ilosc_bialka: selectedFood ? selectedFood.Ilosc_bialka : 0,
        Ilosc_weglowodanow: selectedFood ? selectedFood.Ilosc_weglowodanow : 0,
        Rodzaj: selectedFood ? selectedFood.Rodzaj : ''
      });
    } else {
      setNewFoodItem({
        ...newFoodItem,
        [name]: value
      });
    }
  };

  const addFoodToMeal = async () => {
    console.log(newFoodItem);
    const mealData = {
      mealType: newFoodItem.mealType,
      foodId: newFoodItem.foodId,
      quantity: newFoodItem.quantity,
      Nazwa: newFoodItem.Nazwa,
      Kcal: newFoodItem.Kcal,
      Jednostka: newFoodItem.Jednostka,
      Ilosc_tluszczu: newFoodItem.Ilosc_tluszczu,
      Ilosc_bialka: newFoodItem.Ilosc_bialka,
      Ilosc_weglowodanow: newFoodItem.Ilosc_weglowodanow,
      Rodzaj: newFoodItem.Rodzaj
    };

    console.log('Sending meal data:', mealData);

    try {
      await axios.post('http://localhost:5000/api/meals', mealData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchUserMeals();

      setNewFoodItem({
        mealType: '',
        foodId: '',
        quantity: 0,
        Nazwa: '',
        Kcal: 0,
        Jednostka: '',
        Ilosc_tluszczu: 0,
        Ilosc_bialka: 0,
        Ilosc_weglowodanow: 0,
        Rodzaj: ''
      });
    } catch (error) {
      console.error('Error adding food to meal:', error);
    }
  };

  const deleteFoodFromMeal = async (mealId, foodItemId) => {
    console.log(mealId,foodItemId);
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
              {meal.foodItems.map(item => (
                <li key={item.foodId._id}>
                  {item.foodId.Nazwa}: {item.quantity} x{item.foodId.Jednostka} ({item.foodId.Kcal} Kcal, {item.foodId.Ilosc_tluszczu}g tłuszczu, {item.foodId.Ilosc_bialka}g białka, {item.foodId.Ilosc_weglowodanow}g węglowodanów)
                  <button onClick={() => deleteFoodFromMeal(meal._id, item.foodId._id)}>Usuń produkt</button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div>Spożycie kalorii: {kcalSum}</div>
      <div>Spożycie białka: {proteinSum}</div>
      <div>Spożycie węglowodanów: {carboSum}</div>
      <div>Spożycie tłuszczu: {fatSum}</div>
    </div>
  );
}

export default MealManagement;
