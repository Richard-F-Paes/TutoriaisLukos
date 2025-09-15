// src/components/Tutorial/Sidebar.jsx
import React from "react";

const Sidebar = ({ steps, currentStep, setCurrentStep }) => {
  return (
    <div className="tutorial-sidebar">
      <div className="tutorial-progress">
        <h3>Progresso do Tutorial</h3>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>
        <span className="progress-text">
          {Math.round((currentStep / steps.length) * 100)}% concluído
        </span>
      </div>

      <div className="tutorial-steps">
        <h3>Passos do Tutorial</h3>
        <div className="steps-list">
          {steps.map((s) => (
            <div
              key={s.id}
              className={`step-item ${s.id === currentStep ? "active" : ""}`}
              onClick={() => setCurrentStep(s.id)}
            >
              <div className="step-number">{s.id}</div>
              <div className="step-content">
                <h4>{s.title}</h4>
                <span>{s.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
