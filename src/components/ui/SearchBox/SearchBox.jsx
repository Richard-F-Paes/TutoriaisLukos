import React from "react";
import "./SearchBox.css"; // Importa o CSS separado

const SearchBox = () => {
  return (
    <div className="search-box">
      <div className="search-header">
        <h2>Busque por</h2>
        <svg
          xmlns="logo.png"
          width="24"
          height="24"
          viewBox="0 0 18 18"
          fill="none"
        >
          <title>Icone IA</title>
          <path
            src="logo.png"
            fill="url(#paint0_linear)"
          ></path>
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="0.249992"
              y1="10.2501"
              x2="17.75"
              y2="10.2501"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#5858BF" />
              <stop offset="1" stopColor="#E22446" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="search-tabs">
        <button className="active">Buscar carros</button>
        <button>Buscar motos</button>
      </div>

      <form className="search-form" autoComplete="off">
        <input
          type="text"
          placeholder="Procure pelo Tutorial"
        />
      </form>

      <a
        href="https://www.webmotors.com.br/carros/estoque?lkid=1022&tipoveiculo=carros"
        className="search-all-offers"
      >
        Localizar
      </a>
    </div>
  );
};

export default SearchBox;
