import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import "./Home.css";
import bgimg from "./home.jpg";
import Section1 from "./Section1";
import Section2 from "./Section2";

const Home = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const buttonsRef = useRef(null);
  let tl = useRef(gsap.timeline()).current;

  useEffect(() => {
    tl.to(imgRef.current, {
      filter: "blur(5px)",
      duration: 2,
      delay: 1.5,
    })

      .fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.25 },
        "-=1.5"
      )

      .fromTo(
        buttonsRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.25 },
        "-=0.75"
      );
  }, []);

  return (
    <div className="home">
      <div className="hero" ref={heroRef}>
        <div className="blur">
          <img src={bgimg} alt="Background" className="bgimg" ref={imgRef} />
        </div>
        <div className="title" ref={titleRef}>
          <p className="app-title">
            Jedz co chcesz, <br /> wyglądaj jak chcesz!
          </p>
        </div>
        <div className="buttons" ref={buttonsRef}>
          <button className="jak">JAK TO?</button>
          <button className="jak" onClick={() => navigate("/login")}>
            Zaloguj się
          </button>
        </div>
      </div>
      <Section1 className="section1" />
      <Section2 className="section2" />
    </div>
  );
};

export default Home;
