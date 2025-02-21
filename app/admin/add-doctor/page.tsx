"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export default function AddDoctor() {
  const [name, setName] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [experience, setExperience] = useState("")
  const [qualifications, setQualifications] = useState("")
  const [bio, setBio] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !specialty || !experience || !qualifications || !bio) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }
    // Here you would typically send the data to your backend
    console.log({ name, specialty, experience, qualifications, bio })
    toast({
      title: "Doctor Added",
      description: "The new doctor has been successfully added to the system.",
    })
    // Reset form
    setName("")
    setSpecialty("")
    setExperience("")
    setQualifications("")
    setBio("")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow gradient-bg py-12">
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-4xl font-bold text-center mb-8 vibrant-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Add New Doctor
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Doctor Information</CardTitle>
                <CardDescription>Enter the details of the new doctor</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Dr. John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="specialty" className="text-sm font-medium">
                        Specialty
                      </label>
                      <Select value={specialty} onValueChange={setSpecialty}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a specialty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cardiology">Cardiology</SelectItem>
                          <SelectItem value="neurology">Neurology</SelectItem>
                          <SelectItem value="pediatrics">Pediatrics</SelectItem>
                          <SelectItem value="orthopedics">Orthopedics</SelectItem>
                          <SelectItem value="dermatology">Dermatology</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="experience" className="text-sm font-medium">
                        Years of Experience
                      </label>
                      <Input
                        id="experience"
                        type="number"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        placeholder="10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="qualifications" className="text-sm font-medium">
                        Qualifications
                      </label>
                      <Input
                        id="qualifications"
                        value={qualifications}
                        onChange={(e) => setQualifications(e.target.value)}
                        placeholder="MD, PhD, MBBS"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="bio" className="text-sm font-medium">
                        Bio
                      </label>
                      <Textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Brief description of the doctor's background and expertise"
                        rows={4}
                      />
                    </div>
                  </div>
                  <CardFooter className="flex justify-end mt-6">
                    <Button type="submit">Add Doctor</Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

