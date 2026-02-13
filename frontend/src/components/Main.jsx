import NavBar from "./NavBar";
import { Outlet, useLocation, Navigate } from "react-router";
import Footer from "./Footer";
import axios from "axios";
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../../slice/userSlice";

const Main = () => {
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user)
  const location = useLocation()
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:3000/me/profile', { withCredentials: true })
        dispatch(addUser(res.data.user))
      } catch {
        dispatch(removeUser())
      } finally {
        setAuthLoading(false)
      }
    }
    checkAuth()
  }, [dispatch])

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register'
  if (!user && !isAuthRoute) {
    return <Navigate to="/login" replace />
  }
  if (user && isAuthRoute) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Main