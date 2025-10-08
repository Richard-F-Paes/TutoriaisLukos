import React from "react";
import "./Testimonialshowcase.css";

const Testimonialshowcase = () => {
  return (
    <section className="ts-section">
      <div className="ts-container">
        <p className="ts-subtitle">Testimonials</p>
        <h1 className="ts-title">What clients saying</h1>

        <div className="ts-main">
          <div className="ts-bg"></div>

          <div className="ts-card">
            <img
              className="ts-img"
              src="https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"
              alt="client"
            />

            <div className="ts-content">
              <div>
                <p className="ts-name">Ema Watson</p>
                <p className="ts-role">Marketing Manager at Stech</p>
              </div>

              <p className="ts-text">
                “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda”.
              </p>

              <div className="ts-buttons">
                <button className="ts-btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ts-btn-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button className="ts-btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ts-btn-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonialshowcase;
