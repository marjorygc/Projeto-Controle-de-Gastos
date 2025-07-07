// src/pages/Home.js
import { useState, useRef } from "react";
import Menu from "../componentes/Menu";
import Tabela from "../componentes/Tabela"; // Seu componente Tabela de Receitas/Despesas
import "./styles/Home.css";

export default function Home() {
  const [saldo, setSaldo] = useState({
    totalReceitas: 0,
    totalDespesas: 0,
    saldoFinal: 0,
  });
  const tabelaRef = useRef();

  return (
    <div className="home">
      {/* Passa a função para abrir o modal da Tabela para o Menu */}
      <Menu abrirModal={() => tabelaRef.current.abrirModal()} />
      <div className="saldo">
        <h2>Saldo</h2>
        <p>
          R$ {saldo.saldoFinal.toFixed(2)}
        </p>
      </div>
      <Tabela ref={tabelaRef} onSaldoChange={setSaldo} />
    </div>
  );
}