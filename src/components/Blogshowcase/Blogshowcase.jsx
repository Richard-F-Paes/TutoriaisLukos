import React from "react";
import "./Blogshowcase.css";

function Blogshowcase() {
  return (
    <section className="blogshowcase-section">
      <div className="blogshowcase-container">
        {/* Cabeçalho */}
        <div className="blogshowcase-header">
          <h1 className="blogshowcase-title">Tutoriais</h1>
          <p className="blogshowcase-description">
            Tutoriais para facilitar o uso do sistema.
          </p>
        </div>

        {/* Cards */}
        <div className="blogshowcase-grid">
          {/* Card 1 */}
          <div className="blogshowcase-card">
            <div className="blogshowcase-image-wrapper">
              <img
                className="blogshowcase-image"
                src="retaguarda.png"
                alt="Post cover"
              />
             
            </div>

            <h1 className="blogshowcase-post-title">
              Retaguarda
            </h1>

            <hr className="blogshowcase-divider" />

            <p className="blogshowcase-text">
            Sistema de retaguarda para gestão empresarial, incluindo módulos como financeiro, estoque, vendas e relatórios.
            </p>

            <a href="#" className="blogshowcase-link">
              Read more
            </a>
          </div>

          {/* Card 2 */}
          <div className="blogshowcase-card">
            <div className="blogshowcase-image-wrapper">
              <img
                className="blogshowcase-image"
                src="CaixaPDV.png"
                alt="Post cover"
              />
           
            </div>

            <h1 className="blogshowcase-post-title">
              PDV
            </h1>

            <hr className="blogshowcase-divider" />

            <p className="blogshowcase-text">
                Sistema de ponto de venda (PDV) para facilitar transações comerciais, com funcionalidades como vendas rápidas, gerenciamento de estoque e emissão de recibos.
            </p>

            <a href="#" className="blogshowcase-link">
              Read more
            </a>
          </div>

          {/* Card 3 */}
          <div className="blogshowcase-card">
            <div className="blogshowcase-image-wrapper">
              <img
                className="blogshowcase-image"
                src="Dashboard.png"
                alt="Post cover"
              />
            
            </div>

            <h1 className="blogshowcase-post-title">
              Dashboard
            </h1>

            <hr className="blogshowcase-divider" />

            <p className="blogshowcase-text">
            Painel de controle (dashboard) para monitorar e analisar dados empresariais, oferecendo insights visuais sobre desempenho, vendas e métricas chave.
            </p>

            <a href="#" className="blogshowcase-link">
              Read more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Blogshowcase;
