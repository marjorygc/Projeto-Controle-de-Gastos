import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d']; // Cores para Fixa e Variável

const GraficoTipoDespesa = () => {
  const [dadosGrafico, setDadosGrafico] = useState([]);

  useEffect(() => {
    const carregarDadosDoLocalStorage = () => {
      try {
        // --- A LÓGICA DE BUSCA E PROCESSAMENTO DE DADOS PERMANECE INALTERADA ---
        const despesasSalvas = JSON.parse(localStorage.getItem("despesas")) || [];

        let countFixas = 0;
        let countVariaveis = 0;

        despesasSalvas.forEach(item => {
          if (item.tipo === 'Fixa') {
            countFixas++;
          } else if (item.tipo === 'Variável') {
            countVariaveis++;
          }
        });

        // Prepara os dados para o Recharts
        const dadosFormatados = [];
        if (countFixas > 0) {
          dadosFormatados.push({ name: 'Fixas', value: countFixas });
        }
        if (countVariaveis > 0) {
          dadosFormatados.push({ name: 'Variáveis', value: countVariaveis });
        }
        
        setDadosGrafico(dadosFormatados);
      } catch (error) {
        console.error("GraficoTipoDespesa: Erro ao carregar/processar dados do localStorage:", error);
        setDadosGrafico([]); // Em caso de erro, limpa os dados do gráfico
      }
    };

    // Carrega os dados inicialmente
    carregarDadosDoLocalStorage();

    // Adiciona um listener para o evento 'storage' para atualizar o gráfico
    // se os dados de 'despesas' mudarem em outra aba/janela
    window.addEventListener('storage', carregarDadosDoLocalStorage);

    // Retorna uma função de limpeza para remover o listener ao desmontar
    return () => {
      window.removeEventListener('storage', carregarDadosDoLocalStorage);
    };
  }, []); // Array de dependências vazio para rodar apenas na montagem e limpeza na desmontagem

  // Mensagem "sem dados" permanece, pois é parte da lógica de exibição condicional
  if (dadosGrafico.length === 0) {
    return <p style={{ textAlign: "center" }}>Nenhuma despesa fixa ou variável para exibir no gráfico.</p>;
  }

  return (
    // Removida a div externa com 'height: 400' e o título <h3>.
    // O ResponsiveContainer agora preenche 100% da largura e altura do seu elemento pai.
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={dadosGrafico}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} // Mostra nome e porcentagem
        >
          {dadosGrafico.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => `${name}: ${value} despesas`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default GraficoTipoDespesa;