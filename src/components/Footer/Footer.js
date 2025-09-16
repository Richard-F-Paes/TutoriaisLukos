import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Marca / Logo */}
        <div className="footer-brand">
          <a href="#" className="brand-link">
            <div className="brand-icon">
           <img src="logo.png" alt="Logo" className="logo-image" />
            </div>
            <span className="brand-name">Lukos</span>
          </a>
        </div>

        {/* Links */}
        <div className="footer-links">
          <div>
            <h3>Categorias</h3>
            <ul>
              <li><a href="#">Retaguarda</a></li>
              <li><a href="#">PDV Caixa</a></li>
              <li><a href="#">PDV Loja</a></li>
            </ul>
          </div>
          <div>
            <h3>Lukos</h3>
            <ul>
              <li><a href="#">retaguarda</a></li>
              <li><a href="#">Tutoriais</a></li>
              <li><a href="#">PDV</a></li>
            </ul>
          </div>

          <div>
            <h3>Médias Sociais</h3>
            <div className="social-icons">
              <a href="#" title="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://www.youtube.com/@lukos-solucoesemtecnologia8036" title="Youtube">
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a href="https://www.instagram.com/lukostecnologia/" title="Instagram">
                <i className="fab fa-instagram"></i>
                <link rel="stylesheet" href="https://www.instagram.com/lukostecnologia/"/>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        Lukos © 2024-2024. Todos os direitos reservados. 
      </div>
    </footer>
  );
}

export default Footer;
