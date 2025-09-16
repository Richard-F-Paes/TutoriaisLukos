import React, { useState } from "react";
import "./TutorialMain.css";

const steps = [
  {
    id: 1,
    title: "Passo 1: Introdução ao Sistema de Retaguarda",
    duration: "5 minutos",
    video: "https://www.youtube.com/embed/XY2OcTZqvqs?si=Sc3vHr5CH2SH6SAc",
    content: (
      <>
        <h3>O que você vai aprender</h3>
        <p>
          O sistema de retaguarda do Lukos é o coração da gestão do seu negócio.
          Neste tutorial, você aprenderá como configurar e utilizar todas as
          funcionalidades para otimizar a gestão de produtos, estoque e relatórios.
        </p>

        <h3>Principais funcionalidades</h3>
        <ul className="feature-list">
          <li><i className="fas fa-check"></i> Cadastro completo de produtos</li>
          <li><i className="fas fa-check"></i> Controle de estoque em tempo real</li>
          <li><i className="fas fa-check"></i> Relatórios gerenciais avançados</li>
          <li><i className="fas fa-check"></i> Integração com PDV</li>
          <li><i className="fas fa-check"></i> Backup automático</li>
        </ul>
      </>
    ),
  },
  {
    id: 2,
    title: "Passo 2: Configuração Inicial",
    duration: "8 minutos",
    video: "https://www.youtube.com/embed/XY2OcTZqvqs?si=Sc3vHr5CH2SH6SAc",
    content: (
      <>
        <h3>Configurações Essenciais</h3>
        <p>
          Antes de começar a usar o sistema, é importante configurar corretamente
          os parâmetros básicos que irão definir o comportamento do sistema.
        </p>

        <div className="config-steps">
          <div className="config-item">
            <div className="config-number">1</div>
            <div className="config-content">
              <h4>Dados da Empresa</h4>
              <p>Configure CNPJ, razão social e endereço</p>
            </div>
          </div>

          <div className="config-item">
            <div className="config-number">2</div>
            <div className="config-content">
              <h4>Parâmetros Fiscais</h4>
              <p>Defina regime tributário e configurações de impostos</p>
            </div>
          </div>

          <div className="config-item">
            <div className="config-number">3</div>
            <div className="config-content">
              <h4>Usuários e Permissões</h4>
              <p>Crie usuários e defina níveis de acesso</p>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

function TutorialMain() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showVideo, setShowVideo] = useState(false);

  const step = steps.find((s) => s.id === currentStep);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
    setShowVideo(false); // Reseta vídeo para próximo passo
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
    setShowVideo(false);
  };

  return (
    <div className="tutorial-main">
      <div className={`tutorial-step active`} id={`step-${step.id}`}>
        {/* Cabeçalho */}
        <div className="step-header">
          <h2>{step.title}</h2>
          <div className="step-duration">
            <i className="fas fa-clock"></i>
            <span>{step.duration}</span>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="step-content">
          <div className="video-container">
            {showVideo ? (
              <iframe
                width="560"
                height="315"
                src={step.video}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ) : (
              <div
                className="video-placeholder"
                onClick={() => setShowVideo(true)}
              >
                <i className="fas fa-play-circle"></i>
                <p>Clique para assistir o vídeo</p>
              </div>
            )}
          </div>

          <div className="content-text">{step.content}</div>
        </div>

        {/* Botões */}
        <div className="step-actions">
          {currentStep > 1 && (
            <button className="btn btn-secondary prev-step" onClick={handlePrevStep}>
              <i className="fas fa-arrow-left"></i> Passo Anterior
            </button>
          )}
          {currentStep < steps.length && (
            <button className="btn btn-primary next-step" onClick={handleNextStep}>
              Próximo Passo <i className="fas fa-arrow-right"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TutorialMain;
