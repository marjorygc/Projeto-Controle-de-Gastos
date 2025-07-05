import "./styles/Menu.css";
import Logobranca from "../assets/Logobranca .png";

export default function Menu({ abrirModal }) {
  return (
    <div id="menu">
      <div className="left">
        <img src={Logobranca} alt="logo" height={50} />
        <a href="/Home">Home</a>
        <a href="/Despesas">Despesas</a>
        <a href="/Estatisticas">Estatísticas</a>
      </div>
      <button id="criar" onClick={abrirModal}>
        CRIAR
      </button>
    </div>
  );
}
