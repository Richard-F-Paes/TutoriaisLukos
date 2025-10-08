import React from "react";
import "./Heropreline.css";

const Heropreline = () => {
  return (
    <section className="heropreline">
      <div className="heropreline-grid">
        <div>
          <h1 className="heropreline-title">
            Start your journey with <span>Lukospay</span>
          </h1>
          <p className="hero-description">
            Soluções inteligentes para maquininhas POS e sistemas de pagamento.
            Com o Lukospay, seu negócio ganha agilidade e inovação em um só
            lugar.
          </p>

          <div className="hero-buttons">
            <a href="#" className="hero-btn-primary">
              Get started
              <svg
                className="hero-arrow"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </a>

            <a href="#" className="hero-btn-secondary">
              Contact sales team
            </a>
          </div>

          <div className="hero-reviews">
            {[1, 2].map((i) => (
              <div key={i} className="hero-review">
                <div className="hero-stars">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 1.5l2.6 5.3 5.9.8-4.3 4.2 1 6-5.2-2.7-5.2 2.7 1-6L1.5 7.6l5.9-.8L10 1.5z" />
                    </svg>
                  ))}
                </div>
                <p>
                  <span className="font-bold">4.6</span> /5 - from 12k reviews
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-image">
          <img src="logo.png" alt="Lukospay SmartPOS" />
        </div>
      </div>
    </section>
  );
};

export default Heropreline;
