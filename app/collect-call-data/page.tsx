"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { PhoneCall, Check, Loader2 } from "lucide-react"

// Simulated phone numbers
const phoneNumbers = ["+1 (555) 123-4567", "+1 (555) 987-6543", "+1 (555) 246-8135", "+1 (555) 369-2580"]

export default function CollectCallDataPage() {
  const [collecting, setCollecting] = useState(false)
  const [collectedData, setCollectedData] = useState<Array<{ phoneNumber: string; status: string }>>([])

  const collectData = async () => {
    setCollecting(true)
    setCollectedData([])

    for (const phoneNumber of phoneNumbers) {
      // Simulate API call to collect data
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real application, you would make an API call here
      // const response = await fetch('/api/collect-call-data', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ phoneNumber })
      // })
      // const data = await response.json()

      setCollectedData((prev) => [...prev, { phoneNumber, status: "Collected" }])
    }

    setCollecting(false)
    toast({
      title: "Data Collection Complete",
      description: `Successfully collected data for ${phoneNumbers.length} numbers.`,
    })
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Collect Call Data</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={collectData} disabled={collecting}>
            {collecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Collecting Data...
              </>
            ) : (
              <>
                <PhoneCall className="mr-2 h-4 w-4" />
                Collect Call Data
              </>
            )}
          </Button>

          {collectedData.length > 0 && (
            <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {collectedData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.phoneNumber}</TableCell>
                    <TableCell>
                      <span className="flex items-center text-green-600">
                        <Check className="mr-2 h-4 w-4" />
                        {item.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

