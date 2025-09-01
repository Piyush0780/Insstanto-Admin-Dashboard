import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { ChartPlaceholder } from "@/components/dashboard/chart-placeholder"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { PerformanceMetrics } from "@/components/dashboard/performance-metrics"
import { Calendar, Users, DollarSign, TrendingUp, UserPlus, Star, Activity, BarChart3 } from "lucide-react"

// Mock data for KPIs
const kpiData = [
  {
    title: "Total Bookings",
    value: "2,847",
    change: "+12.5%",
    trend: "up" as const,
    icon: Calendar,
    color: "text-primary",
    description: "This month's bookings",
  },
  {
    title: "Total Sales",
    value: "₹8,45,230",
    change: "+8.2%",
    trend: "up" as const,
    icon: DollarSign,
    color: "text-secondary",
    description: "Gross revenue before discounts",
  },
  {
    title: "Net Revenue",
    value: "₹7,23,450",
    change: "+15.3%",
    trend: "up" as const,
    icon: TrendingUp,
    color: "text-chart-3",
    description: "After discounts and fees",
  },
  {
    title: "New Signups",
    value: "1,234",
    change: "+5.7%",
    trend: "up" as const,
    icon: UserPlus,
    color: "text-chart-4",
    description: "New customer registrations",
  },
  {
    title: "Active Partners",
    value: "456",
    change: "+2.1%",
    trend: "up" as const,
    icon: Users,
    color: "text-chart-5",
    description: "Verified service partners",
  },
  {
    title: "Customer Rating",
    value: "4.8",
    change: "+0.2",
    trend: "up" as const,
    icon: Star,
    color: "text-primary",
    description: "Average service rating",
  },
]

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <AdminSidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4">
          <AdminHeader title="Dashboard Overview" />
          <main className="flex-1 space-y-6 p-4 md:p-6">
            {/* KPI Cards Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {kpiData.map((kpi) => (
                <KpiCard key={kpi.title} {...kpi} />
              ))}
            </div>

            {/* Charts and Analytics Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <ChartPlaceholder
                title="Monthly Bookings Trend"
                description="Booking volume over the last 6 months"
                icon={Activity}
                iconColor="text-primary"
                className="col-span-2"
              />

              <ChartPlaceholder
                title="Revenue Distribution"
                description="Revenue by service category"
                icon={BarChart3}
                iconColor="text-secondary"
              />

              <ChartPlaceholder
                title="Partner Performance"
                description="Top performing partners"
                icon={Users}
                iconColor="text-chart-3"
              />
            </div>

            {/* Performance Metrics */}
            <PerformanceMetrics />

            {/* Quick Actions */}
            <QuickActions />

            {/* Recent Activity */}
            <RecentActivity />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
