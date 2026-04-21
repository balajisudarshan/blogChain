import React from "react"

const LoadingSpinner = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin`}></div>
    </div>
  )
}

const LoadingCard = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#050B1E] to-[#020617]">
      <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10">
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="text-white/80 text-center">{message}</p>
      </div>
    </div>
  )
}

export { LoadingSpinner, LoadingCard }