import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Progresso from "../components/BarrradePogresso/Progresso";
import TutorialMain from "../components/Tutorialmain/Tutorialmain";
import PaginaCadastros from "../components/PaginaCadastros/Cadastros";
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
