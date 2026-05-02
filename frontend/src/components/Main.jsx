import NavBar from "./NavBar";
import { Outlet, useLocation, Navigate } from "react-router";
import Footer from "./Footer";
import axios from "axios";
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../../slice/userSlice";
import { LoadingCard } from "./ui/loading";

const Main = () => {
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user)
  const location = useLocation()
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/me/profile`, { withCredentials: true })
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
    return <LoadingCard message="Checking authentication..." />
  }

  const isPublicRoute = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register'
  if (!user && !isPublicRoute) {
    return <Navigate to="/login" replace />
  }
  if (user && (location.pathname === '/login' || location.pathname === '/register')) {
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
