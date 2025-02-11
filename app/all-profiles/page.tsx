"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Phone, Mail } from "lucide-react"
import Link from "next/link"

// Simulated profiles data
const profiles = [
  { id: 1, name: "John Doe", phoneNumber: "+1 (555) 123-4567", email: "john.doe@example.com", totalCalls: 15 },
  { id: 2, name: "Jane Smith", phoneNumber: "+1 (555) 987-6543", email: "jane.smith@example.com", totalCalls: 8 },
  {
    id: 3,
    name: "Alice Johnson",
    phoneNumber: "+1 (555) 246-8135",
    email: "alice.johnson@example.com",
    totalCalls: 22,
  },
  { id: 4, name: "Bob Williams", phoneNumber: "+1 (555) 369-2580", email: "bob.williams@example.com", totalCalls: 5 },
]

export default function AllProfilesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.phoneNumber.includes(searchTerm) ||
      profile.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">All Profiles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Input
              type="text"
              placeholder="Search profiles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Button variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Total Calls</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProfiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell>{profile.name}</TableCell>
                  <TableCell>{profile.phoneNumber}</TableCell>
                  <TableCell>{profile.email}</TableCell>
                  <TableCell>{profile.totalCalls}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link href={`/profile/${encodeURIComponent(profile.phoneNumber)}`}>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </Link>
                      <Button variant="outline" size="icon">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Mail className="h-4 w-4" />
                      </Button>
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

