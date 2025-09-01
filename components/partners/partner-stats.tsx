import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, Clock, DollarSign, AlertTriangle } from "lucide-react"
import { mockPartners } from "@/lib/mock-data/partners"

export function PartnerStats() {
  const totalPartners = mockPartners.length
  const activePartners = mockPartners.filter((p) => p.status === "active").length
  const pendingVerification = mockPartners.filter((p) => p.kycStatus === "pending").length
  const totalEarnings = mockPartners.reduce((sum, p) => sum + p.earnings, 0)
  const pendingPayouts = mockPartners.reduce((sum, p) => sum + p.pendingPayouts, 0)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const stats = [
    {
      title: "Total Partners",
      value: totalPartners.toString(),
      icon: Users,
      color: "text-primary",
      description: "All registered partners",
    },
    {
      title: "Active Partners",
      value: activePartners.toString(),
      icon: UserCheck,
      color: "text-green-600",
      description: "Currently active",
    },
    {
      title: "Pending Verification",
      value: pendingVerification.toString(),
      icon: Clock,
      color: "text-yellow-600",
      description: "Awaiting KYC approval",
    },
    {
      title: "Total Earnings",
      value: formatCurrency(totalEarnings),
      icon: DollarSign,
      color: "text-chart-3",
      description: "Partner earnings to date",
    },
    {
      title: "Pending Payouts",
      value: formatCurrency(pendingPayouts),
      icon: AlertTriangle,
      color: "text-secondary",
      description: "Awaiting payment",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
