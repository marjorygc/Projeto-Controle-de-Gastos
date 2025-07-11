import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Grafico({ totais }) { // Renamed from GraficoPizza
  const data = [
    { name: "Receitas", value: totais.totalReceitas },
    { name: "Despesas", value: totais.totalDespesas },
  ];

  const cores = ["#4caf50", "#f44336"]; // Verde para receitas, vermelho para despesas

  return (
    // Remove the fixed height div here
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}