"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import FeatureBox from "@/components/FeatureBox"
import Footer from "@/components/Footer"
import { Stethoscope, Pill, Calendar, Plane, Activity, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="py-20 vibrant-gradient text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="md:w-1/2 text-center md:text-left mb-8 md:mb-0"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to HealthCare Hub</h1>
                <p className="text-xl md:text-2xl mb-8">Your one-stop solution for all healthcare needs</p>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="#features">Explore Our Services</Link>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:w-1/2"
              >
                <Image
                  src="/placeholder.svg"
                  alt="AI-generated healthcare image"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-12 vibrant-text">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureBox
                title="Disease Detection"
                icon={<Stethoscope className="h-8 w-8" />}
                description="AI-powered disease detection and diagnosis"
                href="/disease-detection"
              />
              <FeatureBox
                title="Pharmacy"
                icon={<Pill className="h-8 w-8" />}
                description="Browse our extensive medicine catalog"
                href="/pharmacy"
              />
              <FeatureBox
                title="Online Pharmacy"
                icon={<ShoppingCart className="h-8 w-8" />}
                description="Order medicines online with home delivery"
                href="/online-pharmacy"
              />
              <FeatureBox
                title="Appointment Booking"
                icon={<Calendar className="h-8 w-8" />}
                description="Easy and quick appointment scheduling"
                href="/appointment-booking"
              />
              <FeatureBox
                title="Medical Tourism"
                icon={<Plane className="h-8 w-8" />}
                description="Explore international treatment options"
                href="/medical-tourism"
              />
              <FeatureBox
                title="Health Tracker"
                icon={<Activity className="h-8 w-8" />}
                description="Monitor and analyze your health metrics"
                href="/health-tracker"
              />
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-mint to-mint-dark">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <motion.h2
                  className="text-3xl font-semibold mb-4 text-teal"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Why Choose HealthCare Hub?
                </motion.h2>
                <motion.ul
                  className="list-disc list-inside space-y-2 text-teal-light"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <li>Cutting-edge AI-powered diagnostics</li>
                  <li>Seamless appointment booking system</li>
                  <li>Convenient online pharmacy services</li>
                  <li>Expert guidance for medical tourism</li>
                  <li>24/7 customer support</li>
                </motion.ul>
              </div>
              <motion.div
                className="md:w-1/2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/placeholder.svg"
                  alt="Healthcare professionals"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-semibold text-center mb-8 vibrant-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              What Our Patients Say
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="bg-white p-6 rounded-lg shadow-md hover-lift"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <p className="text-gray-600 mb-4">
                    "HealthCare Hub has revolutionized my healthcare experience. The ease of booking appointments and
                    accessing my medical records is unparalleled."
                  </p>
                  <p className="font-semibold text-teal">- John Doe</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

