import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';


export default function Protectrouters({ children }) {
  const token = localStorage.getItem('userToken');

  if (!token) { 
    return <Navigate to='/SignIn' replace/>
  }
  return children
}
