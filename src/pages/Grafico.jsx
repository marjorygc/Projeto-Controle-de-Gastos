import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", receitas: 4000, despesas: 2400 },
  { month: "Feb", receitas: 3000, despesas: 1398 },
  { month: "Mar", receitas: 5000, despesas: 3800 },
  { month: "Apr", receitas: 4000, despesas: 2800 },
  { month: "May", receitas: 6000, despesas: 3908 },
  { month: "Jun", receitas: 7000, despesas: 4300 },
];

export default function FinanceChart() {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2 style={{ textAlign: "center" }}>Receitas vs Despesas</h2>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="receitas"
            stroke="#4caf50"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="despesas"
            stroke="#f44336"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
