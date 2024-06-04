import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginUser.css";

function LoginUser({ setToken, setUsername, setRole }) {
  const [username, setUsernameLocal] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("login/login", { username, password });
      const { token, username: receivedUsername, role } = response.data;
      setToken(token);
      setUsername(receivedUsername);
      setRole(role);
      localStorage.setItem("token", token);
      localStorage.setItem("username", receivedUsername);
      localStorage.setItem("role", role);
      console.log(role, token);

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Invalid login credentials", error);
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="page">
      <div className="niema">
        <h1 className="logtyt">Nie masz jeszcze konta?</h1>
        <button className="zaloz" onClick={handleSignUp}>Załóż konto</button>
      </div>
      <div className="formularz-logowania">
        <h1 className="logtyt">Logowanie</h1>
        <form onSubmit={handleSubmit}>
          <p>Login</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsernameLocal(e.target.value)}
            placeholder="Username"
            required
          />
          <p>Hasło</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Zaloguj</button>
          <a href="#" className="forgot-password">
            Nie pamiętasz hasła?
          </a>
        </form>
      </div>
    </div>
  );
}

export default LoginUser;
