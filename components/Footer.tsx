import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">HealthCare Hub</h3>
            <p>Innovative healthcare solutions for a better tomorrow.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/disease-detection">Disease Detection</Link>
              </li>
              <li>
                <Link href="/pharmacy">Pharmacy</Link>
              </li>
              <li>
                <Link href="/appointment-booking">Appointment Booking</Link>
              </li>
              <li>
                <Link href="/medical-tourism">Medical Tourism</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <p>123 Healthcare Street</p>
            <p>Wellness City, HC 12345</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@healthcarehub.com</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p>&copy; 2023 HealthCare Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

