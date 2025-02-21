"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Mon", steps: 8000, calories: 2000, sleep: 7 },
  { name: "Tue", steps: 9000, calories: 2200, sleep: 6.5 },
  { name: "Wed", steps: 7500, calories: 1900, sleep: 8 },
  { name: "Thu", steps: 8500, calories: 2100, sleep: 7.5 },
  { name: "Fri", steps: 10000, calories: 2300, sleep: 7 },
  { name: "Sat", steps: 11000, calories: 2500, sleep: 8.5 },
  { name: "Sun", steps: 9500, calories: 2400, sleep: 9 },
]

export default function HealthTracker() {
  const [steps, setSteps] = useState("")
  const [calories, setCalories] = useState("")
  const [sleep, setSleep] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log({ steps, calories, sleep })
    // Reset form
    setSteps("")
    setCalories("")
    setSleep("")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow gradient-bg py-12">
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-3xl font-bold text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Health Tracker
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Log Your Daily Health</CardTitle>
                  <CardDescription>Keep track of your steps, calories, and sleep.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="steps">Steps</Label>
                        <Input
                          id="steps"
                          type="number"
                          value={steps}
                          onChange={(e) => setSteps(e.target.value)}
                          placeholder="Number of steps"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="calories">Calories</Label>
                        <Input
                          id="calories"
                          type="number"
                          value={calories}
                          onChange={(e) => setCalories(e.target.value)}
                          placeholder="Calories burned"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sleep">Sleep (hours)</Label>
                        <Input
                          id="sleep"
                          type="number"
                          value={sleep}
                          onChange={(e) => setSleep(e.target.value)}
                          placeholder="Hours of sleep"
                          step="0.1"
                        />
                      </div>
                    </div>
                    <CardFooter className="flex justify-end mt-6">
                      <Button type="submit">Log Data</Button>
                    </CardFooter>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Your Health Overview</CardTitle>
                  <CardDescription>Weekly summary of your health metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="steps" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line yAxisId="left" type="monotone" dataKey="calories" stroke="#82ca9d" />
                      <Line yAxisId="right" type="monotone" dataKey="sleep" stroke="#ffc658" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

