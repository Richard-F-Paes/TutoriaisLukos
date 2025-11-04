import React from "react";
import "./Superhero.css";

const Superhero = () => {
  return (
    <div className="superhero-wrapper">
      <div className="superhero-container">
        {/* Announcement Banner */}
        <div className="Logolukos">
            <img className="Logolukos-img" src="logo.png" alt="Logo Lukos" />
        </div>
        <div className="superhero-banner">
          <a className="superhero-banner-link" href="#">
            Explore todos os Tutoriais Lukos
            <span className="superhero-banner-span">
              <span className="superhero-banner-explore">Explore</span>
              <svg
                className="superhero-banner-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"  
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </span>
          </a>
        </div>

        {/* Title */}
        <div className="superhero-title-wrapper">
          <h1 className="superhero-title">
            Lukos Tutoriais
          </h1>
        </div>

        <div className="superhero-subtitle-wrapper">
          <p className="superhero-subtitle">
            Site com tutoriais para facilitar o uso do sistema Lukos.
          </p>
        </div>

        {/* Buttons */}
        <div className="superhero-buttons-wrapper">
          <a className="superhero-button" href="#">
           
            Ver todos os tutoriais
          </a>
        </div>
      </div>
    </div>
  );
};

export default Superhero;
