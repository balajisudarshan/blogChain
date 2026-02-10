import NavBar from "./NavBar";
import { Outlet } from "react-router";
import Footer from "./Footer";
import axios from "axios";
import React, { useEffect } from 'react'
import { useSelector,useDispatch } from "react-redux";
import { addUser } from "../../slice/userSlice";


const Main = () => {
  const dispatch = useDispatch()
  const user = useSelector((store)=>store.user)

  const fetchUser = async()=>{
    if(user){
      return
    }
    const res =await axios.get('http://http://51.20.6.60/api/me/profile',{withCredentials:true})
    dispatch(addUser(res.data.user))
    console.log(res.data.user)
    console.log("User fetching")
  }

  useEffect(()=>{
    fetchUser()
  },[])
  return (
    <>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Main