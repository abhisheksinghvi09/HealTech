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

export default function AddMedicine() {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [manufacturer, setManufacturer] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !category || !price || !manufacturer || !description) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }
    // Here you would typically send the data to your backend
    console.log({ name, category, price, manufacturer, description })
    toast({
      title: "Medicine Added",
      description: "The new medicine has been successfully added to the system.",
    })
    // Reset form
    setName("")
    setCategory("")
    setPrice("")
    setManufacturer("")
    setDescription("")
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
            Add New Medicine
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Medicine Information</CardTitle>
                <CardDescription>Enter the details of the new medicine</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Medicine Name
                      </label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Aspirin"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="category" className="text-sm font-medium">
                        Category
                      </label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="painkillers">Painkillers</SelectItem>
                          <SelectItem value="antibiotics">Antibiotics</SelectItem>
                          <SelectItem value="antidepressants">Antidepressants</SelectItem>
                          <SelectItem value="antihistamines">Antihistamines</SelectItem>
                          <SelectItem value="antidiabetics">Antidiabetics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="price" className="text-sm font-medium">
                        Price
                      </label>
                      <Input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="manufacturer" className="text-sm font-medium">
                        Manufacturer
                      </label>
                      <Input
                        id="manufacturer"
                        value={manufacturer}
                        onChange={(e) => setManufacturer(e.target.value)}
                        placeholder="e.g., Bayer"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="description" className="text-sm font-medium">
                        Description
                      </label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Brief description of the medicine, its uses, and potential side effects"
                        rows={4}
                      />
                    </div>
                  </div>
                  <CardFooter className="flex justify-end mt-6">
                    <Button type="submit">Add Medicine</Button>
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

