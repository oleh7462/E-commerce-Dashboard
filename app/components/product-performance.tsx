"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, TrendingUp, TrendingDown, Star, Eye, ShoppingCart } from "lucide-react"
import Image from "next/image"

export default function ProductPerformance() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("revenue")

  const products = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      category: "Electronics",
      price: 129.99,
      revenue: 45670,
      units: 351,
      views: 12450,
      conversion: 2.82,
      rating: 4.5,
      trend: "up",
      change: 15.3,
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      category: "Electronics",
      price: 199.99,
      revenue: 38990,
      units: 195,
      views: 8760,
      conversion: 2.23,
      rating: 4.3,
      trend: "up",
      change: 8.7,
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      category: "Fashion",
      price: 24.99,
      revenue: 12495,
      units: 500,
      views: 15230,
      conversion: 3.28,
      rating: 4.2,
      trend: "down",
      change: -2.1,
    },
    {
      id: 4,
      name: "Stainless Steel Water Bottle",
      category: "Home & Garden",
      price: 34.99,
      revenue: 10497,
      units: 300,
      views: 9870,
      conversion: 3.04,
      rating: 4.6,
      trend: "up",
      change: 12.4,
    },
    {
      id: 5,
      name: "Yoga Mat Premium",
      category: "Sports",
      price: 49.99,
      revenue: 8998,
      units: 180,
      views: 6540,
      conversion: 2.75,
      rating: 4.4,
      trend: "up",
      change: 5.2,
    },
  ]

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "revenue":
        return b.revenue - a.revenue
      case "units":
        return b.units - a.units
      case "conversion":
        return b.conversion - a.conversion
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Product Performance
          </h2>
          <div className="absolute -bottom-2 left-0 h-1 w-36 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-[250px] bg-white/50 backdrop-blur-sm"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] bg-white/50 backdrop-blur-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="revenue">Sort by Revenue</SelectItem>
              <SelectItem value="units">Sort by Units Sold</SelectItem>
              <SelectItem value="conversion">Sort by Conversion</SelectItem>
              <SelectItem value="rating">Sort by Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Top Performer</CardTitle>
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-1">Wireless Headphones</div>
            <p className="text-sm text-muted-foreground">$45,670 revenue this month</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Best Conversion</CardTitle>
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-1">3.28%</div>
            <p className="text-sm text-muted-foreground">Organic Cotton T-Shirt</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Most Viewed</CardTitle>
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
              <Eye className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-1">15,230</div>
            <p className="text-sm text-muted-foreground">Organic Cotton T-Shirt</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Highest Rated</CardTitle>
            <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 shadow-lg">
              <Star className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-1">4.6★</div>
            <p className="text-sm text-muted-foreground">Water Bottle</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg">
          <CardTitle className="text-white">Product Analytics Table</CardTitle>
          <CardDescription className="text-orange-100">Detailed performance metrics for all products</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Units Sold</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Conversion</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-white/50">
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt={product.name}
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                      <span className="max-w-[200px] truncate">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-white/50">
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">${product.price}</TableCell>
                  <TableCell className="font-bold text-green-600">${product.revenue.toLocaleString()}</TableCell>
                  <TableCell>{product.units}</TableCell>
                  <TableCell>{product.views.toLocaleString()}</TableCell>
                  <TableCell className="font-medium">{product.conversion}%</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">{product.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {product.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <Badge
                        variant={product.trend === "up" ? "default" : "destructive"}
                        className={
                          product.trend === "up"
                            ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0"
                            : ""
                        }
                      >
                        {product.change > 0 ? "+" : ""}
                        {product.change}%
                      </Badge>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
