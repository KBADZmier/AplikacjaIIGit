import React, { useState, useEffect } from "react";
import axios from "axios";
import AddFood from "./AddFood";
import DeleteFood from "./DeleteFood";
import Register from '/LoginRegister/Register';
import Login from '/LoginRegister/LoginUser';

import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import {authenticate, generateAccessToken, handleLogin} from "./LoginFun"
function App() {
  const [foods, setFoods] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const [token, setToken] = useState(localStorage.getItem('token') || '');

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
          <Route exact path="/" element={<Home />} />
          <Route exact path="/AddFood" element={<AddFood/>} />
          <Route exact path="/DeleteFood" element={<DeleteFood/>} />
        </Routes>

        <div>
            {token ? (
                <div>Welcome! You are logged in.</div>
            ) : (
                <div>
                    <Register />
                    <Login setToken={setToken} />
                </div>
            )}
        </div>

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
const Home = () => (
  <div>
      <h2>Home</h2>
      <p>Welcome to the Food App!</p>
  </div>
);
export default App;
