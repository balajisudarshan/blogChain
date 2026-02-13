import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const CheckUser = ({ children }) => {
  const user = useSelector((store) => store.user)

  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default CheckUser