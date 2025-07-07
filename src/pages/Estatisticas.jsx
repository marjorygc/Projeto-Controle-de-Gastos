
import { useEffect, useState } from "react";
import Menu from "../componentes/Menu";
import GraficoBarras from "../componentes/Grafico"; // Certifique-se de que este componente exista

export default function Estatisticas() {
  const [totais, setTotais] = useState({
    totalReceitas: 0,
    totalDespesas: 0,
    saldoFinal: 0,
  });

  // Buscar os lançamentos do localStorage e calcular os totais
  useEffect(() => {
    const dadosSalvos = JSON.parse(localStorage.getItem("lancamentos")) || []; // Sua chave para lançamentos gerais

    let totalReceitas = 0;
    let totalDespesas = 0;

    dadosSalvos.forEach((item) => {
      const valor = parseFloat(item.valor);
      if (item.tipo === "Receita") {
        totalReceitas += valor;
      } else {
        totalDespesas += valor;
      }
    });

    const saldoFinal = totalReceitas - totalDespesas;

    setTotais({
      totalReceitas,
      totalDespesas,
      saldoFinal,
    });
  }, []);

  return (
    <div>
      {/* Aqui, não passamos abrirModal, pois Estatísticas não tem um modal de criação direto */}
      <Menu />
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>Estatísticas</h2>
      {/* Renderiza o gráfico só se houver dados */}
      {(totais.totalReceitas !== 0 || totais.totalDespesas !== 0) ? (
        <GraficoBarras totais={totais} />
      ) : (
        <p style={{ textAlign: "center" }}>Nenhum dado para exibir no gráfico.</p>
      )}
    </div>
  );
}