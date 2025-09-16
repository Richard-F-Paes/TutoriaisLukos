// src/components/TutorialCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Usaremos Link para navegação interna
import './Card.css'; // Criaremos este arquivo CSS para os estilos específicos do card

function TutorialCard({ tutorial }) {
  // Recebe os dados do tutorial como uma prop chamada 'tutorial'
  const { title, description, level, duration, steps, link, features } = tutorial;

  // Mapeia as features para renderizá-las dinamicamente
  const renderFeatures = () => {
    return features.map((feature, index) => (
      <li key={index}>
        <i className="fas fa-check"></i> {feature}
      </li>
    ));
  };

  // Mapeia os níveis para aplicar a classe CSS correta
  const getLevelClass = (level) => {
    switch (level.toLowerCase()) {
      case 'iniciante':
        return 'iniciante';
      case 'intermediário':
        return 'intermediario';
      case 'avançado':
        return 'avancado';
      default:
        return '';
    }
  };

  return (
    <Link to={link} className="tutorial-card" /* Usamos Link para navegação */>
      <div className="tutorial-meta">
        <span className={`level-badge ${getLevelClass(level)}`}>{level}</span>
        <div className="tutorial-duration">
          <i className="fas fa-clock"></i>
          <span>{duration}</span>
        </div>
      </div>
      
      <h3 className="tutorial-title">{title}</h3>
      <p className="tutorial-description">
        {description}
      </p>
      
      <div className="tutorial-features">
        <ul className="feature-list">
          {renderFeatures()}
        </ul>
      </div>
      
      <div className="tutorial-footer">
        <span className="tutorial-steps">{steps} passos</span>
        {/* O botão "Iniciar Tutorial" pode ser um Link ou um botão que navega */}
        <span className="start-button">Iniciar Tutorial</span>
      </div>
    </Link>
  );
}

export default TutorialCard;