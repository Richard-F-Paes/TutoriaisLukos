import React from "react";
import PropTypes from "prop-types";
import "./portfolios.css";
// Dados dos portfólios
const portfolios = [
  {
    bannerImg: "retaguarda.png",
    category: "Marketing",
    title: "The Complete Digital Marketing Guide Course",
    details: "Some quick example text to build on the card the bulk content...",

  },
  {
    bannerImg: "retaguarda.png",
    category: "Development",
    title: "Izomart is providing free course on Web Development",
    details: "Learn web development with Izomart and then you will be...",
    authorImg: "https:ontend.com/pictures/testimonial/testimonial_square_1.jpeg",
 
  },
  {
    bannerImg: "retaguarda.png",
    category: "Branding",
    title: "A to Z of Branding with Filinzo Academy",
    details: "Why should you have the branding knowledge? This is the very first...",

  },
  {
    bannerImg: "retaguarda.png",
    category: "Technology",
    title: "Master React JS and hire your self for sure!",
    details: "React JS: The most popular framework in today's programming...",
 
  },
  {
    bannerImg: "retaguarda.png",
    category: "Content Writing",
    title: "Do you know the rules of Writing?",
    details: "Yes! Though we are writing since our childhood, there are some...",
  
  },
  {
    bannerImg: "retaguarda.png",
    category: "Freelancing",
    title: "Digital Marketing and Web Development first time!",
    details: "In this growing world marketing and web development is enrolling the...",

  },
  {
    bannerImg: "retaguarda.png",
    category: "Designing",
    title: "Learn arcitecture without having a degree!",
    details: "Architecture is a widely dominated sector in enginnering. So why not...",

  },
  {
    bannerImg: "retaguarda.png",
    category: "Film & TV",
    title: "Become a master of model in a week with Coursera",
    details: "Vitae bibendum egestas magna sit elit non. Netus pharetra felis....",
  
  },
];

// Componente de item do portfólio
const PortfolioItem = ({ item }) => (
  <div className="card ezy-card">
    <div className="position-relative">
      <div className="play-btn">&#9658;</div>
      <img src={item.bannerImg} className="card-img-top" alt={item.title} />
    </div>
    <div className="card-body">
      <p className="card-text mb-2">{item.category}</p>
      <h5 className="card-title mb-2">{item.title}</h5>
      <p className="card-text">{item.details}</p>
      <div className="d-flex justify-content-between mb-2">
        <div className="d-flex align-items-center">
          <img
            src={item.authorImg}
            alt={item.author}
            className="author-img"
          />
          <h4 className="mb-0 ms-2">{item.author}</h4>
        </div>
        <button className="card-btn">Gift</button>
      </div>
    </div>
  </div>
);

PortfolioItem.propTypes = {
  item: PropTypes.object.isRequired,
};

// Paginação
const pagination = [
  { href: "#!", value: "1" },
  { href: "#!", value: "2" },
  { href: "#!", value: "3" },
  { href: "#!", value: "4" },
  { href: "#!", value: "5" },
  { href: "#!", value: "..." },
  { href: "#!", value: "11" },
];

const Pagination = () => (
  <nav>
    <ul className="pagination justify-content-center">
      <li className="page-item">
        <a className="page-link arrow" href="#!">&#8592;</a>
      </li>
      {pagination.map((page, i) => (
        <li className="page-item" key={i}>
          <a className="page-link" href={page.href}>{page.value}</a>
        </li>
      ))}
      <li className="page-item">
        <a className="page-link arrow" href="#!">&#8594;</a>
      </li>
    </ul>
  </nav>
);

// Tab bar
const tabBar = [
  { href: "#!", value: "Most Popular" },
  { href: "#!", value: "Culinary Arts" },
  { href: "#!", value: "Film & TV" },
];

const TabBar = ({ tabItem, index }) => (
  <li className="nav-item">
    <a className={index === 0 ? "nav-link active" : "nav-link"} href={tabItem.href}>
      {tabItem.value}
    </a>
  </li>
);

TabBar.propTypes = {
  tabItem: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

// Componente principal
const Portfolios = () => {
  return (
    <section className="portfolio-section">
      <h1 className="heading">Our Exclusive Courses</h1>

      <ul className="nav-bar">
        {tabBar.map((tab, i) => <TabBar tabItem={tab} index={i} key={i} />)}
      </ul>

      <div className="portfolio-grid">
        {portfolios.map((item, i) => (
          <PortfolioItem item={item} key={i} />
        ))}
      </div>

      <Pagination />
    </section>
  );
};

export default Portfolios;
