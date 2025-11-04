import React from "react";
import "./Calltoaction.css";

const Calltoaction = () => {
  return (
    <div className="cta-container">
      <div className="cta-box">
        <h2 className="cta-title">Lukos Tutoriais</h2>

        <p className="cta-desc">
          Localize o tutorial
        </p>

        <form className="cta-form">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"Fn
            required
            className="cta-input"
            placeholder="Nome do tutorial"
          />
          <button type="submit" className="cta-button">
            Localizar
          </button>
        </form>

        {/* SVG decorativo */}
        <svg
          viewBox="0 0 1024 1024"
          className="cta-svg"
          aria-hidden="true"
        >
          <circle
            cx="512"
            cy="512"
            r="512"
            fill="url(#gradient)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient
              id="gradient"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(512 512) rotate(90) scale(512)"
            >
              <stop stopColor="#7775D6" />
              <stop offset="1" stopColor="#7ED321" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Calltoaction;
