import React from "react";
import "./TutorialHero.css";

const TutorialHero = () => {
  return (
    <section className="tutorial-header">
      <div className="container">
        <div className="tutorial-breadcrumb">
          <a href="/">Início</a>
          <i className="fas fa-chevron-right"></i>
          <a href="/categoria/sistema">Sistema</a>
          <i className="fas fa-chevron-right"></i>
          <span>Sistema de Retaguarda</span>
        </div>

        <div className="tutorial-hero">
          <div className="tutorial-meta-info">
            <span className="category-badge">Sistema</span>
            <span className="level-badge intermediario">Intermediário</span>
            <div className="rating">
              <i className="fas fa-star"></i>
              <span></span>
            </div>
          </div>

          <h1 className="tutorial-main-title">Sistema de Retaguarda</h1>
          <p className="tutorial-main-description">
            Aprenda a configurar e gerenciar o sistema de retaguarda completo
            para controle de estoque, produtos e relatórios do Lukos
          </p>
        </div>
      </div>
    </section>
  );
};

export default TutorialHero;
