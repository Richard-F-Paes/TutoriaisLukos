import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";

const PaginaTutorial = () => {
  return (
    <>
      <TutorialNavbar />
      <TutorialHero />

      <section className="tutorial-content">
        <div className="tutorial-layout">
          <Navbar />
          <TutorialMain />
          <Hero />
        </div>
      </section>

      <TutorialFooter />
    </>
  );
};

export default PaginaTutorial;
