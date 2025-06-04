"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "Organic Search", value: 45, color: "#3b82f6" },
  { name: "Direct", value: 25, color: "#10b981" },
  { name: "Social Media", value: 15, color: "#8b5cf6" },
  { name: "Email", value: 10, color: "#f59e0b" },
  { name: "Referral", value: 5, color: "#ef4444" },
]

export default function TrafficChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => [`${value}%`, "Traffic Share"]}
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          formatter={(value) => <span className="text-sm font-medium">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
