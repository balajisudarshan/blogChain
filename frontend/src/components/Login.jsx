import React, { useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router' // fixed: 'react-router' → 'react-router-dom'
import { addUser } from '../../slice/userSlice'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
// import { socket } from '../socket.js'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  async function submitForm() {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/auth/login',
        { email, password },
        { withCredentials: true }
      )
      toast.success(res.data?.message)
      dispatch(addUser(res.data.user))
      // socket.emit("register",res.data.user._id)
      navigate('/profile')
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed'
      toast.error(msg)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Toaster />

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>Please login to continue</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); submitForm(); }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center gap-3">
          <p className="text-sm text-muted-foreground">Don't have an account?</p>
          <Button asChild variant="outline" className="w-full">
            <Link to="/register">Register</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login