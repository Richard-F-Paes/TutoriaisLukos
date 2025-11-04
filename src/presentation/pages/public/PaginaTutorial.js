import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar/Navbar";
import Hero from "../../components/ui/Hero/Hero";
import Progresso from "../../components/ui/BarrradePogresso/Progresso";
import TutorialMain from "../../components/tutorial/Tutorialmain/Tutorialmain";


const PaginaTutorial = () => {
  // Estado único do passo atual
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <>
      <Navbar />
  

      <div style={{ display: "flex", gap: "2rem", padding: "2rem" }}>
        {/* Barra de progresso */}
        <Progresso currentStep={currentStep} setCurrentStep={setCurrentStep} />

        {/* Conteúdo do tutorial */}
        <TutorialMain currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>
    </>
  );
};

export default PaginaTutorial;
