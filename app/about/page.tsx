"use client"

import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="py-20 vibrant-gradient text-white">
          <div className="container mx-auto px-4">
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About HealthCare Hub
            </motion.h1>
            <motion.p
              className="text-xl text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Revolutionizing healthcare through innovative technology and compassionate service.
            </motion.p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-semibold mb-4 vibrant-text">Our Mission</h2>
                <p className="text-gray-600 mb-4">
                  At HealthCare Hub, we're on a mission to make quality healthcare accessible to everyone. We believe in
                  leveraging cutting-edge technology to improve patient outcomes and streamline healthcare processes.
                </p>
                <p className="text-gray-600">
                  Our platform brings together AI-powered diagnostics, telemedicine, and comprehensive health management
                  tools to provide a holistic healthcare experience.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Image
                  src="/placeholder.svg"
                  alt="Our mission"
                  width={500}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-mint to-mint-dark">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-12 text-teal">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Innovation", description: "Constantly pushing the boundaries of healthcare technology" },
                { title: "Compassion", description: "Putting patients first in everything we do" },
                { title: "Integrity", description: "Maintaining the highest standards of ethics and transparency" },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover-lift h-full">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-teal">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-12 vibrant-text">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { name: "Dr. Jane Smith", role: "Chief Medical Officer", image: "/placeholder.svg" },
                { name: "John Doe", role: "Chief Technology Officer", image: "/placeholder.svg" },
                { name: "Emily Brown", role: "Head of Patient Care", image: "/placeholder.svg" },
                { name: "Michael Johnson", role: "Lead AI Researcher", image: "/placeholder.svg" },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
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

