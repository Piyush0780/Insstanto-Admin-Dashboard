import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface ChartPlaceholderProps {
  title: string
  description: string
  icon: LucideIcon
  iconColor?: string
  children?: React.ReactNode
  className?: string
}

export function ChartPlaceholder({
  title,
  description,
  icon: Icon,
  iconColor = "text-primary/50",
  children,
  className = "",
}: ChartPlaceholderProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${iconColor.replace("/50", "")}`} />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children || (
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Icon className={`h-12 w-12 mx-auto mb-2 ${iconColor}`} />
              <p>Chart visualization will be implemented</p>
              <p className="text-sm">with Recharts integration</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
