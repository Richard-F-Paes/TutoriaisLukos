import React from "react";
import "./TutorialNavbar.css";
import { FaDesktop, FaSearch } from "react-icons/fa";

const TutorialNavbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <FaDesktop className="nav-icon" />
          <span className="nav-title">TutorialLukos</span>
        </div>

        <div className="nav-menu">
          <a href="/" className="nav-link">Início</a>
          <a href="/categorias" className="nav-link">Categorias</a>
          <a href="/tutoriais" className="nav-link active">Tutoriais</a>
          <a href="/sobre" className="nav-link">Sobre</a>
        </div>

        <div className="nav-search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar tutoriais..."
            className="search-input"
          />
        </div>
      </div>
    </nav>
  );
};

export default TutorialNavbar;
