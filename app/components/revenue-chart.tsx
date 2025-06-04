"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const data = [
  { month: "Jan", revenue: 186000, target: 180000 },
  { month: "Feb", revenue: 205000, target: 200000 },
  { month: "Mar", revenue: 237000, target: 220000 },
  { month: "Apr", revenue: 273000, target: 250000 },
  { month: "May", revenue: 209000, target: 280000 },
  { month: "Jun", revenue: 314000, target: 300000 },
  { month: "Jul", revenue: 345000, target: 320000 },
  { month: "Aug", revenue: 389000, target: 350000 },
  { month: "Sep", revenue: 356000, target: 370000 },
  { month: "Oct", revenue: 423000, target: 400000 },
  { month: "Nov", revenue: 467000, target: 450000 },
  { month: "Dec", revenue: 512000, target: 500000 },
]

export default function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="month" className="text-xs" axisLine={false} tickLine={false} />
        <YAxis
          className="text-xs"
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
        />
        <Tooltip
          formatter={(value: number, name: string) => [
            `$${value.toLocaleString()}`,
            name === "revenue" ? "Actual Revenue" : "Target Revenue",
          ]}
          labelFormatter={(label) => `Month: ${label}`}
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Area
          type="monotone"
          dataKey="target"
          stroke="#8b5cf6"
          strokeWidth={2}
          strokeDasharray="5 5"
          fill="url(#colorTarget)"
        />
        <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fill="url(#colorRevenue)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
