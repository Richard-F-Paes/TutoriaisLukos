import React from "react";
import "./Tutorialshowcase.css"; // Certifique-se que o CSS está no mesmo diretório

const Tutorialshowcase = () => {
  return (
    <section className="Tutorialshowcase">
      <div className="TutorialContainer">
        <h1 className="TutorialTitle">From the blog</h1>

        <div className="TutorialGrid">
          <div className="TutorialCard">
            <img className="TutorialImage" src="retaguarda.png" alt="Tutorial" />
            <div className="TutorialContent">
              <a href="#" className="TutorialCardTitle">
                How to use sticky note for problem solving
              </a>
              <span className="TutorialDate">On: 20 October 2019</span>
            </div>
          </div>

          <div className="TutorialCard">
            <img className="TutorialImage" src="retaguarda.png" alt="Tutorial" />
            <div className="TutorialContent">
              <a href="#" className="TutorialCardTitle">
                asfd routine to boost your mood
              </a>
              <span className="TutorialDate">On: 25 November 2020</span>
            </div>
          </div>

          <div className="TutorialCard">
            <img className="TutorialImage" src="retaguarda.png" alt="Tutorial" />
            <div className="TutorialContent">
              <a href="#" className="TutorialCardTitle">
                All the features you want to know
              </a>
              <span className="TutorialDate">On: 30 September 2020</span>
            </div>
          </div>

          <div className="TutorialCard">
            <img className="TutorialImage" src="retaguarda.png" alt="Tutorial" />
            <div className="TutorialContent">
              <a href="#" className="TutorialCardTitle">
                Minimal workspace for your inspirations
              </a>
              <span className="TutorialDate">On: 13 October 2019</span>
            </div>
          </div>

          <div className="TutorialCard">
            <img className="TutorialImage" src="retaguarda.png" alt="Tutorial" />
            <div className="TutorialContent">
              <a href="#" className="TutorialCardTitle">
                What do you want to know about blockchain
              </a>
              <span className="TutorialDate">On: 20 October 2019</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tutorialshowcase;
