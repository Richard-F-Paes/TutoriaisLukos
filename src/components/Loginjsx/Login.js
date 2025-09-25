import React from 'react';
import './Login.css';
import { LogOut } from 'lucide-react';

const Login = () => {
  return (
    <div className="container-login">
      <div className='icon-logo' src="logo.png">
        
      </div>
      <div className="heading">Login</div>


      <form className="form">
        <input 
          required 
          className="input" 
          type="email" 
          name="email" 
          id="email" 
          placeholder="Usuário"
        />
        <input 
          required 
          className="input" 
          type="password" 
          name="password" 
          id="password" 
          placeholder="Senha"
        />
    
        <input 
          className="login-button" 
          type="submit" 
          value="Entrar"
        />
      </form>

  

  
    </div>
  );
};

export default Login;
