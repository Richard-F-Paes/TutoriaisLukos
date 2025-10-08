import React from "react";
import "./Erroshowcase.css"; // CSS externo

const Erroshowcase = () => {
  return (
    <section className="Erroshowcase">
      <div className="ErroshowcaseContainer">
        <div className="ErroshowcaseText">
          <p className="ErroshowcaseError">Lukos Tecnologia</p>
          <h1 className="ErroshowcaseTitle">Lukos Tutoriais</h1>
          <p className="ErroshowcaseDesc">
            Tutoriais para facilitar o uso do sistema.
          </p>

          <div className="ErroshowcaseButtons">
            <button className="ErroshowcaseBtnBack">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="ErroshowcaseBtnIcon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
              <span>Menu</span>
            </button>

            <button className="ErroshowcaseBtnHome"> Ver Tutoriais</button>
          </div>
        </div>

        <div className="ErroshowcaseImage">
          <img
            src="retaguarda.png"
            alt="retaguarda"
            className="ErroshowcaseImg"
          />
        </div>
      </div>
    </section>
  );
};

export default Erroshowcase;
