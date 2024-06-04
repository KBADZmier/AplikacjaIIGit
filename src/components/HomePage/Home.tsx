import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import bgimg from "./home.jpg";
import Section1 from "./Section1";
import Section2 from "./Section2";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="hero">
        <div className="blur">
          <img src={bgimg} alt="Background" className="bgimg" />
        </div>
        <div className="title">
          <p className="app-title">
            Jedz co chcesz, <br /> wyglądaj jak chcesz!
          </p>
        </div>
        <div className="buttons">
          <button onClick={() => navigate("/register")}>JAK TO?</button>
          <button onClick={() => navigate("/login")}>Zaloguj się</button>
        </div>
      </div>
      <Section1 className="section1" />
      <Section2 className="section2" />
    </div>
  );
};

export default Home;
