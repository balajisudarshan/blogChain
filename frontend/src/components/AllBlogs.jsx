import React, { useEffect, useState } from "react"
import axios from "axios"
import BlogContainer from "./modules/BlogContainer"
import CheckUser from "./utils/CheckUser"
import { Card, CardContent } from "./ui/card"

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://51.20.6.60/api/blog", {
          withCredentials: true
        })
        setBlogs(res.data)
        console.log(res)
      } catch (error) {
        setBlogs([])
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardContent>
          <h1>Loading</h1>
        </CardContent>
      </Card>
    )
  }

  if (blogs.length === 0) {
    return <h1>No blogs found</h1>
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
