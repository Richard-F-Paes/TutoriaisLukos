import React from "react";
import "./TutorialNavbar.css";
import { FaDesktop, FaSearch } from "react-icons/fa";

const TutorialNavbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container" style={{ justifyContent: 'center' }}>
        <div className="nav-brand" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '12px 24px' }}>
          <img
            src="logo.png"
            alt="Logo Tutorial Lukos"
            style={{ 
              width: '32px', 
              height: '32px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = '0.8';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '1';
            }}
          />
          <span 
            className="nav-title" 
            style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              background: 'linear-gradient(to right, #9333ea, #7c3aed, #6d28d9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              transition: 'all 0.5s ease-in-out'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(to right, #3b82f6, #7c3aed, #6d28d9)';
              e.target.style.WebkitBackgroundClip = 'text';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(to right, #9333ea, #7c3aed, #6d28d9)';
              e.target.style.WebkitBackgroundClip = 'text';
            }}
          >
            Tutorial Lukos
          </span>
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
