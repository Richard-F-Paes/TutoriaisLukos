import React from "react";
import { Link } from "react-router-dom";
import { FaPhone, FaEnvelope, FaClock, FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-[#8B5CF6] text-white pt-12 pb-6 overflow-hidden border-t border-white/20">
      {/* Brilho decorativo fundo */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Conteúdo principal */}
      <div className="relative max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm">
        {/* Marca / Logo */}
        <div className="flex flex-col items-start text-white">
          <Link
            to="/"
            className="flex items-center mb-6 text-white no-underline hover:text-white transition-all duration-300"
          >
            <img src="logobranco.svg" alt="Logo" className="w-16 h-16 mr-3 drop-shadow-lg" />
            <span className="text-2xl font-black leading-none tracking-tighter text-white uppercase">
              Lukos <br /> Tecnologia
            </span>
          </Link>
          <p className="text-white/80 text-sm leading-relaxed max-w-xs">
            Tecnologia de ponta para automatizar e escalar a rentabilidade do seu posto de combustível e loja de conveniência.
          </p>
        </div>

        {/* Navegação */}
        <div className="text-white">
          <h3 className="font-black uppercase tracking-widest mb-8 text-white text-base">Navegação</h3>
          <ul className="space-y-4">
            <li><Link to="/" className="text-white/70 hover:text-white transition-colors font-medium">Início</Link></li>
            <li><Link to="/tutoriais" className="text-white/70 hover:text-white transition-colors font-medium">Tutoriais</Link></li>
            <li><Link to="/sobre" className="text-white/70 hover:text-white transition-colors font-medium">Sobre a Lukos</Link></li>
            <li><Link to="/servicos" className="text-white/70 hover:text-white transition-colors font-medium">Nossas Soluções</Link></li>
          </ul>
        </div>

        {/* Tutoriais */}
        <div className="text-white">
          <h3 className="font-black uppercase tracking-widest mb-8 text-white text-base">Sistemas</h3>
          <ul className="space-y-4">
            <li><Link to="/erp" className="text-white/70 hover:text-white transition-colors font-medium">ERP Completo</Link></li>
            <li><Link to="/pdv" className="text-white/70 hover:text-white transition-colors font-medium">PDV Fiscal</Link></li>
            <li><Link to="/ia" className="text-white/70 hover:text-white transition-colors font-medium">Inteligência IA</Link></li>
            <li><Link to="/fidelidade" className="text-white/70 hover:text-white transition-colors font-medium">Fidelidade</Link></li>
          </ul>
        </div>

        {/* Contato */}
        <div className="flex flex-col items-start">
          <h3 className="font-black uppercase tracking-widest mb-8 text-white text-base">Contato</h3>
          <ul className="space-y-6">
            <li className="flex items-center text-white/90">
              <FaPhone className="mr-3 text-white text-lg" />
              <span className="font-bold">(11) 4858-8429</span>
            </li>
            <li className="flex items-center text-white/90">
              <FaEnvelope className="mr-3 text-white text-lg" />
              <span className="font-bold">suporte@lukos.com.br</span>
            </li>
            <li className="flex items-start text-white/90">
              <FaClock className="mr-3 mt-1 text-white text-lg" />
              <span>Seg. a sex.<br /><span className="font-bold">08h30 às 17h30</span></span>
            </li>
          </ul>

          {/* Redes Sociais */}
          <div className="flex space-x-4 mt-8">
            <a href="https://www.youtube.com/@lukos-solucoesemtecnologia8036" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all text-white">
              <FaYoutube size={20} />
            </a>
            <a href="https://www.instagram.com/lukostecnologia/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all text-white">
              <FaInstagram size={20} />
            </a>
            <a href="https://www.facebook.com/lukos.solucoes/?locale=pt_BR" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all text-white">
              <FaFacebook size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Linha inferior */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="border-t border-white/20 mt-12 py-8 flex flex-col md:flex-row items-center justify-between text-white/60 text-xs gap-4">
          <p>© 2025 Lukos Tecnologia LTDA. Todos os direitos reservados.</p>
          <p>CNPJ 14.594.338/0001-23</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
