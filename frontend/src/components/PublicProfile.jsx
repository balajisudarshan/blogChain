import React from 'react'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ProfileCard from './modules/ProfileCard'
import CheckUser from './utils/CheckUser'
const PublicProfile = () => {
    const [user, setUser] = useState([])

    const { id } = useParams()

    useEffect(() => {
        fetchProfile()
    }, [id])

    const fetchProfile = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/connection/${id}`, { withCredentials: true })
            console.log(res.data.user)
            setUser(res.data.user)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='p-5'>
            <CheckUser>
                <ProfileCard user={user} />
            </CheckUser>
        </div>
    )
}

export default PublicProfile