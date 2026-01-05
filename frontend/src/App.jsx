import React from 'react'
import NavBar from './components/NavBar'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import { BrowserRouter, Routes, Route } from 'react-router'
import Requests from './components/Requests'
import { Provider } from 'react-redux'
import Main from './components/Main'
import EditProfile from './components/EditProfile'
import store from '../utils/store'
import Feed from './components/Feed'
import { Toaster } from 'sonner'
import DiscoverPeople from './components/DiscoverPeople'
import PublicProfile from './components/PublicProfile'
import Connections from './components/Connections'
import AllBlogs from './components/AllBlogs'
import AddBlog from './components/AddBlog'
import BlogContent from './components/BlogContent'
const App = () => {


  return (
    <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Main />}>
              <Route path='/' element={<Feed />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/edit' element={<EditProfile />} />
              <Route path='/requests' element={<Requests />} />
              <Route path='/connections' element={<Connections />} />
              <Route path='/suggested-people' element={<DiscoverPeople />} />
              <Route path='/profile/:id' element={<PublicProfile />} />
              <Route path='/blogs' element={<AllBlogs />} />
              <Route path='/blogs/add-blog' element={<AddBlog />} />
              <Route path='/blog/viewBlog/:id' element={<BlogContent/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster richColors />
    </Provider>
  )
}

export default App