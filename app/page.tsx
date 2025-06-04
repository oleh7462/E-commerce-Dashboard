"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { useLanguage } from "./components/language-provider"
import {
  Search,
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  RefreshCw,
  BarChart3,
  Activity,
  Settings,
  User,
  Menu,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import RevenueChart from "./components/revenue-chart"
import TrafficChart from "./components/traffic-chart"
import ConversionChart from "./components/conversion-chart"
import ProductPerformance from "./components/product-performance"
import RealtimeMetrics from "./components/realtime-metrics"
import ComparisonTool from "./components/comparison-tool"
import ProfilePage from "./components/profile-page"
import SettingsPage from "./components/settings-page"
import ExportDialog from "./components/export-dialog"
import NotificationSystem from "./components/notification-system"

export default function AnalyticsDashboard() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [isRealTime, setIsRealTime] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (isRealTime) {
      const interval = setInterval(() => {
        setLastUpdated(new Date())
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isRealTime])

  const kpiData = [
    {
      title: t("revenue"),
      value: "$2,847,392",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      title: t("users"),
      value: "45,231",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      title: t("conversion"),
      value: "3.24%",
      change: "-0.3%",
      trend: "down",
      icon: TrendingUp,
      gradient: "from-purple-500 to-pink-600",
    },
    {
      title: t("orders"),
      value: "12,847",
      change: "+15.7%",
      trend: "up",
      icon: ShoppingCart,
      gradient: "from-orange-500 to-red-600",
    },
  ]

  const navigationItems = [
    { id: "dashboard", label: t("dashboard"), icon: BarChart3 },
    { id: "profile", label: t("profile"), icon: User },
    { id: "settings", label: t("settings"), icon: Settings },
  ]

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "profile":
        return <ProfilePage theme={theme} language={language} />
      case "settings":
        return (
          <SettingsPage theme={theme || "light"} setTheme={setTheme} language={language} setLanguage={setLanguage} />
        )
      default:
        return renderDashboard()
    }
  }

  const renderDashboard = () => (
    <>
      {/* Status Bar */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <div className="absolute -bottom-2 left-0 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          </div>
          <Badge
            variant={isRealTime ? "default" : "secondary"}
            className={`${isRealTime ? "bg-gradient-to-r from-green-500 to-emerald-600" : ""} text-white border-0`}
          >
            {isRealTime ? "Real-time" : "Static"}
          </Badge>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-white/50 backdrop-blur-sm rounded-lg px-3 py-2 border">
          <RefreshCw className="h-4 w-4" />
          <span>
            {t("lastUpdated")}: {lastUpdated.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Enhanced KPI Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <Card
            key={index}
            className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${kpi.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}
            ></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-gray-600">{kpi.title}</CardTitle>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${kpi.gradient} shadow-lg`}>
                <kpi.icon className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-gray-900 mb-1">{kpi.value}</div>
              <div className="flex items-center text-sm">
                {kpi.trend === "up" ? (
                  <TrendingUp className="mr-1 h-4 w-4 text-emerald-500" />
                ) : (
                  <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span className={`font-medium ${kpi.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                  {kpi.change}
                </span>
                <span className="ml-1 text-gray-500">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm border shadow-sm">
          <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
          <TabsTrigger value="realtime">{t("realtime")}</TabsTrigger>
          <TabsTrigger value="comparison">{t("comparison")}</TabsTrigger>
          <TabsTrigger value="products">{t("products")}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-white">Revenue Overview</CardTitle>
                <CardDescription className="text-blue-100">Monthly revenue trends and projections</CardDescription>
              </CardHeader>
              <CardContent className="pl-2 pt-6">
                <RevenueChart />
              </CardContent>
            </Card>
            <Card className="col-span-3 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                <CardTitle className="text-white">Traffic Sources</CardTitle>
                <CardDescription className="text-green-100">Breakdown of traffic by source</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <TrafficChart />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
                <CardTitle className="text-white">Conversion Funnel</CardTitle>
                <CardDescription className="text-purple-100">User journey and conversion rates</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ConversionChart />
              </CardContent>
            </Card>
            <Card className="col-span-3 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg">
                <CardTitle className="text-white">Top Performing Categories</CardTitle>
                <CardDescription className="text-orange-100">Revenue by product category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Electronics</span>
                    <span className="text-sm text-muted-foreground">$847K</span>
                  </div>
                  <Progress value={85} className="h-3 bg-gradient-to-r from-blue-200 to-blue-300" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Fashion</span>
                    <span className="text-sm text-muted-foreground">$623K</span>
                  </div>
                  <Progress value={62} className="h-3 bg-gradient-to-r from-purple-200 to-purple-300" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Home & Garden</span>
                    <span className="text-sm text-muted-foreground">$445K</span>
                  </div>
                  <Progress value={45} className="h-3 bg-gradient-to-r from-green-200 to-green-300" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Sports</span>
                    <span className="text-sm text-muted-foreground">$312K</span>
                  </div>
                  <Progress value={31} className="h-3 bg-gradient-to-r from-orange-200 to-orange-300" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="realtime" className="space-y-4">
          <RealtimeMetrics isActive={isRealTime} />
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <ComparisonTool />
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <ProductPerformance />
        </TabsContent>
      </Tabs>
    </>
  )

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "dark bg-gray-900" : "bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50"}`}
    >
      {/* Enhanced Header */}
      <header className="border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 shadow-sm sticky top-0 z-50">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AnalyticsPro
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 mr-4">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentPage(item.id)}
                className={currentPage === item.id ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" : ""}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </div>

          <div className="flex flex-1 items-center space-x-2">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("search")}
                  className="pl-8 md:w-[300px] lg:w-[400px] bg-white/50 backdrop-blur-sm border-gray-200 dark:bg-gray-800/50 dark:border-gray-700"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {currentPage === "dashboard" && (
              <>
                <Button
                  variant={isRealTime ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsRealTime(!isRealTime)}
                  className={isRealTime ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0" : ""}
                >
                  <Activity className="mr-2 h-4 w-4" />
                  {isRealTime ? t("live") : t("paused")}
                </Button>
                <ExportDialog />
              </>
            )}

            <NotificationSystem />

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon" className="bg-white/50 backdrop-blur-sm">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-4">
                  {navigationItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={currentPage === item.id ? "default" : "ghost"}
                      className={`justify-start ${currentPage === item.id ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" : ""}`}
                      onClick={() => {
                        setCurrentPage(item.id)
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8 ring-2 ring-blue-500/20">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      AD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Admin User</p>
                    <p className="text-xs leading-none text-muted-foreground">admin@analyticspro.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setCurrentPage("profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrentPage("settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="container py-8">{renderCurrentPage()}</div>
    </div>
  )
}
