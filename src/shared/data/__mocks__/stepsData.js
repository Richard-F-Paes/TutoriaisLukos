// src/shared/data/__mocks__/stepsData.js
// DADOS MOCKADOS - APENAS PARA DESENVOLVIMENTO
import { FaCheck } from "react-icons/fa";

export const steps = [
  {
    id: 1,
    title: "Introdução ao Sistema de Retaguarda",
    duration: "5 minutos",
    video: "Vídeo: Visão Geral do Sistema de Retaguarda",
    content: (
      <>
        <h3>O que você vai aprender</h3>
        <p>
          O sistema de retaguarda do Lukos é o coração da gestão do seu negócio.
          Neste tutorial, você aprenderá como configurar e utilizar todas as
          funcionalidades para otimizar a gestão de produtos, estoque e relatórios.
        </p>

        <h3>Principais funcionalidades</h3>
        <ul className="feature-list">
          <li><FaCheck /> Cadastro completo de produtos</li>
          <li><FaCheck /> Controle de estoque em tempo real</li>
          <li><FaCheck /> Relatórios gerenciais avançados</li>
          <li><FaCheck /> Integração com PDV</li>
          <li><FaCheck /> Backup automático</li>
        </ul>
      </>
    ),
  },
  {
    id: 2,
    title: "Configuração Inicial",
    duration: "8 minutos",
    video: "Vídeo: Configurando o Sistema pela Primeira Vez",
    content: (
      <>
        <h3>Configurações Essenciais</h3>
        <p>
          Antes de começar a usar o sistema, é importante configurar corretamente
          os parâmetros básicos que irão definir o comportamento do sistema.
        </p>
        <div className="config-steps">
          <div className="config-item">
            <div className="config-number">1</div>
            <div className="config-content">
              <h4>Dados da Empresa</h4>
              <p>Configure CNPJ, razão social e endereço</p>
            </div>
          </div>
          <div className="config-item">
            <div className="config-number">2</div>
            <div className="config-content">
              <h4>Parâmetros Fiscais</h4>
              <p>Defina regime tributário e configurações de impostos</p>
            </div>
          </div>
          <div className="config-item">
            <div className="config-number">3</div>
            <div className="config-content">
              <h4>Usuários e Permissões</h4>
              <p>Crie usuários e defina níveis de acesso</p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 3,
    title: "Cadastro de Produtos",
    duration: "10 minutos",
    video: "Vídeo: Como cadastrar produtos",
    content: (
      <>
        <h3>Cadastro de Produtos</h3>
        <p>
          Nesta etapa, você aprenderá a cadastrar os produtos corretamente no
          sistema, preenchendo todas as informações necessárias para vendas,
          estoque e relatórios.
        </p>
      </>
    ),
  },
  {
    id: 4,
    title: "Controle de Estoque",
    duration: "12 minutos",
    video: "Vídeo: Controle de Estoque",
    content: (
      <>
        <h3>Controle de Estoque</h3>
        <p>
          Gerencie o estoque em tempo real, evitando perdas e garantindo que os
          produtos estejam sempre disponíveis.
        </p>
      </>
    ),
  },
  {
    id: 5,
    title: "Relatórios Gerenciais",
    duration: "8 minutos",
    video: "Vídeo: Relatórios Gerenciais",
    content: (
      <>
        <h3>Relatórios Gerenciais</h3>
        <p>
          Gere relatórios detalhados para auxiliar na tomada de decisões
          estratégicas do seu negócio.
        </p>
      </>
    ),
  },
  {
    id: 6,
    title: "Backup e Segurança",
    duration: "6 minutos",
    video: "Vídeo: Backup e Segurança",
    content: (
      <>
        <h3>Backup e Segurança</h3>
        <p>
          Aprenda como configurar backups automáticos e aplicar medidas de
          segurança para proteger os dados do sistema.
        </p>
      </>
    ),
  },
];

