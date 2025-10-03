import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero">
      <div className="hero-container">
        <div className="hero-card">
          {/* Fundo com gradiente radial */}
          <svg viewBox="0 0 1024 1024" aria-hidden="true" className="hero-bg">
            <circle
              r="512"
              cx="512"
              cy="512"
              fill="url(#gradient-hero)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="gradient-hero">
                <stop stopColor="#7775D6" />
                <stop offset="1" stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>

          {/* Texto principal */}
          <div className="hero-text">
            <h2 className="hero-title">
              Boost your productivity. Start using our app today.
            </h2>
            <p className="hero-subtitle">
              Ac euismod vel sit maecenas id pellentesque eu sed consectetur.
              Malesuada adipiscing sagittis vel nulla.
            </p>
            <div className="hero-buttons">
              <a href="#" className="btn-primary">
                Get started
              </a>
              <a href="#" className="btn-secondary">
                Learn more →
              </a>
            </div>
          </div>

          {/* Imagem lateral */}
          <div className="hero-img-wrapper">
            <img
              src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
              alt="App screenshot"
              className="hero-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
