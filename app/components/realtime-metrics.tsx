"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Users, ShoppingCart, Eye, TrendingUp } from "lucide-react"

interface RealtimeMetricsProps {
  isActive: boolean
}

export default function RealtimeMetrics({ isActive }: RealtimeMetricsProps) {
  const [metrics, setMetrics] = useState({
    activeUsers: 1247,
    pageViews: 3892,
    cartAdditions: 47,
    purchases: 12,
    bounceRate: 34.2,
  })

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setMetrics((prev) => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 20) - 10,
        pageViews: prev.pageViews + Math.floor(Math.random() * 50),
        cartAdditions: prev.cartAdditions + Math.floor(Math.random() * 5),
        purchases: prev.purchases + Math.floor(Math.random() * 3),
        bounceRate: Math.max(20, Math.min(50, prev.bounceRate + (Math.random() - 0.5) * 2)),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [isActive])

  const realtimeData = [
    {
      title: "Active Users",
      value: metrics.activeUsers.toLocaleString(),
      icon: Users,
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      title: "Page Views",
      value: metrics.pageViews.toLocaleString(),
      icon: Eye,
      gradient: "from-green-500 to-emerald-600",
    },
    {
      title: "Cart Additions",
      value: metrics.cartAdditions.toString(),
      icon: ShoppingCart,
      gradient: "from-orange-500 to-red-600",
    },
    {
      title: "Purchases",
      value: metrics.purchases.toString(),
      icon: TrendingUp,
      gradient: "from-purple-500 to-pink-600",
    },
  ]

  const topPages = [
    { page: "/products/electronics", views: 892, change: "+12%" },
    { page: "/categories/fashion", views: 743, change: "+8%" },
    { page: "/deals", views: 634, change: "+15%" },
    { page: "/home", views: 521, change: "+3%" },
    { page: "/products/books", views: 387, change: "-2%" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Real-time Analytics
          </h2>
          <div className="absolute -bottom-2 left-0 h-1 w-32 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"></div>
        </div>
        <Badge
          variant={isActive ? "default" : "secondary"}
          className={isActive ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0" : ""}
        >
          <Activity className="mr-1 h-3 w-3" />
          {isActive ? "Live Updates" : "Paused"}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {realtimeData.map((item, index) => (
          <Card
            key={index}
            className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{item.title}</CardTitle>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg`}>
                <item.icon className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">{item.value}</div>
              <p className="text-sm text-muted-foreground">{isActive ? "Updating live" : "Last update paused"}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="text-white">Top Pages (Last Hour)</CardTitle>
            <CardDescription className="text-blue-100">Most visited pages in real-time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            {topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg border">
                <div className="flex-1">
                  <p className="text-sm font-medium truncate">{page.page}</p>
                  <p className="text-xs text-muted-foreground">{page.views} views</p>
                </div>
                <Badge
                  variant={page.change.startsWith("+") ? "default" : "destructive"}
                  className={
                    page.change.startsWith("+")
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0"
                      : ""
                  }
                >
                  {page.change}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
            <CardTitle className="text-white">Performance Metrics</CardTitle>
            <CardDescription className="text-purple-100">Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Bounce Rate</span>
                <span className="text-sm text-muted-foreground">{metrics.bounceRate.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.bounceRate} className="h-3" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Conversion Rate</span>
                <span className="text-sm text-muted-foreground">3.24%</span>
              </div>
              <Progress value={3.24} className="h-3" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Avg. Session Duration</span>
                <span className="text-sm text-muted-foreground">4m 32s</span>
              </div>
              <Progress value={75} className="h-3" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Page Load Speed</span>
                <span className="text-sm text-muted-foreground">1.2s</span>
              </div>
              <Progress value={88} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
