import React, { useState, useRef } from "react";
import Menu from "../componentes/Menu";
import Tabela from "../componentes/Tabela";
import "./styles/Home.css";

export default function Home() {
  const [saldo, setSaldo] = useState(0);
  const tabelaRef = useRef();

  return (
    <div className="home">
      <Menu abrirModal={() => tabelaRef.current.abrirModal()} />
      <div className="saldo">
        <h2>Saldo Final</h2>
        <p style={{ color: saldo >= 0 ? "green" : "red" }}>
          R$ {saldo.toFixed(2)}
        </p>
      </div>
      <Tabela ref={tabelaRef} onSaldoChange={setSaldo} />
    </div>
  );
}
