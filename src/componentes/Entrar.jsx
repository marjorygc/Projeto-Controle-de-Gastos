import { useNavigate } from "react-router-dom";

export default function Entrar() {
  const navigate = useNavigate(); 

  function handleLogin() {
    // Aqui você pode validar dados se quiser antes de redirecionar
    navigate('/Home'); 
  }

  return (
    <button className="entrar" onClick={handleLogin}>Entrar</button>
  );
}
