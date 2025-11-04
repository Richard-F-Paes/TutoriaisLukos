import React, { useState } from "react";
import "./BlogHeader.css";

export default function Retaguarda() {
  const tabs = ["View all", "Retaguarda", "PDV LOJA", "PRÉ VENDA", "LUKOS PAY"];
  const sortOptions = ["Most recent", "Most popular", "Most viewed"];

  const [activeTab, setActiveTab] = useState("View all");
  const [sortBy, setSortBy] = useState(sortOptions[0]);

  const articles = [
    {
      category: "Retaguarda",
      title: "Cadastro de Clientes Com CFP",
      desc: "Insira o CPF do cliente no campo CNPJ CPF e aperte a tecla TAB.",
      author: "",
      date: "",
      avatar: "https://lh3.googleusercontent.com/sitesv/AICyYdaYuSdmWek7JEJ4pvBfU8YGfZD-hA8wYTG56orymM9ecWdVYWb5ZGZgLX12i1HzH-KMxGYluwGwfSwWf9m9sMlgf9heWu0O7vodR2xX4oS7Ux4-9qJFYkKFrGlmY3qOzRfXaQm_ftiym1IwCpp_TQPD1D3bf2O7_Cwn5ZrRadwmGcjvgnP1UKOyLsBsqNJmoVWod62eBNGBJFWGnVbCQV-fm46-1Sl5pUCG=w1280",
      img: "https://lh3.googleusercontent.com/sitesv/AICyYdbO_tF9A6P9hC3KTGM0EXrJhPrx__MHTgCM0wPL8Cbk83L1aYzOVJbCUPrlJqBnPO1u8bYCdE_HH8anv4M-qoHBKbiVYJCgVAc3QNJIjAvpkXq1BjeahyXwqYINe44034894YuD2EcLec9Rzu2KPpqYAn6x9_9vQ_UXGnHOyjr8tylexB9OIipXv3HkkAwQ_JJQYZYUXgFZiOiID_swr5f_VAo-UWZb3NJ8=w1280",
    },
     {
      category: "Retaguarda",
      title: "Cadastro de Clientes Com CFP",
      desc: "Insira o CPF do cliente no campo CNPJ CPF e aperte a tecla TAB.",
      author: "",
      date: "",
      avatar: "https://lh3.googleusercontent.com/sitesv/AICyYdaYuSdmWek7JEJ4pvBfU8YGfZD-hA8wYTG56orymM9ecWdVYWb5ZGZgLX12i1HzH-KMxGYluwGwfSwWf9m9sMlgf9heWu0O7vodR2xX4oS7Ux4-9qJFYkKFrGlmY3qOzRfXaQm_ftiym1IwCpp_TQPD1D3bf2O7_Cwn5ZrRadwmGcjvgnP1UKOyLsBsqNJmoVWod62eBNGBJFWGnVbCQV-fm46-1Sl5pUCG=w1280",
      img: "https://lh3.googleusercontent.com/sitesv/AICyYdbO_tF9A6P9hC3KTGM0EXrJhPrx__MHTgCM0wPL8Cbk83L1aYzOVJbCUPrlJqBnPO1u8bYCdE_HH8anv4M-qoHBKbiVYJCgVAc3QNJIjAvpkXq1BjeahyXwqYINe44034894YuD2EcLec9Rzu2KPpqYAn6x9_9vQ_UXGnHOyjr8tylexB9OIipXv3HkkAwQ_JJQYZYUXgFZiOiID_swr5f_VAo-UWZb3NJ8=w1280",
    },

     {
      category: "Retaguarda",
      title: "Cadastro de Clientes Com CFP",
      desc: "Insira o CPF do cliente no campo CNPJ CPF e aperte a tecla TAB.",
      author: "",
      date: "",
      avatar: "https://lh3.googleusercontent.com/sitesv/AICyYdaYuSdmWek7JEJ4pvBfU8YGfZD-hA8wYTG56orymM9ecWdVYWb5ZGZgLX12i1HzH-KMxGYluwGwfSwWf9m9sMlgf9heWu0O7vodR2xX4oS7Ux4-9qJFYkKFrGlmY3qOzRfXaQm_ftiym1IwCpp_TQPD1D3bf2O7_Cwn5ZrRadwmGcjvgnP1UKOyLsBsqNJmoVWod62eBNGBJFWGnVbCQV-fm46-1Sl5pUCG=w1280",
      img: "https://lh3.googleusercontent.com/sitesv/AICyYdbO_tF9A6P9hC3KTGM0EXrJhPrx__MHTgCM0wPL8Cbk83L1aYzOVJbCUPrlJqBnPO1u8bYCdE_HH8anv4M-qoHBKbiVYJCgVAc3QNJIjAvpkXq1BjeahyXwqYINe44034894YuD2EcLec9Rzu2KPpqYAn6x9_9vQ_UXGnHOyjr8tylexB9OIipXv3HkkAwQ_JJQYZYUXgFZiOiID_swr5f_VAo-UWZb3NJ8=w1280",
      },
      {
    category: "",
    title: "",
    desc: "",
    author: "",
    date: "",
    avatar: "",
    img: "",
  },
  {
    category: "",
    title: "",
    desc: "",
    author: "",
    date: "",
    avatar: "",
    img: "",
  },
  {
    category: "",
    title: "",
    desc: "",
    author: "",
    date: "",
    avatar: "",
    img: "",
  },
  ];

  // Filtrar por aba
  const filteredArticles =
    activeTab === "View all" ? articles : articles.filter((a) => a.category === activeTab);

  return (
    <section className="blog-header-container">
      {/* Tabs + Sort */}
      <div className="blog-header-controls">
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={tab === activeTab ? "tab active" : "tab"}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Grid de cards */}
      <div className="cards-grid">
        {filteredArticles.map((article, i) => (
          <div className="card" key={i}>
            <img src={article.img} alt={article.title} className="card-img" />
            <span className="card-category">{article.category}</span>
            <h3 className="card-title">{article.title}</h3>
            <p className="card-desc">{article.desc}</p>
            <div className="card-author">
              <img src={article.avatar} alt={article.author} className="card-avatar" />
              <span className="card-author-name">{article.author}</span>
              <span className="card-date">{article.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
