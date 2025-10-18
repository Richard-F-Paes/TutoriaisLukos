import React from "react";
import { Link } from "react-router-dom";
import { FaPhone, FaEnvelope, FaClock, FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-purple-700 to-purple-900 text-white pt-6 pb-2 overflow-hidden">
      {/* Textura suave sobre o gradiente */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-10 pointer-events-none"></div>

      {/* Conteúdo principal */}
      <div className="relative max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
        {/* Marca / Logo */}
        <div className="flex flex-col items-center text-white">
          <a
            href="https://lukos.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center mb-2 text-white"
          >
            <img src="logo.png" alt="Logo" className="w-10 h-10 mr-2 drop-shadow-md" />
            <span className="text-lg font-bold leading-tight tracking-wide">
              Lukos <br /> Tecnologia
            </span>
          </a>
          <p className="text-gray-300 text-xs text-center leading-relaxed max-w-[180px]">
            Soluções completas para PDV, retaguarda e conveniência.
          </p>
        </div>

        {/* Navegação */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-100 text-sm">Navegação</h3>
          <ul className="space-y-1 text-gray-300 text-xs">
            <li><Link to="/" className="hover:text-white transition-colors">Início</Link></li>
            <li><Link to="/categorias" className="hover:text-white transition-colors">Categorias</Link></li>
            <li><Link to="/sobre" className="hover:text-white transition-colors">Sobre</Link></li>
          </ul>
        </div>

        {/* Tutoriais */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-100 text-sm">Tutoriais</h3>
          <ul className="space-y-1 text-gray-300 text-xs">
            <li><Link to="/tutoriais" className="hover:text-white transition-colors">Tutoriais</Link></li>
            <li><Link to="/retaguarda" className="hover:text-white transition-colors">Retaguarda</Link></li>
            <li><Link to="/pdv" className="hover:text-white transition-colors">PDV</Link></li>
          </ul>
        </div>

        {/* Contato */}
        <div className="flex flex-col items-center">
          <h3 className="font-semibold mb-2 text-gray-100 text-sm">Contato</h3>
          <ul className="space-y-1 text-xs text-gray-300">
            <li className="flex items-center"><FaPhone className="mr-2 text-purple-300" /> (11) 4858-8429</li>
            <li className="flex items-center"><FaEnvelope className="mr-2 text-purple-300" /> suporte@lukos.com.br</li>
            <li className="flex items-start"><FaClock className="mr-2 mt-1 text-purple-300" /> Seg. a sex. <br /> 08h30 às 17h30</li>
          </ul>

          {/* Redes Sociais */}
          <div className="flex space-x-3 mt-3">
            <a href="https://www.youtube.com/@lukos-solucoesemtecnologia8036" target="_blank" rel="noopener noreferrer" className="hover:text-purple-200 transition-transform hover:scale-110">
              <FaYoutube size={18} />
            </a>
            <a href="https://www.instagram.com/lukostecnologia/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-200 transition-transform hover:scale-110">
              <FaInstagram size={18} />
            </a>
            <a href="https://www.facebook.com/lukos.solucoes/?locale=pt_BR" target="_blank" rel="noopener noreferrer" className="hover:text-purple-200 transition-transform hover:scale-110">
              <FaFacebook size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Linha inferior */}
      <div className="border-t border-purple-950 mt-6 py-2 text-center text-gray-400 text-xs relative z-10">
        © 2025 Lukos Tecnologia LTDA | CNPJ 14.594.338/0001-23
      </div>
    </footer>
  );
};

export default Footer;
