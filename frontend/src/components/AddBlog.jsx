import React, { useEffect } from "react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import CheckUser from "./utils/CheckUser"
import axios from "axios"
import RichTextEditor from "./utils/RichTextEditor"



const AddBlog = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [tagInput, setTagInput] = useState('')
    const [tags, setTags] = useState([])
    const [allTags, setAllTags] = useState([])
    const [filteredTags, setFilteredTags] = useState([])

    useEffect(() => {
        const fetchTags = async () => {

            const res = await axios.get('http://51.20.5.6/api/tags')
            setAllTags(res.data.tags)
            console.log("TAGS", res.data.tags)
        }
        fetchTags()
    }, [])


    const sendData = async () => {
        try {
            const res = await axios.post('http://51.20.5.6/api/blog', { title, content, tags }, { withCredentials: true })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <CheckUser>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#050B1E] to-[#020617] px-4 py-20">
                <Card className="w-full max-w-xl border border-white/10 bg-white/5 backdrop-blur-md text-white">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Add Your Blog</CardTitle>
                        <CardDescription className="text-white/60">
                            Share your thoughts with the BlogChain community
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-5">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title" className="text-white/80">
                                Title
                            </Label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="Enter blog title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="content" className="text-white/80">
                                Content
                            </Label>
                            <textarea
                                id="content"
                                rows={6}
                                placeholder="Write your blog content here..."
                                value={content}
                                required
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full rounded-md bg-white/10 border border-white/20 p-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
                            />
                            {/* <RichTextEditor setContent={setContent} 
                            /> */}


                        </div>
                        <div className="flex flex-col gap-2 relative">
                            <Label className="text-white/80">
                                Tags (optional)
                            </Label>

                            <Input
                                type="text"
                                placeholder="Type a tag"
                                value={tagInput}
                                onChange={(e) => {
                                    const value = e.target.value.toLowerCase()
                                    setTagInput(value)
                                    setFilteredTags(
                                        allTags.filter(
                                            t =>
                                                t.name.includes(value) &&
                                                !tags.includes(t.name)
                                        )
                                    )
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        const value = tagInput.trim().toLowerCase()
                                        if (!value) return
                                        if (tags.includes(value)) return

                                        setTags([...tags, value])
                                        setTagInput("")
                                        setFilteredTags([])
                                    }
                                }}
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                            />

                            {filteredTags.length > 0 && (
                                <div className="absolute top-full mt-1 w-full bg-[#020617] border border-white/10 rounded-md z-10">
                                    {filteredTags.map(tag => (
                                        <div
                                            key={tag._id}
                                            onClick={() => {
                                                setTags([...tags, tag.name])
                                                setTagInput("")
                                                setFilteredTags([])
                                            }}
                                            className="px-3 py-2 hover:bg-white/10 cursor-pointer text-sm"
                                        >
                                            #{tag.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-sm cursor-pointer"
                                    onClick={() => setTags(tags.filter(t => t !== tag))}
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>

                    </CardContent>

                    <CardFooter>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={sendData}>
                            Publish Blog
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </CheckUser>
    )
}

export default AddBlog
