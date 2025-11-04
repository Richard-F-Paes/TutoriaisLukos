import React from "react";
import "./Featuresection.css";


const Featuresection = () => {
  return (
    <section className="feature-section">
      {/* Área da imagem */}
      <div className="feature-image-container">
        <img
          src= "retaguarda.png"
          alt="Tela do sistema retaguarda"
          className="feature-image"
        />
      </div>

      {/* Área do texto */}
      <div className="text-retaguarda">
        <h1>
          <span className="highlight">Rápido</span> processamento de pedidos
        </h1>
        <p>
          Tenha mais agilidade no processo de vendas com o sistema retaguarda.
          Em poucos cliques é possível gerenciar pedidos, acompanhar estoque e
          finalizar operações com rapidez e eficiência — disponível 24 horas por
          dia.
        </p>

        <a href="#" className="feature-link">
          Saiba mais →
        </a>
      </div>
       <div className="feature-image-PDV">
        <img
          src= "CaixaPDV.png"
          alt="Tela do sistema retaguarda"
          className="feature-PDV"
        />
      </div>

      {/* Área do texto */}
      <div className="text-PDV">
        <h1>
          <span className="highlight">Rápido</span> processamento de pedidos
        </h1>
        <p>
          Tenha mais agilidade no processo de vendas com o sistema retaguarda.
          Em poucos cliques é possível gerenciar pedidos, acompanhar estoque e
          finalizar operações com rapidez e eficiência — disponível 24 horas por
          dia.
        </p>

        <a href="#" className="feature-link">
          Saiba mais →
        </a>
      </div>
    </section>
  );
};

export default Featuresection;
