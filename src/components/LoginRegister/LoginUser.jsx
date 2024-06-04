import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsernameLocal(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginUser;
