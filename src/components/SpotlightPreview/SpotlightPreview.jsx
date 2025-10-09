import React, { useState } from "react";
import "./SpotlightPreview.css";

/* Componente Spotlight local */
function Spotlight({ x, y, fill = "white" }) {
  return (
    <div
      className="spotlight-circle"
      style={{
        backgroundColor: fill,
        transform: `translate(${x}px, ${y}px)`,
      }}
    />
  );
}

export function SpotlightPreview() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 300; // metade da largura do Spotlight
    const y = e.clientY - rect.top - 300; // metade da altura do Spotlight
    setPosition({ x, y });
  };

  return (
    <div className="spotlight-preview">
       

      <div className="Imagebackground">
        <img
          className="Imagebackground-img" src="logo.png"></img> </div>
      <div className="spotlight-grid" />
    
      <Spotlight x={position.x} y={position.y} fill="white" />
      <div className="spotlight-content">
        <div className="Logolukos">
          <img className="Logolukos-img" src="logo.png" alt="Logo Lukos" />
        </div>

        <h1 className="spotlight-title">
          Lukos <br /> Tutoriais
          <div className="spotlight-underline"></div>
        </h1>
        <p className="spotlight-text">
          Site com tutoriais para facilitar o uso do sistema Lukos.
        </p>
        
      </div>
    </div>
  );
}
