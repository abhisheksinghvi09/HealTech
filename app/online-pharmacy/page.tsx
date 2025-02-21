"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const medicines = [
  { id: 1, name: "Ibuprofen", category: "painkillers", price: 5.99, seller: "PharmaCo" },
  { id: 2, name: "Amoxicillin", category: "antibiotics", price: 12.99, seller: "MediLife" },
  { id: 3, name: "Fluoxetine", category: "antidepressants", price: 15.99, seller: "HealthPlus" },
  { id: 4, name: "Cetirizine", category: "antihistamines", price: 8.99, seller: "AllergyRelief" },
  { id: 5, name: "Metformin", category: "antidiabetics", price: 7.99, seller: "DiabetesCare" },
]

export default function OnlinePharmacy() {
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState([])

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const addToCart = (medicine) => {
    setCart([...cart, medicine])
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
            Online Pharmacy
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
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-3/4">
              <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="painkillers">Painkillers</TabsTrigger>
                  <TabsTrigger value="antibiotics">Antibiotics</TabsTrigger>
                  <TabsTrigger value="antidepressants">Antidepressants</TabsTrigger>
                  <TabsTrigger value="antihistamines">Antihistamines</TabsTrigger>
                  <TabsTrigger value="antidiabetics">Antidiabetics</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMedicines.map((medicine) => (
                      <MedicineCard key={medicine.id} medicine={medicine} addToCart={addToCart} />
                    ))}
                  </div>
                </TabsContent>
                {["painkillers", "antibiotics", "antidepressants", "antihistamines", "antidiabetics"].map(
                  (category) => (
                    <TabsContent key={category} value={category}>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredMedicines
                          .filter((medicine) => medicine.category === category)
                          .map((medicine) => (
                            <MedicineCard key={medicine.id} medicine={medicine} addToCart={addToCart} />
                          ))}
                      </div>
                    </TabsContent>
                  ),
                )}
              </Tabs>
            </div>
            <div className="md:w-1/4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Shopping Cart</span>
                    <Badge variant="secondary">{cart.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                  ) : (
                    <ul className="space-y-2">
                      {cart.map((item, index) => (
                        <li key={index} className="flex justify-between items-center">
                          <span>{item.name}</span>
                          <span>${item.price.toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full" disabled={cart.length === 0}>
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function MedicineCard({ medicine, addToCart }) {
  return (
    <Card className="hover-lift">
      <CardHeader>
        <CardTitle>{medicine.name}</CardTitle>
        <CardDescription>{medicine.seller}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold mb-4">${medicine.price.toFixed(2)}</p>
        <Button className="w-full" onClick={() => addToCart(medicine)}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  )
}

