import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { removeUser } from '../../slice/userSlice'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"


const NavBar = () => {
  const [open, setOpen] = useState(false)
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logout = () => {
    dispatch(removeUser())
    navigate('/login')
  }



  const initials =
    user && user.name
      ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
      : "U"

  return (
    <nav className="w-full border-b bg-background/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto h-16 px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold tracking-tight font-nabla">
          BlogChain
        </Link>
        {user ? <div className="hidden md:flex items-center gap-8 font-medium">
          <DropdownMenu>
            <DropdownMenuTrigger className="hover:text-primary transition-colors cursor-pointer">
              Explore
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="mt-2 w-70 flex flex-col gap-3 py-3">
              <DropdownMenuItem asChild>
                <Link to="/suggested-people" className="font-bold ">People</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/blogs">Blogs</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link className="hover:text-primary transition-colors" to="/connections">
            Connections
          </Link>
          {/* <Link className="hover:text-primary transition-colors" to="/profile">
            Profile
          </Link> */}
          <Link className="hover:text-primary transition-colors" to="/requests">
            Requests
          </Link>
          <Link className="hover:text-primary transition-colors" to="/blogs/add-blog">
            Add Blog
          </Link>
          <Link className="hover:text-primary transition-colors" onClick={logout} >
            Logout
          </Link>
          <Link className="hover:text-primary transition-colors" to="/profile">

            <Avatar className="h-9 w-9 transition-all hover:ring-1  ring-offset-1">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </Link>
        </div> :
          <div className="hidden md:flex items-center gap-8 font-medium">
            <Link className="hover:text-accent transition-colors" to='/login'>Login</Link>
            <Link className="hover:text-accent transition-colors" to='/register'>Register</Link>
          </div>
        }


        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden">
            {open ? <X size={26} /> : <Menu size={26} />}
          </SheetTrigger>

          <SheetContent side="right" className="p-6">
            {user ? <div className="flex flex-col gap-6 text-lg mt-10 font-medium">
              <div className="flex flex-col gap-3">
                <span className="text-muted-foreground">Explore</span>
                <Link to="/suggested-people" onClick={() => setOpen(false)}>
                  People
                </Link>
                <Link to="/blogs" onClick={() => setOpen(false)}>
                  Blogs
                </Link>
              </div>

              <Link to="/connections" onClick={() => setOpen(false)}>
                Connections
              </Link>
              <Link to="/profile" onClick={() => setOpen(false)}>
                Profile
              </Link>
              <Link to="/requests" onClick={() => setOpen(false)}>
                Requests
              </Link>
              <Link onClick={() => { setOpen(false), logout() }}>
                Logout
              </Link>

              <div className="pt-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </div>
            </div> : <div className="flex flex-col gap-6 font-medium text-lg mt-10 ">
              <Link className="hover:bg-accent hover:p-1 transition-all rounded " to='/login'>Login</Link>
              <Link className="hover:bg-accent hover:p-1 transition-all rounded " to='/register'>Register</Link>
            </div>}

          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

export default NavBar
