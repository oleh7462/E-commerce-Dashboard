"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { Download, FileText, FileSpreadsheet, ImageIcon, CalendarIcon, CheckCircle, Clock } from "lucide-react"
import { format } from "date-fns"

const formatOptions = [
  {
    label: "CSV",
    value: "csv",
    description: "Comma separated values",
    icon: FileText,
  },
  {
    label: "Excel",
    value: "excel",
    description: "Microsoft Excel Worksheet",
    icon: FileSpreadsheet,
  },
  {
    label: "PDF",
    value: "pdf",
    description: "Portable Document Format",
    icon: FileText,
  },
  {
    label: "PNG",
    value: "png",
    description: "Images",
    icon: ImageIcon,
  },
]

const metricOptions = [
  {
    key: "revenue",
    label: "Revenue",
    description: "Total income generated from sales.",
  },
  {
    key: "users",
    label: "Active Users",
    description: "Number of users actively using the platform.",
  },
  {
    key: "conversion",
    label: "Conversion Rate",
    description: "Percentage of users completing a desired action.",
  },
  {
    key: "traffic",
    label: "Website Traffic",
    description: "Total number of visits to the website.",
  },
  {
    key: "products",
    label: "Products Sold",
    description: "Number of products successfully sold.",
  },
]

export default function ExportDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [exportFormat, setExportFormat] = useState("pdf")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  })
  const [selectedMetrics, setSelectedMetrics] = useState({
    revenue: true,
    users: true,
    conversion: true,
    traffic: false,
    products: true,
  })
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [exportComplete, setExportComplete] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    setExportProgress(0)

    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsExporting(false)
          setExportComplete(true)

          // Generate and download the actual file
          generateAndDownloadFile()

          setTimeout(() => {
            setExportComplete(false)
            setIsOpen(false)
          }, 2000)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const generateAndDownloadFile = () => {
    const selectedData = Object.entries(selectedMetrics)
      .filter(([_, selected]) => selected)
      .map(([key, _]) => key)

    if (exportFormat === "csv") {
      downloadCSV(selectedData)
    } else if (exportFormat === "pdf") {
      downloadPDF(selectedData)
    } else if (exportFormat === "excel") {
      downloadExcel(selectedData)
    } else if (exportFormat === "png") {
      downloadImages(selectedData)
    }
  }

  const downloadCSV = (metrics: string[]) => {
    const csvData = generateCSVData(metrics)
    const blob = new Blob([csvData], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `analytics-export-${format(new Date(), "yyyy-MM-dd")}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const downloadPDF = (metrics: string[]) => {
    // Create a simple PDF content
    const pdfContent = generatePDFContent(metrics)
    const blob = new Blob([pdfContent], { type: "application/pdf" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `analytics-report-${format(new Date(), "yyyy-MM-dd")}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const downloadExcel = (metrics: string[]) => {
    const excelData = generateExcelData(metrics)
    const blob = new Blob([excelData], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `analytics-data-${format(new Date(), "yyyy-MM-dd")}.xlsx`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const downloadImages = (metrics: string[]) => {
    // For demo purposes, create a simple text file listing the charts
    const imageList = metrics.map((metric) => `${metric}-chart.png`).join("\n")
    const blob = new Blob([`Chart Images:\n${imageList}`], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `chart-images-${format(new Date(), "yyyy-MM-dd")}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const generateCSVData = (metrics: string[]) => {
    const headers = ["Date", ...metrics.map((m) => m.charAt(0).toUpperCase() + m.slice(1))]
    const sampleData = [
      ["2024-01-01", "125000", "1250", "3.2", "8500", "450"],
      ["2024-01-02", "132000", "1320", "3.4", "9200", "480"],
      ["2024-01-03", "128000", "1280", "3.1", "8800", "465"],
      ["2024-01-04", "145000", "1450", "3.6", "9800", "520"],
      ["2024-01-05", "138000", "1380", "3.3", "9100", "495"],
    ]

    return [headers.join(","), ...sampleData.map((row) => row.join(","))].join("\n")
  }

  const generatePDFContent = (metrics: string[]) => {
    return `Analytics Report
Generated: ${format(new Date(), "PPP")}
Date Range: ${dateRange.from ? format(dateRange.from, "PPP") : "N/A"} - ${dateRange.to ? format(dateRange.to, "PPP") : "N/A"}

Selected Metrics: ${metrics.join(", ")}

Summary:
- Total Revenue: $2,847,392
- Active Users: 45,231
- Conversion Rate: 3.24%
- Total Orders: 12,847

This is a sample PDF export. In a real implementation, this would contain charts and detailed analytics data.`
  }

  const generateExcelData = (metrics: string[]) => {
    // For demo purposes, return CSV-like data
    return generateCSVData(metrics)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-white/50 backdrop-blur-sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-white to-gray-50">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Export Analytics Data
          </DialogTitle>
          <DialogDescription>
            Choose your export format and customize what data to include in your report.
          </DialogDescription>
        </DialogHeader>

        {!isExporting && !exportComplete && (
          <div className="space-y-6">
            {/* Export Format Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Export Format</Label>
              <div className="grid gap-3 md:grid-cols-2">
                {formatOptions.map((format) => (
                  <div
                    key={format.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      exportFormat === format.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setExportFormat(format.value)}
                  >
                    <div className="flex items-center space-x-3">
                      {format.icon === ImageIcon ? (
                        <ImageIcon
                          className={`h-5 w-5 ${exportFormat === format.value ? "text-blue-500" : "text-gray-500"}`}
                        />
                      ) : (
                        <format.icon
                          className={`h-5 w-5 ${exportFormat === format.value ? "text-blue-500" : "text-gray-500"}`}
                        />
                      )}
                      <div>
                        <p className="font-medium">{format.label}</p>
                        <p className="text-sm text-muted-foreground">{format.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Range Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Date Range</Label>
              <div className="flex space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? format(dateRange.from, "PPP") : "Start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => setDateRange((prev) => ({ ...prev, from: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.to ? format(dateRange.to, "PPP") : "End date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(date) => setDateRange((prev) => ({ ...prev, to: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Metrics Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Include Metrics</Label>
              <div className="space-y-3">
                {metricOptions.map((metric) => (
                  <div key={metric.key} className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg border">
                    <Checkbox
                      id={metric.key}
                      checked={selectedMetrics[metric.key as keyof typeof selectedMetrics]}
                      onCheckedChange={(checked) => setSelectedMetrics((prev) => ({ ...prev, [metric.key]: checked }))}
                    />
                    <div className="flex-1">
                      <Label htmlFor={metric.key} className="font-medium cursor-pointer">
                        {metric.label}
                      </Label>
                      <p className="text-sm text-muted-foreground">{metric.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Options */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Additional Options</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-charts" defaultChecked />
                  <Label htmlFor="include-charts">Include charts and visualizations</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-summary" defaultChecked />
                  <Label htmlFor="include-summary">Include executive summary</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-recommendations" />
                  <Label htmlFor="include-recommendations">Include AI-generated insights</Label>
                </div>
              </div>
            </div>
          </div>
        )}

        {isExporting && (
          <div className="space-y-4 py-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <Download className="h-8 w-8 text-white animate-bounce" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Generating Export</h3>
              <p className="text-muted-foreground">Please wait while we prepare your analytics report...</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{exportProgress}%</span>
              </div>
              <Progress value={exportProgress} className="h-3" />
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Estimated time: {Math.max(1, Math.ceil((100 - exportProgress) / 10))} seconds</span>
            </div>
          </div>
        )}

        {exportComplete && (
          <div className="space-y-4 py-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-green-600">Export Complete!</h3>
            <p className="text-muted-foreground">Your analytics report has been generated successfully.</p>
            <Button
              onClick={() => {
                const link = document.createElement("a")
                link.download = `analytics-export-${format(new Date(), "yyyy-MM-dd")}.${exportFormat}`
                link.click()
              }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        )}

        {!isExporting && !exportComplete && (
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0"
              disabled={!Object.values(selectedMetrics).some(Boolean)}
            >
              <Download className="mr-2 h-4 w-4" />
              Generate Export
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
