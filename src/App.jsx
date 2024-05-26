// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import AddFood from './AddFood';
import DeleteFood from './DeleteFood';
import Register from '/LoginRegister/Register';
import LoginUser from '/LoginRegister/LoginUser';
import AllFood from './AllFood';
import Admin from './Admin';
import UserInfo from './UserInfo';
import User from '../models/User';
function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [role, setRole] = useState(localStorage.getItem('role') || '');

    const handleLogout = () => {
        setToken('');
        setUsername('');
        setRole('');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
    };

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        {role == 'user' && <li><Link to="/AddFood">Add Food</Link></li>}
                        {role == 'admin' && <li><Link to="/DeleteFood">Delete Food</Link></li>}
                        {role == 'admin' && <li><Link to="/AllFood">All Food</Link></li>}
                        {role == 'admin' && <li><Link to="/admin">Admin</Link></li>}
                        {role == 'user' && <li><Link to="/info">Info</Link></li>}
                    </ul>
                </nav>

                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/AddFood" element={role == 'user' ? <AddFood /> : <Navigate to="/" />} />
                    <Route exact path="/AllFood" element={role == 'admin' ? <AllFood /> : <Navigate to="/" />} />
                    <Route exact path="/DeleteFood" element={role == 'admin' ? <DeleteFood /> : <Navigate to="/" />} />
                    <Route exact path="/admin" element={role == 'admin' ? <Admin /> : <Navigate to="/" />} />
                    <Route exact path="/info" element={role == 'user' ? <UserInfo /> : <Navigate to="/" />} />
                </Routes>

                <div>
                    {token ? (
                        <div>
                            <h2>Dzień dobry, {username}!</h2>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <div>
                            <Register />
                            <LoginUser setToken={setToken} setUsername={setUsername} setRole={setRole} />
                        </div>
                    )}
                </div>
            </div>
        </Router>
    );
}

const Home = () => (
    <div>
        <h2>Home</h2>
        <p>Welcome to the Food App!</p>
    </div>
);

export default App;
