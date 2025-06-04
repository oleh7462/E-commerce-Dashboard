"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts"
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react"

export default function ComparisonTool() {
  const [selectedPeriod1, setSelectedPeriod1] = useState("current-month")
  const [selectedPeriod2, setSelectedPeriod2] = useState("previous-month")

  const comparisonData = [
    { metric: "Revenue", current: 284739, previous: 253421, change: 12.4 },
    { metric: "Orders", current: 1847, previous: 1623, change: 13.8 },
    { metric: "Conversion Rate", current: 3.24, previous: 2.98, change: 8.7 },
    { metric: "Avg Order Value", current: 154.32, previous: 156.18, change: -1.2 },
    { metric: "Traffic", current: 56789, previous: 54321, change: 4.5 },
    { metric: "Bounce Rate", current: 34.2, previous: 36.8, change: -7.1 },
  ]

  const chartData = [
    { day: "Mon", current: 12000, previous: 10500 },
    { day: "Tue", current: 15000, previous: 13200 },
    { day: "Wed", current: 18000, previous: 16800 },
    { day: "Thu", current: 22000, previous: 19500 },
    { day: "Fri", current: 25000, previous: 21000 },
    { day: "Sat", current: 28000, previous: 24500 },
    { day: "Sun", current: 20000, previous: 18200 },
  ]

  const categoryComparison = [
    { category: "Electronics", current: 125000, previous: 108000, growth: 15.7 },
    { category: "Fashion", current: 89000, previous: 95000, growth: -6.3 },
    { category: "Home & Garden", current: 67000, previous: 58000, growth: 15.5 },
    { category: "Sports", current: 45000, previous: 42000, growth: 7.1 },
    { category: "Books", current: 23000, previous: 28000, growth: -17.9 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Comparison Analysis
          </h2>
          <div className="absolute -bottom-2 left-0 h-1 w-40 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedPeriod1} onValueChange={setSelectedPeriod1}>
            <SelectTrigger className="w-[180px] bg-white/50 backdrop-blur-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-month">Current Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="current-quarter">Current Quarter</SelectItem>
              <SelectItem value="last-quarter">Last Quarter</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-muted-foreground font-medium">vs</span>
          <Select value={selectedPeriod2} onValueChange={setSelectedPeriod2}>
            <SelectTrigger className="w-[180px] bg-white/50 backdrop-blur-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="previous-month">Previous Month</SelectItem>
              <SelectItem value="same-month-last-year">Same Month Last Year</SelectItem>
              <SelectItem value="previous-quarter">Previous Quarter</SelectItem>
              <SelectItem value="same-quarter-last-year">Same Quarter Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-white/50 backdrop-blur-sm border shadow-sm">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="categories"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
          >
            Categories
          </TabsTrigger>
          <TabsTrigger
            value="trends"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white"
          >
            Trends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {comparisonData.map((item, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{item.metric}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {item.metric === "Revenue" || item.metric === "Avg Order Value"
                          ? `$${item.current.toLocaleString()}`
                          : item.metric.includes("Rate")
                            ? `${item.current}%`
                            : item.current.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        vs{" "}
                        {item.metric === "Revenue" || item.metric === "Avg Order Value"
                          ? `$${item.previous.toLocaleString()}`
                          : item.metric.includes("Rate")
                            ? `${item.previous}%`
                            : item.previous.toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center">
                      {item.change > 0 ? (
                        <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <Badge
                        variant={item.change > 0 ? "default" : "destructive"}
                        className={
                          item.change > 0 ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0" : ""
                        }
                      >
                        {item.change > 0 ? "+" : ""}
                        {item.change.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
              <CardTitle className="text-white">Category Performance Comparison</CardTitle>
              <CardDescription className="text-blue-100">Revenue comparison by product category</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {categoryComparison.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/50 rounded-lg border hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{category.category}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-muted-foreground">
                          Current: ${category.current.toLocaleString()}
                        </span>
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Previous: ${category.previous.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {category.growth > 0 ? (
                        <TrendingUp className="h-4 w-4 text-emerald-500 mr-2" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-2" />
                      )}
                      <Badge
                        variant={category.growth > 0 ? "default" : "destructive"}
                        className={
                          category.growth > 0
                            ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0"
                            : ""
                        }
                      >
                        {category.growth > 0 ? "+" : ""}
                        {category.growth.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
              <CardTitle className="text-white">Daily Revenue Comparison</CardTitle>
              <CardDescription className="text-green-100">Week-over-week revenue trends</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" className="text-xs" axisLine={false} tickLine={false} />
                  <YAxis
                    className="text-xs"
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      `$${value.toLocaleString()}`,
                      name === "current" ? "Current Period" : "Previous Period",
                    ]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="previous"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="current"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
