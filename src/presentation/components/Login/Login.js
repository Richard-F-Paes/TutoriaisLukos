import React from "react";
import "./Login.css";
import { LogIn, Mail, Lock } from "lucide-react";

const Login = () => {
  return (
    <div className="login-wrapper">
      {/* Coluna da esquerda - formulário */}
      <div className="login-form playing">
        {/* Ondas animadas */}
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>

        {/* Logo no topo */}
        <div className="logo-container">
          <img src="logo.png" alt="Logo" className="logo" />
        </div>

        <h1>Lukos</h1>
        <p>Lukos tecnologia</p>

        <div className="input-box">
          <Mail size={18} className="icon" />
          <input type="text" placeholder="Username" />
        </div>

        <div className="input-box">
          <Lock size={18} className="icon" />
          <input type="password" placeholder="Password" />
        </div>

        <button className="btn-primary">
          ENTRAR <LogIn size={18} style={{ marginLeft: "8px" }} />
        </button>

        <div className="divider"></div>

       

      </div>

      {/* Coluna da direita - imagem */}
      <div className="login-image">
        <img src="logo.png" alt="Login Illustration" />
      </div>
    </div>
  );
};

export default Login;
