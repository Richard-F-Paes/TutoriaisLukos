import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar/Navbar";
import Hero from "../../components/ui/Hero/Hero";
import Progresso from "../../components/ui/BarrradePogresso/Progresso";
import TutorialMain from "../../components/tutorial/Tutorialmain/Tutorialmain";
import PaginaCadastros from "../../components/content/PaginaCadastros/Cadastros";
import PaginaTutorial from "./PaginaTutorial";



function Cadastros() {
  return (
    <>
      <PaginaCadastros /> 
      <PaginaTutorial />
      
    </>
  );
}
export default Cadastros;
