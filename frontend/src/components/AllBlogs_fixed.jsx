import React, { useEffect, useState } from "react"
import axios from "axios"
import BlogContainer from "./modules/BlogContainer"
import CheckUser from "./utils/CheckUser"
import { Card, CardContent } from "./ui/card"

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/blog`, {
          withCredentials: true
        })
        setBlogs(res.data)
      } catch (error) {
        setError('Failed to load blogs')
        setBlogs([])
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#050B1E] to-[#020617] px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-white mb-12">
            All Blogs
          </h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 animate-pulse">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div className="space-y-2 flex-1">
                    <div className="w-32 h-4 bg-gray-300 rounded"></div>
                    <div className="w-24 h-3 bg-gray-300 rounded"></div>
                  </div>
                </div>
                <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-3/4 h-4 bg-gray-300 rounded mb-4"></div>
                <div className="flex space-x-2">
                  <div className="w-16 h-6 bg-gray-300 rounded-full"></div>
                  <div className="w-20 h-6 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#050B1E] to-[#020617] px-6 py-10 flex items-center justify-center">
        <Card className="bg-red-500/10 border-red-500/20">
          <CardContent className="p-6 text-center">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-red-400 mb-2">Oops!</h2>
            <p className="text-red-300">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (blogs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#050B1E] to-[#020617] px-6 py-10 flex items-center justify-center">
        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-semibold text-white mb-2">No blogs yet</h2>
            <p className="text-white/60">Be the first to share your thoughts!</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <CheckUser>
      <div className="min-h-screen bg-gradient-to-b from-[#050B1E] to-[#020617] px-6 py-10">
        <h1 className="text-3xl font-bold text-center text-white mb-12">
          All Blogs
        </h1>
        <BlogContainer blogs={blogs} />
      </div>
    </CheckUser>
  )
}

export default AllBlogs
