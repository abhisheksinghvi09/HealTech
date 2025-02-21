"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"

const medicineCategories = [
  { id: "painkillers", name: "Painkillers" },
  { id: "antibiotics", name: "Antibiotics" },
  { id: "antidepressants", name: "Antidepressants" },
  { id: "antihistamines", name: "Antihistamines" },
  { id: "antidiabetics", name: "Antidiabetics" },
]

const medicines = [
  { id: 1, name: "Ibuprofen", category: "painkillers", price: 5.99, seller: "PharmaCo" },
  { id: 2, name: "Amoxicillin", category: "antibiotics", price: 12.99, seller: "MediLife" },
  { id: 3, name: "Fluoxetine", category: "antidepressants", price: 15.99, seller: "HealthPlus" },
  { id: 4, name: "Cetirizine", category: "antihistamines", price: 8.99, seller: "AllergyRelief" },
  { id: 5, name: "Metformin", category: "antidiabetics", price: 7.99, seller: "DiabetesCare" },
]

export default function Pharmacy() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
            Pharmacy
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative">
              <Input
                type="text"
                placeholder="Search medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </motion.div>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              {medicineCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMedicines.map((medicine) => (
                  <MedicineCard key={medicine.id} medicine={medicine} />
                ))}
              </div>
            </TabsContent>
            {medicineCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMedicines
                    .filter((medicine) => medicine.category === category.id)
                    .map((medicine) => (
                      <MedicineCard key={medicine.id} medicine={medicine} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function MedicineCard({ medicine }) {
  return (
    <Card className="hover-lift">
      <CardHeader>
        <CardTitle>{medicine.name}</CardTitle>
        <CardDescription>{medicine.seller}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold mb-4">${medicine.price.toFixed(2)}</p>
        <Button className="w-full">Add to Cart</Button>
      </CardContent>
    </Card>
  )
}

