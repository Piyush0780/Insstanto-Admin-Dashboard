"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Search, MoreHorizontal, Eye, Edit, CheckCircle, XCircle, DollarSign, Pause } from "lucide-react"
import type { Partner } from "@/types/partner"
import { mockPartners } from "@/lib/mock-data/partners"
import Link from "next/link"

export function PartnerTable() {
  const [partners] = useState<Partner[]>(mockPartners)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredPartners = partners.filter((partner) => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.phone.includes(searchTerm) ||
      partner.city.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || partner.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: Partner["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>
      case "rejected":
        return <Badge variant="outline">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getKycBadge = (status: Partner["kycStatus"]) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Verified</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Partner Management</CardTitle>
        <CardDescription>Manage and monitor all service partners</CardDescription>

        {/* Search and Filters */}
        <div className="flex items-center gap-4 pt-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search partners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Status: {statusFilter === "all" ? "All" : statusFilter}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("active")}>Active</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("suspended")}>Suspended</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("rejected")}>Rejected</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partner</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Services</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead>KYC Status</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPartners.map((partner) => (
                <TableRow key={partner.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{partner.name}</div>
                      <div className="text-sm text-muted-foreground">{partner.city}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{partner.email}</div>
                      <div className="text-muted-foreground">{partner.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {partner.services.slice(0, 2).map((service) => (
                        <Badge key={service} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {partner.services.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{partner.services.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(partner.joinDate)}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Rating: {partner.rating || "N/A"}</span>
                        {partner.rating > 0 && <span className="text-yellow-500">★</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={partner.onTimePercentage} className="w-16 h-1" />
                        <span className="text-xs text-muted-foreground">{partner.onTimePercentage}%</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{formatCurrency(partner.earnings)}</div>
                      {partner.pendingPayouts > 0 && (
                        <div className="text-xs text-secondary">Pending: {formatCurrency(partner.pendingPayouts)}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getKycBadge(partner.kycStatus)}</TableCell>
                  <TableCell>{getStatusBadge(partner.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/partners/${partner.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Partner
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <DollarSign className="mr-2 h-4 w-4" />
                          Process Payout
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {partner.status === "pending" && (
                          <>
                            <DropdownMenuItem className="text-green-600">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve Partner
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject Partner
                            </DropdownMenuItem>
                          </>
                        )}
                        {partner.status === "active" && (
                          <DropdownMenuItem className="text-destructive">
                            <Pause className="mr-2 h-4 w-4" />
                            Suspend Partner
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredPartners.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No partners found matching your search criteria.</div>
        )}
      </CardContent>
    </Card>
  )
}
