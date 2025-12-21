import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState('')
  const [bio, setBio] = useState('')
  const [skillInput, setSkillInput] = useState('')
  const [skills, setSkills] = useState([])
  const baseUrl = 'http://localhost:3000'

  const handleSkillInput = (e) => {
    const value = e.target.value
    setSkillInput(value)
    const arr = value.split(',').map((s) => s.trim()).filter(Boolean)
    setSkills(arr)
  }

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${baseUrl}/api/auth/register`, {
        name,
        email,
        password,
        avatar,
        bio,
        skills,
      })
      toast.success(res.data.message)
    } catch (error) {
      toast.error('Registration failed')
      console.log(error)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-10'>
      <Toaster />
      <Card className='w-full max-w-xl'>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>Please register to continue</CardDescription>
        </CardHeader>
        <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col gap-2'>
            <Label className='text-md font-bold' htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label className='text-md font-bold' htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label className='text-md font-bold' htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label className='text-md font-bold' htmlFor="avatar">Avatar URL</Label>
            <Input
              id="avatar"
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label className='text-md font-bold' htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label className='text-md font-bold' htmlFor="skills">Skills (comma separated)</Label>
            <Input
              id="skills"
              type="text"
              value={skillInput}
              onChange={handleSkillInput}
            />
          </div>
          <div className='flex flex-col gap-2'>
            {skills.map((s, i) => (
              <Badge key={i}>{s}</Badge>
            ))}
          </div>

        </CardContent>
        <CardFooter>
          <div className='w-full'>
            <Button className='w-full cursor-pointer' type="button" onClick={handleSubmit}>
              Register
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Register