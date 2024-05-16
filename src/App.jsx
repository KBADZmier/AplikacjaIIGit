import React, { useState, useEffect } from "react";
import axios from "axios";
import AddFood from "./AddFood";
import DeleteFood from "./DeleteFood";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import {authenticate, generateAccessToken, handleLogin} from "./Login"
function App() {
  const [foods, setFoods] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');




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
  <Router>
      <div>
        <nav>
          <ul>
           
            <li>
              <Link to="/AddFood">Add Food</Link>
              
            </li>
            <li>
              <Link to="/DeleteFood">Delete Food</Link>
              
            </li>
          </ul>
        </nav>

        <Routes>
          <Route exact path="/AddFood" element={<AddFood/>} />
          <Route exact path="/DeleteFood" element={<DeleteFood/>} />
        </Routes>
      </div>
    </Router>



      <h1>Items</h1>
      <ul>
        {foods.map(item => (
          <li key={item._id}>
            <h3>{item.Nazwa}</h3>
            <p>{item.Rodzaj}</p>
          </li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Zaloguj</button>
      {error && <p>{error}</p>}
    </div>

    
  );
}

export default App;
