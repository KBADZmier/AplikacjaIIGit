import React from "react";
import "./Footer.css";
import { FaYoutube, FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">© 2024. Wszelkie prawa zastrzeżone</div>
      <div className="footer-center">
        <a href="/terms">Regulamin</a>
        <a href="/privacy-policy">Polityka prywatności</a>
        <a href="/cookie-policy">Polityka cookie</a>
        <a href="/contact">Kontakt</a>
      </div>
      <div className="footer-right">
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube />
        </a>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTiktok />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
