"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface FeatureBoxProps {
  title: string
  icon: React.ReactNode
  description: string
  href: string
}

export default function FeatureBox({ title, icon, description, href }: FeatureBoxProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="hover-lift"
      >
        <Card className="h-full">
          <CardHeader>
            <motion.div
              className="flex justify-center items-center mb-4 text-primary"
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {icon}
            </motion.div>
            <CardTitle className="text-center">{title}</CardTitle>
            <CardDescription className="text-center">{description}</CardDescription>
          </CardHeader>
        </Card>
      </motion.div>
    </Link>
  )
}

