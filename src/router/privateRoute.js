import * as React from 'react'
import { Navigate } from 'react-router-dom'
const isAuthenticated = require('../utils/isAuthenticated')

const PrivateRoute = ({ children }) => {

  return isAuthenticated() ? children : <Navigate to="/" />

}


export default PrivateRoute;