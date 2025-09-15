import React from "react";
import "./TutorialCard.css";

function TutorialCard({ level, duration, title, description, features, steps, link }) {
  return (
    <a href={link} className="tutorial-card">
      <div className="tutorial-meta">
        <span className={`level-badge ${level.toLowerCase()}`}>{level}</span>
        <div className="tutorial-duration">
          <i className="fas fa-clock"></i>
          <span>{duration}</span>
        </div>
      </div>

      <h3 className="tutorial-title">{title}</h3>
      <p className="tutorial-description">{description}</p>

      <div className="tutorial-features">
        <ul className="feature-list">
          {features.map((feat, index) => (
            <li key={index}>
              <i className="fas fa-check"></i> {feat}
            </li>
          ))}
        </ul>
      </div>

      <div className="tutorial-footer">
        <span className="tutorial-steps">{steps} passos</span>
        <span className="start-button">Iniciar Tutorial</span>
      </div>
    </a>
  );
}

export default TutorialCard;
