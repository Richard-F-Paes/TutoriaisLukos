import React from "react";
import "./Tutorial.css";
import TutorialStep from "./TutorialStep";

const TutorialMain = () => {
  return (
    <div className="tutorial-main">
      <TutorialStep
        stepNumber="1"
        title="Introdução ao Sistema"
        content="Nesta etapa, você vai conhecer o ambiente do sistema de retaguarda e entender os principais módulos disponíveis."
      />
      <TutorialStep
        stepNumber="2"
        title="Configuração Inicial"
        content="Aqui vamos configurar os parâmetros básicos do sistema, como cadastro de empresa, usuários e permissões."
      />
      <TutorialStep
        stepNumber="3"
        title="Cadastro de Produtos"
        content="Nesta etapa você aprenderá a cadastrar os produtos, configurar categorias e definir preços de venda."
      />
      <TutorialStep
        stepNumber="4"
        title="Relatórios"
        content="Por fim, veremos como gerar relatórios de vendas, estoque e movimentações para o acompanhamento diário."
      />
    </div>
  );
};

export default TutorialMain;
