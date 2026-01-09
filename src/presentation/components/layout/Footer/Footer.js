import React from "react";
import { Link } from "react-router-dom";
import { FaPhone, FaEnvelope, FaClock, FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-[#5a008f] via-[#6c2396] to-[#5a008f] text-white pt-16 pb-8 overflow-hidden border-t border-white/20">
      {/* Brilho decorativo fundo */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Conteúdo principal */}
      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm">
        {/* Marca / Logo */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left text-white">
          <Link
            to="/"
            className="flex flex-col md:flex-row items-center mb-6 text-white no-underline hover:opacity-90 transition-opacity duration-300"
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-4 shadow-lg shadow-purple-900/40">
              <img src="/logobranco.svg" alt="Logo" className="w-24 h-auto drop-shadow-lg" />
            </div>
            <span className="text-2xl font-serif font-black leading-none tracking-tighter text-white uppercase shadow-black drop-shadow-md">
              Lukos <br /> Tecnologia
            </span>
          </Link>
          <p className="text-white/80 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
            Tecnologia de ponta para automatizar e escalar a rentabilidade do seu posto de combustível e loja de conveniência.
          </p>
        </div>

        {/* Navegação */}
        <div className="text-center md:text-left text-white">
          <h3 className="font-black uppercase tracking-widest mb-6 text-white text-base border-b border-white/10 pb-2 inline-block md:block">Navegação</h3>
          <ul className="space-y-3">
            <li><Link to="/" className="text-white/70 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-md transition-all duration-300 font-medium block md:inline-block w-full md:w-auto">Início</Link></li>
            <li><Link to="/tutoriais" className="text-white/70 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-md transition-all duration-300 font-medium block md:inline-block w-full md:w-auto">Tutoriais</Link></li>
            <li><Link to="/sobre" className="text-white/70 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-md transition-all duration-300 font-medium block md:inline-block w-full md:w-auto">Sobre a Lukos</Link></li>
            <li><Link to="/servicos" className="text-white/70 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-md transition-all duration-300 font-medium block md:inline-block w-full md:w-auto">Nossas Soluções</Link></li>
          </ul>
        </div>

        {/* Sistemas */}
        <div className="text-center md:text-left text-white">
          <h3 className="font-black uppercase tracking-widest mb-6 text-white text-base border-b border-white/10 pb-2 inline-block md:block">Sistemas</h3>
          <ul className="space-y-3">
            <li><Link to="/erp" className="text-white/70 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-md transition-all duration-300 font-medium block md:inline-block w-full md:w-auto">ERP Completo</Link></li>
            <li><Link to="/pdv" className="text-white/70 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-md transition-all duration-300 font-medium block md:inline-block w-full md:w-auto">PDV Fiscal</Link></li>
            <li><Link to="/ia" className="text-white/70 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-md transition-all duration-300 font-medium block md:inline-block w-full md:w-auto">Inteligência IA</Link></li>
            <li><Link to="/fidelidade" className="text-white/70 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-md transition-all duration-300 font-medium block md:inline-block w-full md:w-auto">Fidelidade</Link></li>
          </ul>
        </div>

        {/* Contato */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="font-black uppercase tracking-widest mb-6 text-white text-base border-b border-white/10 pb-2 inline-block md:block">Contato</h3>
          <ul className="space-y-4">
            <li className="flex flex-col md:flex-row items-center md:items-start text-white/90 group">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-2 md:mb-0 md:mr-3 group-hover:bg-white/20 transition-all shrink-0">
                <FaPhone className="text-purple-300 group-hover:text-white transition-colors text-sm" />
              </div>
              <span className="font-bold pt-1">(11) 4858-8429</span>
            </li>
            <li className="flex flex-col md:flex-row items-center md:items-start text-white/90 group">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-2 md:mb-0 md:mr-3 group-hover:bg-white/20 transition-all shrink-0">
                <FaEnvelope className="text-purple-300 group-hover:text-white transition-colors text-sm" />
              </div>
              <span className="font-bold pt-1">suporte@lukos.com.br</span>
            </li>
            <li className="flex flex-col md:flex-row items-center md:items-start text-white/90 group">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-2 md:mb-0 md:mr-3 group-hover:bg-white/20 transition-all shrink-0">
                <FaClock className="text-purple-300 group-hover:text-white transition-colors text-sm" />
              </div>
              <span className="pt-1">Seg. a sex.<br /><span className="font-bold">08h30 às 17h30</span></span>
            </li>
          </ul>

          {/* Redes Sociais */}
          <div className="flex space-x-4 mt-8">
            <a href="https://www.youtube.com/@lukos-solucoesemtecnologia8036" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 text-white group">
              <FaYoutube size={20} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.instagram.com/lukostecnologia/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 text-white group">
              <FaInstagram size={20} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.facebook.com/lukos.solucoes/?locale=pt_BR" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 text-white group">
              <FaFacebook size={20} className="group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Linha inferior */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-white/10 mt-12 py-8 flex flex-col md:flex-row items-center justify-between text-white/50 text-xs gap-4 font-light tracking-wide">
          <p>© 2025 Lukos Tecnologia LTDA. Todos os direitos reservados.</p>
          <p>CNPJ 14.594.338/0001-23</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
