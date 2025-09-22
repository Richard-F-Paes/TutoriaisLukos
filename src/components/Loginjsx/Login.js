import "./Login.css";

export default function Example() {
  return (
    <div className="page-container">
      <div className="form-box">
        <img
          alt="Lukos"
          src="logo.png"
          className="logo"
        />
        <h2 className="form-title">Entrar na sua conta</h2>

        <form action="#" method="POST" className="form">
          <div>
            <label htmlFor="email" className="label">Login</label>
            <input id="email" name="email" type="email" required className="input" placeholder="Seu Login"/>
          </div>

          <div>
            <div className="flex items-center justify-between" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label htmlFor="password" className="label">Senha</label>
              <a href="#" className="forgot-password">Esqueceu sua senha?</a>
            </div>
            <input id="password" name="password" type="password" required className="input" placeholder="••••••••"/>
          </div>

          <button type="submit" className="btnLogin">Entrar</button>
        </form>

        <p className="footer-text">

        </p>
      </div>
    </div>
  );
}
