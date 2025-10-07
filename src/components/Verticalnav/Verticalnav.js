import React from "react";
import "./Verticalnav.css"; // Crie este arquivo com o CSS abaixo

function Verticalnav() {
  return (
    <div className="verticalnav">
      <h3>Menu</h3>

      <ul className="list">
        <li className="element">
          <i className="fi fi-rs-computer"></i>
          <p className="label">Retaguarda</p>
        </li>
        <li className="element">
          <i className="fi fi-rs-gas-pump-alt"></i>
          <p className="label">Dashboard</p>
        </li>
      </ul>

      <div className="separator"></div>

      <ul className="list">
        <li className="element">
          <i className="fi fi-ts-point-of-sale"></i>
          <p className="label">Lukos Pay</p>
        </li>
        <li className="element">
          <i className="fi fi-ts-marketplace-alt"></i>
          <p className="label">Pré-Venda</p>
        </li>
      </ul>
       <div className="separator"></div>
        <ul className="list">
        <li className="element">
          <i className="fi fi-rs-computer"></i>
          <p className="label">PDV Pista</p>
        </li>
        <li className="element">
          <i className="fi fi-rs-gas-pump-alt"></i>
          <p className="label">PDV Loja</p>
        </li>
      </ul>


      <div className="separator"></div>

      <ul className="list">
        <li className="element delete">
          <svg
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            stroke="#7e8590"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            <line y2="17" y1="11" x2="10" x1="10"></line>
            <line y2="17" y1="11" x2="14" x1="14"></line>
          </svg>
          <p className="label">Excluir</p>
        </li>
      </ul>

      <div className="separator"></div>

      <ul className="list">
        <li className="element">
          <svg
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            stroke="#bd89ff"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path d="M18 21a8 8 0 0 0-16 0"></path>
            <circle r="5" cy="8" cx="10"></circle>
            <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
          </svg>
          <p className="label">Suporte</p>
        </li>
      </ul>
    </div>
  );
}

export default Verticalnav;
