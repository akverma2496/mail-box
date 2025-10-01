import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router'

const ProtectedRoute = () => {
    const isLoggedIn =  useSelector(state => state.auth.isLoggedIn)
    return isLoggedIn ? <Outlet /> : <Navigate to="/" />; 
}

export default ProtectedRoute