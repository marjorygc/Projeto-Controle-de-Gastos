import { useNavigate } from "react-router-dom";

export default function Entrar() {
  const navigate = useNavigate();
  
  function handleLogin() {
    if (Verificacao(email, senha)) {
      navigate("../pages/Home");
    } else {
      alert("Credenciais inválidas");
    }
  }

  return (
    <button className="entrar" onClick={handleLogin}>Entrar</button>
  );
}
