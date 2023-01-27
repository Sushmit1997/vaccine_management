import * as React from 'react'
import { Navigate } from 'react-router-dom'



const PrivateRoute = ({ children }) => {

  const isAuthenticated = () => {
    let isAuthenticated = false

    const token = localStorage.getItem('token')
    if (token) {
      isAuthenticated = true
    }
    return isAuthenticated
  }

  return isAuthenticated() ? children : <Navigate to="/" />

}


export default PrivateRoute