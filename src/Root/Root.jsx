import React from 'react'
import Navbar from '../componets/Navbar'
// import Footer from '../componets/Footer'
import { Outlet } from 'react-router-dom'

export default function root() {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  )
}
