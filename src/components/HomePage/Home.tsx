import bgimg from "./home.jpg";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Section1 from "./Section1";
import Section2 from "./Section2";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="hero">
        <img src={bgimg} alt="Background" className="bgimg" />
        <div className="title">
          <p className="app-title">
            Jedz co chcesz, <br></br> wyglądaj jak chcesz!
          </p>
        </div>
        <div className="buttons">
          <button onClick={() => navigate("/register")}>Zacznij!</button>
          <button onClick={() => navigate("/login")}>Zaloguj</button>
        </div>
      </div>
      <Section1 />
      <Section2 />
    </div>
  );
};

export default Home;
