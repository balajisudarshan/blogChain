import React from 'react'
import axios from 'axios'
import { Avatar,AvatarFallback,AvatarImage } from '../ui/avatar'
import { Card } from '../ui/card'
import { Link } from 'react-router'
import { Button } from '../ui/button'

const UserCard = ({item}) => {
    return (
        <Card key={item._id} className='flex flex-col items-center p-4 rounded-xl shadow-md hover:shadow-lg transition'>
            <Avatar className='w-16 h-16 mb-3'>
                <AvatarImage src={item.avatar} />
                <AvatarFallback>{item.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className='font-semibold text-lg'>{item.name}</h2>
            <p className='text-sm text-gray-500'>{item.bio || 'No bio available'}</p>
            
            
        </Card>
    )
}

export default UserCard