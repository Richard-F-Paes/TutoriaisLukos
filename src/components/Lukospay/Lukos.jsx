import React from "react";
import "./Lukospay.css";

const Lukospay = () => {
  return (
    <section className="lp-section">
      <div className="lp-container">
        <div className="lp-flex">
          {/* Conteúdo principal */}
          <div className="lp-main">
            <img
              className="lp-main-img"
              src="Smartpos.jpg"
              alt="Lukospay Maquininha POS"
            />

            <div className="lp-content">
              <p className="lp-subtitle">Sobre Lukospay</p>
              <h1 className="lp-title">
                Lukospay Maquininha POS: tudo que você precisa saber
              </h1>

           
            </div>
          </div>

          {/* Sidebar */}
          <div className="lp-sidebar">
            <div className="lp-sidebar-item">
              <h3 className="lp-sidebar-title">Funcionalidades da Lukospay</h3>
              <a className="lp-sidebar-link" href="#">
                Como aproveitar ao máximo os recursos da Maquininha POS
              </a>
            </div>
            <hr className="lp-hr" />

            <div className="lp-sidebar-item">
              <h3 className="lp-sidebar-title">Dicas de uso da POS</h3>
              <a className="lp-sidebar-link" href="#">
                Boas práticas para gerenciar pagamentos com Lukospay
              </a>
            </div>
            <hr className="lp-hr" />

            <div className="lp-sidebar-item">
              <h3 className="lp-sidebar-title">Recursos principais da Lukospay</h3>
              <a className="lp-sidebar-link" href="#">
                Top 10 funcionalidades essenciais da Maquininha POS
              </a>
            </div>
            <hr className="lp-hr" />

            <div className="lp-sidebar-item">
              <h3 className="lp-sidebar-title">Kits e integrações Lukospay</h3>
              <a className="lp-sidebar-link" href="#">
                Principais kits e integrações disponíveis na plataforma Lukospay
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lukospay;
