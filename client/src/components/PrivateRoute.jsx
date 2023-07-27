import { Navigate, Outlet } from "react-router-dom";

import React from 'react'

export const PrivateRoute = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    
  return (
    user?.username ? <Outlet /> : <Navigate to='/login' replace />
  )
}




