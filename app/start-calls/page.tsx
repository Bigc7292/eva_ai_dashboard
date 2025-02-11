"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"
import { Upload, Phone } from "lucide-react"

export default function StartCallsPage() {
  const [csvData, setCsvData] = useState<Array<{ name: string; phoneNumber: string }>>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        const rows = text.split("\n")
        const parsedData = rows.slice(1).map((row) => {
          const [name, phoneNumber] = row.split(",")
          return { name: name.trim(), phoneNumber: phoneNumber.trim() }
        })
        setCsvData(parsedData)
      }
      reader.readAsText(file)
    }
  }

  const startCalls = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${process.env.RETELLAI_URL}/start-calls`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'full_name': 'Your Full Name Here' // Replace with the actual full name
        },
        body: JSON.stringify({ calls: csvData, agent_id: process.env.AGENT_ID })
      })
      if (response.ok) {
        console.log(`Successfully initiated ${csvData.length} calls with Retell AI.`);
      } else {
        throw new Error('Failed to start calls')
      }
    } catch (error) {
      console.error('Failed to start calls', error)
      setIsLoading(false)
    }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Start Automated Calls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label htmlFor="csv-upload">Upload CSV File</Label>
            <div className="flex items-center mt-2">
              <Input id="csv-upload" type="file" accept=".csv" onChange={handleFileUpload} />
              <Button type="button" variant="outline" size="icon" className="ml-2">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {csvData.length > 0 && (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone Number</TableHead>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {csvData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.phoneNumber}</TableCell>
                      <TableCell>{row.phoneNumber}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Button className="mt-4" onClick={startCalls} disabled={isLoading}>
                {isLoading ? (
                  "Starting Calls..."
                ) : (
                  <>
                    <Phone className="mr-2 h-4 w-4" /> Start Calls with Retell AI
                  </>
                )}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

