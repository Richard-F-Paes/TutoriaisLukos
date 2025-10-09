import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Marca / Logo */}
        <div className="footer-brand">
          <a
            href="https://lukos.com.br"
            className="brand-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="brand-icon">
              <img src="logo.png" alt="Logo" className="logo-image" />
            </div>
            <span className="brand-name">
              Lukos
              <br />
              Tecnologia
            </span>
          </a>
        </div>

        {/* Links de Navegação */}
        <div className="footer-links">
          <div className="footer-section">
            <ul>
              <li>
                <Link to="/">Início</Link>
              </li>
              <li>
                <Link to="/categorias">Categorias</Link>
              </li>
              <li>
                <Link to="/sobre">Sobre</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <ul>
              <li>
                <Link to="/tutoriais">Tutoriais</Link>
              </li>
              <li>
                <Link to="/Retaguarda">Retaguarda</Link>
              </li>
              <li>
                <Link to="/PDV">PDV</Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="footer-section">
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>(11) 4858-8429</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>suporte@lukos.com.br</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-clock"></i>
                <span>
                  Segunda a sexta-feira
                  <br />
                  das 08h30 às 17h30
                </span>
              </div>
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="footer-section">
            <div className="social-icons">
              <a
                href="https://www.youtube.com/@lukos-solucoesemtecnologia8036"
                title="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>

              <a
                href="https://www.instagram.com/lukostecnologia/"
                title="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>

              <a
                href="https://www.facebook.com/lukos.solucoes/?locale=pt_BR"
                title="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        © 2025 Lukos Tecnologia LTDA | CNPJ 14.594.338/0001-23 | Todos os direitos reservados.
      </div>
    </footer>
  );
}

export default Footer;
