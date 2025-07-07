import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'
import imagem from '../assets/telalogin.png'
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [resultado, setResultado] = useState(null);
  const navigate = useNavigate();

  function handleEntrar() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (usuarioEncontrado) {
      setResultado("✅ Login efetuado com sucesso!");
      navigate("/home");
    } else {
      setResultado("❌ E-mail ou senha incorretos.");
    }
  }

  return (
    <div className="container">
      <div className="loginblock">
        <div className="login">
          <h1>Login</h1>
          <div className="inputs">
            <input
              type="email"
              placeholder="Digite o e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Digite sua Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div className="links">
            
            <Link to="/cadastro"><p>Cadastrar-se</p></Link>
          </div>
          <button className="entrar" onClick={handleEntrar}>
            Entrar
          </button>
          {resultado && <p>{resultado}</p>}
        </div>
      </div>
      <div className="imagem">
        <img src={imagem} alt="" />
      </div>
    </div>
  );
}
