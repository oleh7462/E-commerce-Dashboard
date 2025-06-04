"use client"

import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const data = [
  { stage: "Visitors", count: 10000, rate: 100 },
  { stage: "Product Views", count: 6500, rate: 65 },
  { stage: "Add to Cart", count: 2600, rate: 26 },
  { stage: "Checkout", count: 1300, rate: 13 },
  { stage: "Purchase", count: 324, rate: 3.24 },
]

export default function ConversionChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="horizontal">
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis type="number" className="text-xs" axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="stage" className="text-xs" axisLine={false} tickLine={false} width={100} />
        <Tooltip
          formatter={(value: number, name: string) => [
            name === "count" ? value.toLocaleString() : `${value}%`,
            name === "count" ? "Users" : "Conversion Rate",
          ]}
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
