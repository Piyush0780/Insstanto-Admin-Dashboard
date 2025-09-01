import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react"

interface KpiCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: LucideIcon
  color: string
  description?: string
}

export function KpiCard({ title, value, change, trend, icon: Icon, color, description }: KpiCardProps) {
  return (
    <Card className="relative overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {trend === "up" ? (
            <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
          ) : (
            <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
          )}
          <span className={trend === "up" ? "text-green-500" : "text-red-500"}>{change}</span>
          <span className="ml-1">from last month</span>
        </div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
      <div
        className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-${color.replace("text-", "")}/20 to-${color.replace("text-", "")}/40`}
      />
    </Card>
  )
}
