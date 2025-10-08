import React, { useState } from "react";
import "./Herofeatures.css";

const Herofeatures = () => {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    {
      id: 1,
      title: "Retaguarda",
      desc: "Create a business, whether you’ve got a fresh idea.",
      mobileImg: "retaguarda.png",
      browserImg: "retaguarda.png",
      bgMobile: "#dcdce2ff",
      bgBrowserHeader: "#fff",
      borderBrowser: "#e5e7eb",
    },
    {
      id: 2,
      title: "PDV",
      desc: "Use automation to scale campaigns profitably and save time doing it.",
      mobileImg: "../assets/img/mockups/img11.jpg",
      browserImg: "CaixaPDV.png",
      bgMobile: "#374151",
      bgBrowserHeader: "#1f2937",
      borderBrowser: "#374151",
    },
    {
      id: 3,
      title: "Dashboard",
      desc: "One tool for your company to share knowledge and ship projects.",
      mobileImg: "../assets/img/mockups/img13.jpg",
      browserImg: "Dashboard.png",
      bgMobile: "#f3f4f6",
      bgBrowserHeader: "#fff",
      borderBrowser: "#e5e7eb",
    },
  ];

  return (
    <div className="fp-features-container">
      {/* Tabs Navigation */}
      <nav className="fp-tabs-nav" role="tablist" aria-orientation="horizontal">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`fp-tab-btn ${activeTab === tab.id ? "fp-active" : ""}`}
            id={`fp-tab-${tab.id}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`fp-tab-content-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <svg
              className="fp-tab-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              {tab.id === 1 && (
                <>
                  <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
                  <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
                </>
              )}
              {tab.id === 2 && (
                <>
                  <path d="m12 14 4-4" />
                  <path d="M3.34 19a10 10 0 1 1 17.32 0" />
                </>
              )}
              {tab.id === 3 && (
                <>
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </>
              )}
            </svg>
            <span className="fp-tab-text">
              <span className="fp-tab-title">{tab.title}</span>
              <span className="fp-tab-desc">{tab.desc}</span>
            </span>
          </button>
        ))}
      </nav>

      {/* Tabs Content */}
      <div className="fp-tabs-content">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`fp-tab-content-${tab.id}`}
            className={`fp-tab-panel ${activeTab === tab.id ? "fp-active" : ""}`}
            role="tabpanel"
            aria-labelledby={`fp-tab-${tab.id}`}
          >
            <div className="fp-devices-container">
              {/* Mobile Device */}
              <figure className="fp-device-mobile">
                <div
                  className="fp-device-mobile-inner"
                  style={{ backgroundColor: tab.bgMobile }}
                >
                  <img src={tab.mobileImg} alt="Mobile Device" />
                </div>
              </figure>

              {/* Browser Device */}
              <figure className="fp-device-browser">
                <div
                  className="fp-device-browser-header"
                  style={{ backgroundColor: tab.bgBrowserHeader, borderColor: tab.borderBrowser }}
                >
                  <div className="fp-device-browser-balls">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="fp-device-browser-url">Lukostutoriais.com.br</div>
                </div>
                <div className="fp-device-browser-content">
                  <img src={tab.browserImg} alt="Browser Device" />
                </div>
              </figure>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Herofeatures;
