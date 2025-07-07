import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Cadastro.css";
import Logo from "../assets/Logobranca .png"
export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [resultado, setResultado] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const usuariosSalvos = localStorage.getItem("usuarios");
    if (usuariosSalvos) {
      setUsuarios(JSON.parse(usuariosSalvos));
    }
  }, []);

  async function handleCadastro() {
    const apiKey = "7e5d60dd106c47f785b1ad08548af269";
    const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`;

    try {
      const resposta = await fetch(url);
      const dados = await resposta.json();

      if (dados.is_valid_format.value && dados.deliverability === "DELIVERABLE") {
        const jaExiste = usuarios.some((u) => u.email === email);
        if (jaExiste) {
          setResultado("⚠️ Este e-mail já está cadastrado.");
          return;
        }

        if (!senha) {
          setResultado("⚠️ Por favor, insira uma senha.");
          return;
        }

        // Cadastra novo usuário e salva imediatamente no localStorage
        const novoUsuario = { email, senha };
        const novosUsuarios = [...usuarios, novoUsuario];
        setUsuarios(novosUsuarios);
        localStorage.setItem("usuarios", JSON.stringify(novosUsuarios)); // salva na hora

        setResultado("✅ Usuário cadastrado com sucesso!");
        setEmail("");
        setSenha("");
      } else {
        setResultado("❌ E-mail inválido ou não existe.");
      }
    } catch (erro) {
      console.error("Erro na verificação:", erro);
      setResultado("Erro na verificação do e-mail.");
    }
  }

  return (
    <div className="container1">
      <img src={Logo} alt="" />
      <div className="cadastroblock">
        
        <div className="cadastro">
          <h1>Cadastro</h1>
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
            <p
              style={{ cursor: "pointer", color: "black" }}
              onClick={() => navigate("/login")}
            >
              Voltar ao login
            </p>
          </div>
          <button className="cadastrar" onClick={handleCadastro}>
            Cadastrar
          </button>
          {resultado && <p>{resultado}</p>}
        </div>
      </div>
    </div>
  );
}
