import React, { useEffect, useState } from "react";
import dataSource from "../data/mockData.json";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-white p-2 border shadow-md rounded text-sm">
        <strong>{item.label}</strong><br />
        Categoria: {item.category}<br />
        Valor: {item.value}
      </div>
    );
  }
  return null;
};

export default function BarChartWithFilter() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredData, setFilteredData] = useState(dataSource);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredData(dataSource);
    } else {
      setFilteredData(dataSource.filter(d => d.category === selectedCategory));
    }
  }, [selectedCategory]);

  const categories = ["All", ...new Set(dataSource.map(item => item.category))];

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Visualização de Dados</h2>
      <label htmlFor="category" className="sr-only">Filtrar por categoria</label>
      <select
        id="category"
        className="mb-4 p-2 border rounded"
        value={selectedCategory}
        onChange={e => setSelectedCategory(e.target.value)}
        aria-label="Filtro de categoria"
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={filteredData} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}