import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router"
import { Badge } from "../ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"

const BlogContainer = ({ blogs }) => {
  const user = useSelector((store) => store.user)

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Link
            key={blog._id}
            to={`/blog/viewBlog/${blog._id}`}
            className="group"
          >
            <div className="h-full rounded-2xl border border-border bg-card p-6 transition hover:shadow-lg hover:-translate-y-1">
              
              {/* Author */}
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={blog.author?.avatar} />
                  <AvatarFallback>
                    {blog.author?.name?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>

                <div className="leading-tight">
                  <p className="text-sm font-medium">
                    {blog.author?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {blog.author?._id === user?._id && (
                  <Badge variant="secondary" className="ml-auto">
                    Your Blog
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h2 className="text-lg font-semibold leading-snug line-clamp-3 group-hover:underline">
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
