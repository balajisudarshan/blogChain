import React from 'react'
import { Link } from "react-router"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react'
import axios from 'axios'
const ProfileCard = ({ user, isMine }) => {
    const [count, setCount] = useState(0)
    const [reqType, setReqType] = useState('')
    const [postsLength,setPostsLength] = useState(0)
    const [posts,setPosts] = useState([])
    const fetchCount = async () => {
        try {
            const res = isMine ?
                await axios.get('http://http://51.20.6.60/api/connection/count', { withCredentials: true })
                :
                await axios.get(`http://http://51.20.6.60/api/connection/count/${user._id}`, { withCredentials: true })
            console.log("res", res.data.count)
            setCount(res.data.count)
        } catch (error) {
            console.log(error)
        }
    }
    // const fetchBlogs = async()=>{
    //     try {
    //         const res = isMine ? await axios.get("http://http://51.20.6.60/api/blog/my",{withCredentials:true})
    //         :await axios.get(`http://http://51.20.6.60/api/blog/user/${user._id}`)

    //         setPostsLength(res.data.length)
    //         setPosts(res.data)
    //         console.log("Blog",res.data)
    //     } catch (error) {
            
    //     }
    // }
    const checkConnectionExist = async()=>{
        try {
            // const existing = await axios.get(`http://http://51.20.6.60/api/connection/check/${user._id}`,{withCredentials:true})
            // console.log("Existing"+existing);
            console.log("User"+user.name)
        } catch (error) {
            console.log("Existing"+error)
        }
    }
    useEffect(() => {
        fetchCount()
        checkConnectionExist()
    }, [])
    // useEffect(()=>{
    //     fetchBlogs()
    // },[isMine,user?._id])


    const sendRequest = async (req) => {
        try {
            console.log(req)
            console.log(user._id)
            const res = await axios.post(`http://http://51.20.6.60/api/connection/${req}/${user._id}`, {}, { withCredentials: true })
            console.log(res)
            setReqType(req)
        } catch (error) {
            console.log(error)
        }


    }
    const initials =
        user.name && typeof user.name === "string"
            ? user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
            : "U"
    return (
        <div>
            <div className="grid md:grid-cols-3 gap-6">

                <Card className="md:col-span-1">
                    <CardHeader className="flex items-center gap-4">
                        <Avatar>
                            
                            <AvatarImage src={user.avatar || ""} alt={user.name + " Avatar"} />
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>{user.name}</CardTitle>
                            <CardTitle>{user.id}</CardTitle>
                            <CardDescription>{user.email}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {user.bio && <p>{user.bio}</p>}
                        {isMine &&
                            <Button asChild>
                                <Link to="/edit">Edit Profile</Link>
                            </Button>
                        }
                        {!isMine && (
                            reqType === '' ? (
                                <div className='flex gap-2'>
                                    <Button
                                        className='bg-green-600/10 text-green-600'
                                        onClick={() => sendRequest('like')}
                                    >
                                        Connect
                                    </Button>
                                    <Button
                                        className='bg-destructive/10 text-destructive'
                                        onClick={() => sendRequest('ignore')}
                                    >
                                        Ignore
                                    </Button>
                                </div>
                            ) : (
                                <Badge className="bg-blue-600/10 text-blue-600">
                                    Request Sent
                                </Badge>
                            )
                        )}

                    </CardContent>
                </Card>

                <div className="md:col-span-2 grid gap-6">

                    <Card>
                        <CardHeader>
                            <CardTitle>Skills</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {user.skills && user.skills.length > 0 ? (
                                user.skills.map((skill, i) => <Badge key={i}>{skill}</Badge>)
                            ) : (
                                <p>No skills added.</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {isMine &&
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p>{user.email}</p>
                                </div>
                            }
                            <div>
                                <p className="text-sm text-muted-foreground">Member Since</p>
                                <p>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Activity</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <p className="text-sm text-muted-foreground">Connections</p>
                                <p>{count}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Posts</p>
                                <p>{postsLength}</p>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
            
        </div>
    )
}

export default ProfileCard