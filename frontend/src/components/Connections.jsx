import React, { use } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import UserCard from './modules/UserCard'
import CardHolder from './CardHolder'
const Connections = () => {
  const [people, setPeople] = useState([])
  useEffect(() => {
    fetchPeople()
  }, [])
  const fetchPeople = async () => {
    try {
      const res = await axios.get('http://localhost:3000/connection/getConnections', { withCredentials: true })
      console.log(res.data.otherIds)
      setPeople(res.data.otherIds)
    } catch (error) {
      console.log(error)
    }


  }
  if(people.length === 0){
    return(
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-2xl font-semibold'>No connections found</p>
      </div>
    )
  }
  return (
    <div className='min-h-screen'>
      <CardHolder>
        {people.map((item) => (
          <UserCard item={item} />
        ))}
      </CardHolder>
    </div>
  )
}

export default Connections