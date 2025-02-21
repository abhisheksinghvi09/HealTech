import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import FeatureBox from "@/components/FeatureBox"
import { Stethoscope, Pill, Calendar, Plane } from "lucide-react"

export default function Services() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Our Services</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureBox
              title="Disease Detection"
              icon={<Stethoscope className="h-8 w-8" />}
              description="AI-powered disease detection and diagnosis"
              href="/disease-detection"
            />
            <FeatureBox
              title="Pharmacy"
              icon={<Pill className="h-8 w-8" />}
              description="Online pharmacy with home delivery"
              href="/pharmacy"
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

