import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Badge } from './ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Link } from 'react-router'
const BlogContent = () => {
  const [blogContent, setBlogContent] = useState({})
  useEffect(() => {
    const fetchBlogContent = async () => {
      try {
        const res = await axios.get(`http://51.20.6.60/api/blog/viewblog/${id}`, { withCredentials: true })
        console.log(res.data.result)
        setBlogContent(res.data.result)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBlogContent()
  }, [])
  const { id } = useParams();
  console.log(id)
  return (
    <div className='min-h-screen max-w-4xl mx-auto px-4 py-10'>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold uppercase">
            {blogContent.title}
          </CardTitle>
          <p className='text-sm text-muted-foreground'>{new Date(blogContent.createdAt).toDateString()}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: blogContent.content }}
          />
          <div className="flex gap-2 flex-wrap pt-4">
            {blogContent.tags?.map(tag => (
              <Badge key={tag} variant="secondary">
                #{tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className='flex items-center gap-70px'>
            <Link to={`/profile/${blogContent?.author?._id}`}>
              <Avatar>
                <AvatarImage src={blogContent?.author?.avatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>{blogContent?.author?.name}</p>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default BlogContent