import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Star, TrendingUp } from "lucide-react"

const peakHoursData = [
  { time: "9:00 AM", percentage: 45, bookings: 128 },
  { time: "10:00 AM", percentage: 75, bookings: 213 },
  { time: "11:00 AM", percentage: 62, bookings: 176 },
  { time: "2:00 PM", percentage: 68, bookings: 194 },
  { time: "3:00 PM", percentage: 55, bookings: 157 },
  { time: "6:00 PM", percentage: 87, bookings: 248 },
  { time: "7:00 PM", percentage: 72, bookings: 205 },
]

const topServices = [
  { name: "Home Cleaning", bookings: 1234, revenue: "₹14,80,800", growth: "+12%" },
  { name: "Pest Control", bookings: 856, revenue: "₹15,40,800", growth: "+8%" },
  { name: "AC Repair", bookings: 642, revenue: "₹16,05,000", growth: "+15%" },
  { name: "Plumbing", bookings: 523, revenue: "₹4,96,850", growth: "+5%" },
  { name: "Electrical", bookings: 387, revenue: "₹5,80,500", growth: "+18%" },
]

const customerMetrics = [
  { label: "Repeat Customers", value: "68%", count: "1,892" },
  { label: "New Customers", value: "32%", count: "889" },
  { label: "Customer Satisfaction", value: "4.8/5", count: "2,156 reviews" },
]

export function PerformanceMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Peak Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-secondary" />
            Peak Hours
          </CardTitle>
          <CardDescription>Most active booking times today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {peakHoursData.slice(0, 5).map((hour, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium">{hour.time}</span>
                <div className="flex items-center gap-3">
                  <Progress value={hour.percentage} className="w-16 h-2" />
                  <span className="text-sm text-muted-foreground w-8">{hour.percentage}%</span>
                  <Badge variant="outline" className="text-xs">
                    {hour.bookings}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-chart-3" />
            Top Services
          </CardTitle>
          <CardDescription>By booking volume and revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topServices.slice(0, 5).map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{service.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {service.growth}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{service.revenue}</p>
                </div>
                <Badge variant="outline">{service.bookings}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Customer Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Customer Insights
          </CardTitle>
          <CardDescription>Customer behavior and satisfaction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customerMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm font-medium">{metric.label}</p>
                  <p className="text-xs text-muted-foreground">{metric.count}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">{metric.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
