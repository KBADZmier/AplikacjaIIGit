import React from "react";
import "./Section1.css";

const Section1 = () => {
  return (
    <div className="section1">
      <h2 className="section1-title">
        Normalnie, policzymy kalorie za ciebie!
      </h2>
      <p className="section1-description">
        Nasza aplikacja pomoże Ci śledzić spożycie kalorii, zarządzać posiłkami
        i osiągać swoje cele zdrowotne.
      </p>
      <div className="section1-features">
        <div className="feature">
          <h3>Śledzenie Posiłków</h3>
          <p>
            Rejestruj swoje posiłki i przekąski, aby monitorować spożycie
            kalorii.
          </p>
        </div>
        <div className="feature">
          <h3>Analiza Składników</h3>
          <p>
            Otrzymuj szczegółowe informacje o składnikach odżywczych każdego
            posiłku.
          </p>
        </div>
        <div className="feature">
          <h3>Plany Żywieniowe</h3>
          <p>
            Twórz spersonalizowane plany żywieniowe dostosowane do Twoich celów.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section1;
