import { useEffect, useState } from "react";
import Menu from "../componentes/Menu";
import Grafico from "../componentes/Grafico"; // Assuming this is GraficoPizza
import Grafico2 from "../componentes/Grafico2"; // Gráfico de Despesas por Categoria
import Grafico3 from "../componentes/Grafico3"; // Gráfico de Tipo de Despesa
import "./styles/Estatisticas.css"; // Import the centralized CSS

export default function Estatisticas() {
  const [totais, setTotais] = useState({
    totalReceitas: 0,
    totalDespesas: 0,
    saldoFinal: 0,
  });

  // Fetch data from localStorage and calculate totals
  useEffect(() => {
    const dadosSalvos = JSON.parse(localStorage.getItem("lancamentos")) || [];

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
      <Menu />
      <div className="estatisticas-container">
        <h2 style={{ textAlign: "center" }}>Estatísticas Financeiras</h2>

        {/* Display totals in a card-like container */}
        <div className="totais-container1">
          <div className="totais-item1">
            <p>Receitas Totais:</p>
            <strong style={{ color: "green" }}>R$ {totais.totalReceitas.toFixed(2)}</strong>
          </div>
          <div className="totais-item1">
            <p>Despesas Totais:</p>
            <strong style={{ color: "red" }}>R$ {totais.totalDespesas.toFixed(2)}</strong>
          </div>
          <div className="totais-item1">
            <p>Saldo Final:</p>
            <strong style={{ color: totais.saldoFinal >= 0 ? "blue" : "red" }}>
              R$ {totais.saldoFinal.toFixed(2)}
            </strong>
          </div>
        </div>

        <div className="graficos-grid">
          {/* First Graph: Revenue vs. Expenses */}
          <div className="grafico-card">
            <h3>Receitas e Despesas</h3>
            {totais.totalReceitas !== 0 || totais.totalDespesas !== 0 ? (
              <Grafico totais={totais} />
            ) : (
              <p>Nenhum dado de receita ou despesa para exibir no gráfico comparativo.</p>
            )}
          </div>

          {/* Second Graph: Expenses by Category */}
          <div className="grafico-card">
            <h3>Despesas por Categoria</h3>
            <Grafico2 />
          </div>

          {/* Third Graph: Fixed vs. Variable Expenses */}
          <div className="grafico-card">
            <h3>Fixas vs. Variáveis</h3>
            <Grafico3 />
          </div>
        </div>
      </div>
    </div>
  );
}