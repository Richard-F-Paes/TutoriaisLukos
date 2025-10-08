import React from "react";
import "./Tutorialcase.css";

const Tutorialcase = () => {
  const posts = [
    {
      title: "Como abrir um caixa no Lukos PDV",
      date: "10 October 2025",
      img: "retaguarda.png",
    },
    {
      title: "Emitindo NFC-e passo a passo",
      date: "12 October 2025",
      img: "CaixaPDV.png",
    },
    {
      title: "Fechamento de caixa diário",
      date: "15 October 2025",
      img: "retaguarda.png",    },
    {
      title: "Emitindo relatórios de vendas",
      date: "18 October 2025",
      img: "retaguarda.png",    },
    {
      title: "Como cadastrar produtos no PDV",
      date: "20 October 2025",
      img: "retaguarda.png",    },
    {
      title: "Configurando formas de pagamento",
      date: "22 October 2025",
      img: "retaguarda.png",    },
  ];

  return (
    <section className="tc-section">
      <div className="tc-container">
        <h1 className="tc-title">Tutorialcase</h1>

        <div className="tc-grid">
          {posts.map((post, index) => (
            <div className="tc-card" key={index}>
              <img className="tc-img" src={post.img} alt={post.title} />
              <div className="tc-content">
                <a href="#" className="tc-post-title">
                  {post.title}
                </a>
                <span className="tc-date">On: {post.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tutorialcase;
