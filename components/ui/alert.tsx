import React from "react"

interface AlertProps {
  title: string
  description: string
  variant?: "default" | "destructive"
}

export const Alert: React.FC<AlertProps> = ({ title, description, variant = "default" }) => {
  const variantStyles = variant === "destructive" 
    ? "bg-red-50 border border-red-200 text-red-700" 
    : "bg-green-50 border border-green-200 text-green-700"

  return (
    <div className={`p-4 rounded-md ${variantStyles}`}>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm mt-1">{description}</p>
    </div>
  )
}

export const AlertTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-lg font-bold">{children}</h3>
)

export const AlertDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm mt-1">{children}</p>
)
