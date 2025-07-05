import React, { useState, useRef } from "react";
import Menu from "../componentes/Menu";
import Tabela from "../componentes/Tabela";
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
      <Menu abrirModal={() => tabelaRef.current.abrirModal()} />
      <div className="saldo">
        <h2>Saldo</h2>
        <p>
          R$ {saldo.saldoFinal.toFixed(2)}
        </p>
      </div>
      <Tabela ref={tabelaRef} onSaldoChange={setSaldo}  />
    </div>
  );
}
