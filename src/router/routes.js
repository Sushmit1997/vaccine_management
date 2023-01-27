import * as React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage, HomePage } from '../pages';
import PrivateRoute from './privateRoute';


const RouterComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouterComponent