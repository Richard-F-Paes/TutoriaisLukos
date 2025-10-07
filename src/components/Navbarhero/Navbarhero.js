import React, { useState } from "react";
import "./Navbarhero.css";

const Navbarhero = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="nbh-header">
      <div className="nbh-container">
        {/* Logo */}
        <div className="nbh-logo">
          <a href="#">
            <img
              src="logo.png"
              alt="Logo"
              className="nbh-logo-light"
            />
            <img
              src="https://cdn.tailgrids.com/assets/images/logo/logo-white.svg"
              alt="Logo White"
              className="nbh-logo-dark"
            />
          </a>
        </div>

        {/* Botão Mobile */}
        <button
          className={`nbh-toggler ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menu */}
        <nav className={`nbh-nav ${menuOpen ? "open" : ""}`}>
          <ul>
            <li><a href="#">Todos</a></li>
            <li><a href="#">Financeiro</a></li>
            <li><a href="#">Comercial</a></li>
          </ul>
        </nav>

        {/* Botões */}
        <div className="nbh-buttons">
        
        </div>
      </div>

      {/* Hero */}
      <section className="nbh-hero">
        <div className="nbh-hero-text">
          <h1>
            Retaguarda <br /> Tutorial <br /> 
          </h1>
          <p>
            Tutorial para retaguarda
          </p>

          <div className="nbh-hero-actions">
            <a href="#" className="nbh-btn-primary">Ver tutorial</a>
       
          </div>

          <div className="nbh-clients">
            <h6>Lukos tecnologia</h6>
            <div className="nbh-clients-logos">
             
            </div>
          </div>
        </div>

        <div className="nbh-hero-image">
          <img
            src="retaguarda.png"
            alt="Hero"
          />
        </div>
      </section>
    </header>
  );
};

export default Navbarhero;
