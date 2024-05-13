import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/Food");
        setFoods(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFoods();
  }, []);

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {foods.map(item => (
          <li key={item._id}>
            <h3>{item.Nazwa}</h3>
            <p>{item.Rodzaj}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
