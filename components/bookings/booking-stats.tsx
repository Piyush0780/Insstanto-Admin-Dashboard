import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, CheckCircle, XCircle, DollarSign, Star, TrendingUp, Users } from "lucide-react"
import { mockBookingStats } from "@/lib/mock-data/bookings"

const stats = [
  {
    title: "Total Bookings",
    value: mockBookingStats.totalBookings.toLocaleString(),
    description: "All time bookings",
    icon: Calendar,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Pending Bookings",
    value: mockBookingStats.pendingBookings.toLocaleString(),
    description: "Awaiting confirmation",
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "Confirmed Bookings",
    value: mockBookingStats.confirmedBookings.toLocaleString(),
    description: "Ready to start",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Completed Bookings",
    value: mockBookingStats.completedBookings.toLocaleString(),
    description: "Successfully finished",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Total Revenue",
    value: `₹${mockBookingStats.totalRevenue.toLocaleString()}`,
    description: "From all bookings",
    icon: DollarSign,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    title: "Average Rating",
    value: mockBookingStats.averageRating.toString(),
    description: "Customer satisfaction",
    icon: Star,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Completion Rate",
    value: `${mockBookingStats.completionRate}%`,
    description: "Success percentage",
    icon: TrendingUp,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    title: "Cancelled Bookings",
    value: mockBookingStats.cancelledBookings.toLocaleString(),
    description: "Cancelled by users",
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
]

export function BookingStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
