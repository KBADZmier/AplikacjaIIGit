import React from "react";
import Typical from "react-typical";
import "./Section2.css";
import fat from "./fat.jpg";
import kox from "./kox.jpg";

const Section2 = () => {
  return (
    <div className="section2">
      <h2 className="section2-title">Twoja przemiana</h2>
      <div className="transformation">
        <div className="before">
          {<img src={fat} alt="Before" />}
          <p>Przed</p>
        </div>
        <div className="after">
          {<img src={kox} alt="After" />}
          <p>Po</p>
        </div>
      </div>
      <div className="typing-animation">
        <Typical
          steps={[
            "Waga: 100kg",
            2000,
            "Waga: 95kg",
            2000,
            "Waga: 80kg",
            2000,
            "Waga: 75kg",
            2000,
          ]}
          loop={Infinity}
          wrapper="p"
        />
      </div>
    </div>
  );
};

export default Section2;
