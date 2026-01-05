import React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { useSelector } from "react-redux"
import { Badge } from "../ui/badge"
import { Link } from "react-router"

const BlogContainer = ({ blogs }) => {
    const user = useSelector((store) => store.user)

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex gap-5 overflow-x-auto pb-4 md:flex-wrap md:overflow-visible md:gap-6 scrollbar-hide">
                {blogs.map((blog, index) => (
                    <Link to={`/blog/viewBlog/${blog._id}`} className="w-full">
                        <div
                            key={blog._id}
                            className={`shrink-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 transition cursor-pointer flex flex-col justify-between
                        ${index === 0
                                    ? "w-[85%] md:w-[65%]"
                                    : index === 1
                                        ? "w-[75%] md:w-[32%]"
                                        : "w-[70%] md:w-[40%]"
                                }
                        hover:scale-[1.02]`}
                        >
                            <div className="flex items-center gap-4">
                                <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                                    <AvatarImage src={blog.author?.avatar || ""} />
                                    <AvatarFallback className="bg-white/20 text-white">
                                        {blog.author?.name?.[0] || "U"}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex-1 flex justify-between items-center">
                                    <div>
                                        <p className="text-white font-medium">
                                            {blog.author?.name}
                                        </p>
                                        <p className="text-sm text-white/50">
                                            {new Date(blog.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    {blog.author?._id === user?._id && (
                                        <Badge variant="secondary">Your Blog</Badge>
                                    )}
                                </div>
                            </div>

                            <h2 className="text-xl font-semibold text-white mt-4 line-clamp-3">
                                {blog.title}
                            </h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default BlogContainer
