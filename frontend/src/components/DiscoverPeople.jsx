import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'

import UserCard from './modules/UserCard'
import { Link } from 'react-router'

const DiscoverPeople = () => {
    const [suggestedPeople, setSuggestedPeople] = useState([])

    const fetchPeople = async () => {
        try {
            const res = await axios.get('http://localhost:3000/connection/people/suggestions', { withCredentials: true })
            setSuggestedPeople(res.data.people)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPeople()
    }, [])

    // const handleConnect = async () => {
    //     try {
    //         const res = await axios.post('http://localhost:3000/connection/like/692bcd0bbaef054286ef3d64')
    //     } catch (error) {

    //     }
    // }
    if (suggestedPeople.length === 0) {
        return (
            <div className='min-h-screen'>
                <h1 className='text-2xl text-center mt-10 font-extrabold'>No new people found</h1>
            </div>
        )
    }

    return (
        <div className='min-h-screen'>
            <h1 className='text-2xl text-center mt-10 font-extrabold'>Discover People</h1>

            <div className='max-w-3xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {suggestedPeople.map((item) => (
                    <Link to={`/profile/${item._id}`}>
                        <UserCard item={item} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default DiscoverPeople
