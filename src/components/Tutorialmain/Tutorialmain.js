// Importa o React e o hook useState para trabalhar com estado local
import React, { useState } from "react";

// Importa o CSS com os estilos do componente
import "./TutorialMain.css";

// ==========================================
// LISTA DE PASSOS DO TUTORIAL
// ==========================================
const steps = [
  {
    id: 1, // Identificador único do passo
    title: "Passo 1: Introdução ao Sistema de Retaguarda", // Título do passo
    duration: "5 minutos", // Tempo estimado
    thumbnail: "Smartpos.jpg", // Imagem mostrada antes do vídeo
    image: "https://lh3.googleusercontent.com/sitesv/AICyYdaTvEkQOm7KR3w-ztlJPic2Piuha9ysJH5w6cPbO0olDuG339l8cC-grZ4AQR-UihMAqsWBWeOaA_SfsAee9fXu9NURqwu8TIs98HmKWKjhThZRo6WQIDTIiFOAEvTIYHote7J3iVuApcaDQ0l9Zrc-ccTNVnMwevfiE6Lerbsmemsv0MG83ulEaUhuaoDus586-pC0uiqtK1BK7PcmErpnSPnmnHbXr5ZNjvk=w1280",
    
    content: (
  
      <>
        <h3>O que você vai aprender
          <p> Adicionar venda negativa no caixa </p>
        </h3>
        <p>
          O sistema de retaguarda do Lukos é o coração da gestão do seu negócio.
          Neste tutorial, você aprenderá como configurar e utilizar todas as
          funcionalidades para otimizar a gestão de produtos, estoque e relatórios.
          

        </p>
      </>
    ),
  },
  {
    id: 2,
    title: "Passo 2: Cadastro de Regra Fiscal ao Produto",
    duration: "4 minutos",
    video: "https://www.youtube.com/embed/ZDu8o37BwH0?si=nQZ1WTL_4wcjxyRZ", // Link do vídeo
    thumbnail: "logo.png", // Imagem antes do play
    content: (
      <>
        <h3>Configurações Essenciais</h3>
        <p> Insira o CPF do cliente no campo "CNPJ/CPF" e aperte a tecla "TAB". </p>
        <p>
          Antes de começar a usar o sistema, é importante configurar corretamente
          os parâmetros básicos que irão definir o comportamento do sistema.
        </p>
      </>
    ),
  },
  {
    id: 3,
    title: "Passo 3: Cadastro de Produtos",
    duration: "10 minutos",
    content: <p>No caixa desejado, clique em "adicionar venda"</p>,
    image: "https://lh3.googleusercontent.com/sitesv/AICyYdbw8QZcs_ngXw53HIIdbg_p8Z-QAhb7IaYbRoGH50XvfjIDZ7ZnjKawZ0uhbg11mWcj4Zr-siwFI-PMETWqGXh0PpProlI5iWjp0ujmb852HNuf9bnmv9o8EOfSnGsFQa65RQR5y9P6NhNTnu0XYkjt0t3bEhDpdjAyhHkIvuak5NNHEgS_7Al1LSL62uE2ITU-yF4Ek4B6yg88ICMsZFBN3AHMcz1dm8QciVc=w1280"
   
  },
  {
    id: 4,
    title: "Passo 4: Controle de Estoque",
    duration: "12 minutos",
    content: <p>Adicionar item > selecione o produto desejado </p>,
  },
  {
    id: 5,
    title: "Passo 5: Relatórios Gerenciais",
    duration: "8 minutos",
    content: <p>Conteúdo sobre relatórios gerenciais aqui...</p>,
    image: "https://lh3.googleusercontent.com/sitesv/AICyYdb-aBuFNk4-8anbgVofcvfTE-t8xJqmhMdC6FarcrDKql4yI2C_UNeCCp5V9m1TQHjWwxhLohtoPgo8KKxLMK12ix9ELIPLKIcdTv14DV-0-MelHpnOs29_mRsYeBQjgBcI18yMHN8GjdKZJvZFkoec39mbYebyHnZpc-nQ4g7KMxll_4bnjVmVXbgMMZXsURvhUdyX1KNrk37KS4eQd6PB8f-UVnKLXiTT5GE=w1280"
  },
  {
    id: 6,
    title: "Passo 6: Backup e Segurança",
    duration: "6 minutos",
    content: <p>Conteúdo sobre backup e segurança aqui...</p>,
    image:"https://lh3.googleusercontent.com/sitesv/AICyYdZRh_yIg4gRlU-9joiXJlXX_V6DGpAu9OrUoZx9Dws_lGMzLQvzQzKUq9ApFRlvxNxytxPi-x3_jLk5gerFyrt0lHycUsoz9AdQb28AcgbMU-EkmvK8bXk-Gt4dVFV5AkFCDX-V-RutML1oWlh7D_w5gG5lW65wuDMZ6QR6RqJZ-v3IwT9bcqC2hOExAT1W3EHS2wlrhY6i_M7HiX_NyPQD-7VgyB7-J2pFHzY=w1280"
  },
   {
    id: 7,
    title: "Passo 7 const e Segurança",
    duration: "9 minutos",
    content: <p>Conteúdo sobre backup e segurança aqui...</p>,
  },
];

// ==========================================
// COMPONENTE PRINCIPAL DO TUTORIAL
// ==========================================
function TutorialMain({ currentStep, setCurrentStep }) {
  // Estado local que controla se o vídeo do passo atual está sendo exibido
  const [showVideo, setShowVideo] = useState(false);

  // Busca no array steps o passo que corresponde ao "currentStep"
  const step = steps.find((s) => s.id === currentStep);
{/* Se o passo tiver imagem, renderiza */}
{step.image && (
  <div className="image-container">
    <img src={step.image} alt={step.title} style={{ maxWidth: "100%", borderRadius: "8px" }} />
  </div>
)}
  // Função para avançar para o próximo passo
  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1); // Atualiza para o próximo passo
      setShowVideo(false); // Sempre reseta para mostrar a thumbnail primeiro
    }
  };

  // Função para voltar ao passo anterior
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1); // Atualiza para o passo anterior
      setShowVideo(false); // Reseta para thumbnail
    }
  };

  // ==========================================
  // RENDERIZAÇÃO DO COMPONENTE
  // ==========================================
  return (
    <div className="tutorial-main">
      {/* Passo ativo atual */}
      <div className={`tutorial-step active`} id={`step-${step.id}`}>

        {/* ===============================
            CABEÇALHO DO PASSO
        =============================== */}
        <div className="step-header">
          <h2>{step.title}</h2> {/* Título do passo */}
          <div className="step-duration">
            <i className="fas fa-clock"></i> {/* Ícone de relógio */}
            <span>{step.duration}</span> {/* Tempo estimado */}
          </div>
        </div>

        {/* ===============================
            CONTEÚDO DO PASSO
        =============================== */}
        <div className="step-content">
          <div className="video-container">
            {/* Se o passo tiver vídeo, mostra thumbnail ou player */}
            {step.video ? (
              showVideo ? (
                
                // Se showVideo = true → mostra o player do YouTube
                <iframe
                  width="800"
                  height="450"
                  src={step.video}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                // Se showVideo = false → mostra thumbnail clicável
                <div
                  className="video-placeholder"
                  onClick={() => setShowVideo(true)} // Ao clicar, ativa o vídeo
                  style={{ backgroundImage: `url(${step.thumbnail})` }}
                >
                  <i className="fas fa-play-circle"></i>
                  <p>Clique para assistir o vídeo</p>
                </div>
              )
            ) : null}
          </div>

          {/* Conteúdo textual do passo */}
          <div className="content-text">{step.content}</div>
        </div>
{/* Se o passo tiver imagem, renderiza */}
{step.image && (
  <div className="image-container">
    <img src={step.image} alt={step.title} style={{ maxWidth: "100%", borderRadius: "8px" }} />
  </div>
)}
        {/* ===============================
            BOTÕES DE NAVEGAÇÃO
        =============================== */}
        <div className="step-actions">
          {/* Botão para voltar ao passo anterior */}
          {currentStep > 1 && (
            <button
              className="btn btn-secondary prev-step"
              onClick={handlePrevStep}
            >
              <i className="fas fa-arrow-left"></i> Passo Anterior
            </button>
          )}

          {/* Botão para ir ao próximo passo */}
          {currentStep < steps.length && (
            <button
              className="btn btn-primary next-step"
              onClick={handleNextStep}
            >
              Próximo Passo <i className="fas fa-arrow-right"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Exporta o componente para ser usado em outras páginas
export default TutorialMain;
