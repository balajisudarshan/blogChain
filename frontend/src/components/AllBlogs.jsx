import React, { useEffect, useState } from "react"
import axios from "axios"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import BlogContainer from "./modules/BlogContainer"
import { useSelector } from "react-redux"
import CheckUser from "./utils/CheckUser"

const AllBlogs = () => {
    const [blogs, setBlogs] = useState([])


    useEffect(() => {
        const fetchBlogs = async () => {
            const res = await axios.get("http://localhost:3000/blog",{withCredentials:true})
            setBlogs(res.data)
        }
        fetchBlogs()
    }, [])

    return (
        <CheckUser>
            <div className="min-h-screen bg-gradient-to-b from-[#050B1E] to-[#020617] px-6 py-10">
                <h1 className="text-3xl font-bold text-center text-white mb-12">
                    All Blogs
                </h1>
                <BlogContainer blogs={blogs} />
                {/* <div className="max-w-4xl mx-auto space-y-6">
                {blogs.map((blog) => (
                    <div
                        key={blog._id}
                        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:bg-white/10 transition cursor-pointer"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                                <AvatarImage src={blog.author?.avatar || ""} />
                                <AvatarFallback className="bg-white/20 text-white">
                                    {blog.author?.name?.[0] || "U"}
                                </AvatarFallback>
                            </Avatar>

                            <div>
                                <p className="text-white font-medium">
                                    {blog.author?.name}
                                </p>
                                <p className="text-sm text-white/50">
                                    {new Date(blog.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <h2 className="text-xl font-semibold text-white mb-2">
                            {blog.title}
                        </h2>


                    </div>
                ))}
            </div> */}
            </div>
        </CheckUser>
    )
}

export default AllBlogs
