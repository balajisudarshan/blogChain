import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
const CheckUser = ({ children }) => {
    const user = useSelector((store) => store.user)
    const navigate = useNavigate()
    if (!user) {
        return (
            <div className='min-h-screen flex justify-center items-center'>     
                <h1 className='font-bold text-3xl'>Please login to view this page</h1>
                {navigate('/login')}
            </div>
        )
    }
    return children

}

export default CheckUser