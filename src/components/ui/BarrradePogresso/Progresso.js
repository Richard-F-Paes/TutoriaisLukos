import React from "react";
import "./Progresso.css";

const Progresso = ({ currentStep, setCurrentStep }) => {
  const steps = [
    { title: "Configuração Inicial", time: "8 min" },
    { title: "Cadastro de Produtos", time: "10 min" },
    { title: "Controle de Estoque", time: "12 min" },
    { title: "Relatórios Gerenciais", time: "8 min" },
    { title: "Backup e Segurança", time: "6 min" },
  ];

  const totalSteps = steps.length;
  const percent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="progress-wrapper">
      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
        <span className="progress-text">{percent}% concluído</span>
      </div>
    </div>
  );
};

export default Progresso;
