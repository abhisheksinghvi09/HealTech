import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function MedicalTourism() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Medical Tourism</h1>
          <p className="text-center">
            Explore international treatment options with our upcoming medical tourism service. We're working on bringing
            you the best healthcare options from around the world.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

