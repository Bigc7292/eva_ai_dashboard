"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import {
  PhoneIncoming,
  PhoneOutgoing,
  Clock,
  Star,
  Calendar,
  Building,
  Home,
  PieChart,
  Check,
  X,
  PhoneCall,
  Users,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const data = [
  { day: "Monday", callsMade: 50, callsReceived: 30 },
  { day: "Tuesday", callsMade: 65, callsReceived: 40 },
  { day: "Wednesday", callsMade: 55, callsReceived: 35 },
  { day: "Thursday", callsMade: 70, callsReceived: 45 },
  { day: "Friday", callsMade: 60, callsReceived: 38 },
]

const recentCalls = [
  {
    phoneNumber: "+1 (555) 123-4567",
    duration: "5m 23s",
    callType: "Outgoing",
    appointmentBooked: true,
    rating: 4.5,
    callDateTime: "2025-02-10 14:30",
  },
  {
    phoneNumber: "+1 (555) 987-6543",
    duration: "3m 45s",
    callType: "Incoming",
    appointmentBooked: false,
    rating: 3.5,
    callDateTime: "2025-02-10 11:15",
  },
  {
    phoneNumber: "+1 (555) 246-8135",
    duration: "8m 12s",
    callType: "Outgoing",
    appointmentBooked: true,
    rating: 5,
    callDateTime: "2025-02-09 16:45",
  },
  {
    phoneNumber: "+1 (555) 369-2580",
    duration: "2m 30s",
    callType: "Incoming",
    appointmentBooked: false,
    rating: 2,
    callDateTime: "2025-02-09 09:20",
  },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-XsgRH152q6sLGsOMSVMkmZLK5xesMr.png"
              alt="Eva Real Estate Logo"
              className="h-10 w-auto mr-4"
            />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Eva Real Estate AI Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <Link href="/all-profiles">
                <Button variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  View All Profiles
                </Button>
              </Link>
              <Link href="/collect-call-data">
                <Button variant="outline">
                  <PhoneCall className="mr-2 h-4 w-4" />
                  Collect Call Data
                </Button>
              </Link>
              <Link href="/start-calls">
                <Button>
                  <PhoneOutgoing className="mr-2 h-4 w-4" />
                  Start Calls
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8 mb-8">
          <KpiCard
            title="Calls Made"
            value="300"
            icon={<PhoneOutgoing className="h-4 w-4" />}
            trend={{ value: 5, isPositive: true }}
          />
          <KpiCard
            title="Calls Received"
            value="188"
            icon={<PhoneIncoming className="h-4 w-4" />}
            trend={{ value: 2, isPositive: false }}
          />
          <KpiCard
            title="Avg. Duration"
            value="5m 30s"
            icon={<Clock className="h-4 w-4" />}
            trend={{ value: 30, isPositive: true, unit: "s" }}
          />
          <KpiCard
            title="Avg. Rating"
            value="4.5"
            icon={<Star className="h-4 w-4" />}
            trend={{ value: 0.2, isPositive: true }}
          />
          <KpiCard
            title="Total Meetings"
            value="45"
            icon={<Calendar className="h-4 w-4" />}
            trend={{ value: 3, isPositive: true }}
          />
          <KpiCard
            title="Offplan"
            value="28"
            icon={<Building className="h-4 w-4" />}
            trend={{ value: 1, isPositive: false }}
          />
          <KpiCard
            title="Secondary"
            value="17"
            icon={<Home className="h-4 w-4" />}
            trend={{ value: 4, isPositive: true }}
          />
          <KpiCard
            title="Meeting Split"
            value="62% / 38%"
            icon={<PieChart className="h-4 w-4" />}
            trend={{ value: 2, isPositive: true, unit: "%" }}
          />
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Weekly Call Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="callsMade" fill="#8884d8" name="Calls Made" />
                <Bar dataKey="callsReceived" fill="#82ca9d" name="Calls Received" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Call Data</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Call Type</TableHead>
                  <TableHead>Appointment</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Date & Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentCalls.map((call, index) => (
                  <TableRow key={index} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <TableCell>
                      <Link
                        href={`/profile/${encodeURIComponent(call.phoneNumber)}`}
                        className="text-blue-600 hover:underline"
                      >
                        {call.phoneNumber}
                      </Link>
                    </TableCell>
                    <TableCell>{call.duration}</TableCell>
                    <TableCell>
                      <Badge variant={call.callType === "Outgoing" ? "default" : "secondary"}>
                        {call.callType === "Outgoing" ? (
                          <PhoneOutgoing className="h-3 w-3 mr-1 inline" />
                        ) : (
                          <PhoneIncoming className="h-3 w-3 mr-1 inline" />
                        )}
                        {call.callType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {call.appointmentBooked ? (
                        <Badge variant="success" className="bg-green-500">
                          <Check className="h-3 w-3 mr-1 inline" /> Yes
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          <X className="h-3 w-3 mr-1 inline" /> No
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(call.rating)
                                ? "text-yellow-400 fill-current"
                                : i < call.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-sm text-gray-600">({call.rating.toFixed(1)})</span>
                      </div>
                    </TableCell>
                    <TableCell>{call.callDateTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function KpiCard({ title, value, icon, trend }) {
  return (
    <Card className="col-span-1 bg-white border-2 border-green-500">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
        <CardTitle className="text-xs font-medium text-gray-600">{title}</CardTitle>
        <div className="text-gray-600">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-lg font-bold text-gray-900">{value}</div>
        <div className={`text-xs mt-1 ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
          {trend.isPositive ? "↑" : "↓"} {trend.value}
          {trend.unit || "%"}
        </div>
      </CardContent>
    </Card>
  )
}

