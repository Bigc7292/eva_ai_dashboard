"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { PhoneIncoming, PhoneOutgoing, Star, Check, X, Download, Play, Pause } from "lucide-react"

// Simulated data storage
const profiles = {
  "+1 (555) 123-4567": {
    name: "John Doe",
    email: "john.doe@example.com",
    totalCalls: 15,
    avgDuration: "4m 30s",
    avgRating: 4.2,
    appointmentsBooked: 5,
    callHistory: [
      {
        date: "2025-02-10",
        duration: "5m 23s",
        type: "Outgoing",
        appointmentBooked: true,
        rating: 4.5,
        audioUrl: "/audio/call-2025-02-10.mp3",
        transcriptUrl: "/transcripts/call-2025-02-10.txt",
        summary: "Discussed property at 123 Main St. Client interested in viewing next week.",
      },
      {
        date: "2025-02-08",
        duration: "3m 45s",
        type: "Incoming",
        appointmentBooked: false,
        rating: 3.5,
        audioUrl: "/audio/call-2025-02-08.mp3",
        transcriptUrl: "/transcripts/call-2025-02-08.txt",
        summary: "Client had questions about financing options. Provided information on mortgage pre-approval process.",
      },
      {
        date: "2025-02-05",
        duration: "6m 12s",
        type: "Outgoing",
        appointmentBooked: true,
        rating: 5,
        audioUrl: "/audio/call-2025-02-05.mp3",
        transcriptUrl: "/transcripts/call-2025-02-05.txt",
        summary: "Scheduled property viewing for 456 Oak Ave. Client very enthusiastic about the neighborhood.",
      },
    ],
    weeklyCallData: [
      { day: "Mon", calls: 2 },
      { day: "Tue", calls: 1 },
      { day: "Wed", calls: 3 },
      { day: "Thu", calls: 0 },
      { day: "Fri", calls: 2 },
    ],
  },
  // Add more profiles here as needed
}

export default function ProfilePage() {
  const params = useParams()
  const phoneNumber = params.phoneNumber as string
  const profile = profiles[phoneNumber]
  const [currentAudio, setCurrentAudio] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  if (!profile) {
    return <div>Profile not found</div>
  }

  const toggleAudioPlayback = (audioUrl: string) => {
    if (currentAudio === audioUrl) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentAudio(audioUrl)
      setIsPlaying(true)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Profile: {phoneNumber}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p>
                <strong>Name:</strong> {profile.name}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
            </div>
            <div>
              <p>
                <strong>Total Calls:</strong> {profile.totalCalls}
              </p>
              <p>
                <strong>Avg. Duration:</strong> {profile.avgDuration}
              </p>
              <p>
                <strong>Avg. Rating:</strong> {profile.avgRating.toFixed(1)}
              </p>
              <p>
                <strong>Appointments Booked:</strong> {profile.appointmentsBooked}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Weekly Call Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={profile.weeklyCallData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="calls" fill="#8884d8" name="Calls" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Call History</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="table" className="w-full">
            <TabsList>
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="details">Detailed View</TabsTrigger>
            </TabsList>
            <TabsContent value="table">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Appointment</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profile.callHistory.map((call, index) => (
                    <TableRow key={index}>
                      <TableCell>{call.date}</TableCell>
                      <TableCell>{call.duration}</TableCell>
                      <TableCell>
                        <Badge variant={call.type === "Outgoing" ? "default" : "secondary"}>
                          {call.type === "Outgoing" ? (
                            <PhoneOutgoing className="h-3 w-3 mr-1 inline" />
                          ) : (
                            <PhoneIncoming className="h-3 w-3 mr-1 inline" />
                          )}
                          {call.type}
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
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => toggleAudioPlayback(call.audioUrl)}>
                            {currentAudio === call.audioUrl && isPlaying ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => window.open(call.transcriptUrl, "_blank")}>
                            <Download className="h-4 w-4 mr-2" /> Transcript
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="details">
              {profile.callHistory.map((call, index) => (
                <Card key={index} className="mb-4">
                  <CardHeader>
                    <CardTitle>
                      {call.date} - {call.type} Call
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      <strong>Duration:</strong> {call.duration}
                    </p>
                    <p>
                      <strong>Appointment Booked:</strong> {call.appointmentBooked ? "Yes" : "No"}
                    </p>
                    <p>
                      <strong>Rating:</strong> {call.rating.toFixed(1)}
                    </p>
                    <p>
                      <strong>Summary:</strong> {call.summary}
                    </p>
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" onClick={() => toggleAudioPlayback(call.audioUrl)}>
                        {currentAudio === call.audioUrl && isPlaying ? (
                          <Pause className="h-4 w-4 mr-2" />
                        ) : (
                          <Play className="h-4 w-4 mr-2" />
                        )}
                        {currentAudio === call.audioUrl && isPlaying ? "Pause Audio" : "Play Audio"}
                      </Button>
                      <Button variant="outline" onClick={() => window.open(call.transcriptUrl, "_blank")}>
                        <Download className="h-4 w-4 mr-2" /> Download Transcript
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

