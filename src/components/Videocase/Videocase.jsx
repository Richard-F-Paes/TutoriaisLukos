import React from "react";
import "./Videocase.css";

const Videocase = () => {
  return (
    <section className="vc-section">
      <div className="vc-container">
        <h1 className="vc-title">
          Lukos Tecnologia<br /> {" "}
          <span className="vc-highlight">Um pouco sobre</span>
        </h1>

      <iframe
  className="vc-video"
  src="https://www.youtube.com/embed/sjWk3XpdH3s?start=32"
  title="YouTube video"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>

        <div className="vc-grid">
          <div className="vc-card">
            <div className="vc-card-inner">
              <span className="vc-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="vc-svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </span>
              <div className="vc-card-content">
                <h2 className="vc-card-title">Gestão de abastecimentos</h2>
                <p className="vc-card-text">
                  Monitore e registre todos os abastecimentos de forma rápida e segura, garantindo precisão nas vendas do posto.
                </p>
              </div>
            </div>
          </div>

          <div className="vc-card">
            <div className="vc-card-inner">
              <span className="vc-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="vc-svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </span>
              <div className="vc-card-content">
                <h2 className="vc-card-title">Fechamento de caixa simplificado</h2>
                <p className="vc-card-text">
                 Realize o fechamento diário do caixa com segurança, conciliando todos os pagamentos e transações do dia.
                </p>
              </div>
            </div>
          </div>

          <div className="vc-card">
            <div className="vc-card-inner">
              <span className="vc-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="vc-svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                  />
                </svg>
              </span>
              <div className="vc-card-content">
                <h2 className="vc-card-title">Relatórios completos</h2>
                <p className="vc-card-text">
          Gere relatórios detalhados sobre vendas, estoque e movimentações, facilitando a tomada de decisão no seu posto.
                </p>
              </div>
            </div>
          </div>

          <div className="vc-card">
            <div className="vc-card-inner">
              <span className="vc-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="vc-svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </span>
              <div className="vc-card-content">
                <h2 className="vc-card-title">Interface intuitiva</h2>
                <p className="vc-card-text">
                 Navegue pelo sistema de forma prática e rápida, sem complicações, otimizando o atendimento aos clientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Videocase;
