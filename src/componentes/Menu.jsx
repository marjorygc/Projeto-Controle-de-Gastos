import "./styles/Menu.css";
import Logobranca from "../assets/Logobranca .png";

export default function Menu({ abrirModal }) {
     const criar = () => {
    if (window.location.pathname === "/Despesas") {
      // Se está na página Despesas, dispara o evento para adicionar uma nova despesa
      const novaDespesa = {
        nome: "Nova Despesa",
        valor: 0,
        tipo: "Fixa",
        categoria: "Geral",
      };
      const evento = new CustomEvent("nova-despesa", { detail: novaDespesa });
      window.dispatchEvent(evento);
      
    } else {
      // Nas outras páginas, abre o modal
      if (abrirModal) {
        abrirModal();
      }
    }
  };
  return (
    <div id="menu">
      <div className="left">
        <img src={Logobranca} alt="logo" height={50} />
        <a href="/Home">Home</a>
        <a href="/Despesas">Despesas</a>
        <a href="/Estatisticas">Estatísticas</a>
      </div>
      <button id="criar" onClick={criar}> CRIAR
      </button>
    
    </div>
  );
}
