import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF0057', '#800080', '#00FFFF', '#FFD700', '#ADFF2F']; // Mais cores para mais categorias

const Grafico2 = () => {
  const [dadosGrafico, setDadosGrafico] = useState([]);

  useEffect(() => {
    const carregarDadosDoLocalStorage = () => {
      const lancamentosSalvos = JSON.parse(localStorage.getItem("lancamentos")) || [];
      
      // Filtrar apenas despesas
      const despesas = lancamentosSalvos.filter(item => item.tipo === 'Despesa');

      // Agrupar despesas por categoria
      const despesasPorCategoria = despesas.reduce((acc, item) => {
        const categoria = item.categoria || 'Outros'; // Lida com categorias vazias
        const valor = parseFloat(item.valor);
        
        if (acc[categoria]) {
          acc[categoria] += valor;
        } else {
          acc[categoria] = valor;
        }
        return acc;
      }, {});

      // Formatar os dados para o Recharts
      const dadosFormatados = Object.keys(despesasPorCategoria).map(categoria => ({
        name: categoria,
        value: despesasPorCategoria[categoria],
      }));

      setDadosGrafico(dadosFormatados);
    };

    // Carrega os dados inicialmente
    carregarDadosDoLocalStorage();

    // Adiciona um listener para o evento 'storage' para atualizar o gráfico se os dados mudarem em outra aba/janela
    window.addEventListener('storage', carregarDadosDoLocalStorage);

    // Retorna uma função de limpeza para remover o listener
    return () => {
      window.removeEventListener('storage', carregarDadosDoLocalStorage);
    };
  }, []); 

  // Não renderiza o gráfico se não houver dados de despesa
  if (dadosGrafico.length === 0 || dadosGrafico.every(d => d.value === 0)) {
    return <p style={{ textAlign: "center" }}>Não há despesas para exibir no gráfico de categorias.</p>;
  }

  return (
    // Remove the fixed height div here
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
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {dadosGrafico.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Grafico2;