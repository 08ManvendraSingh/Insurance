import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast';

const Home = () => {
  return (
    <>
        {/* <Header/> */}
        <Outlet/>
        {/* <Footer/> */}
        <Toaster />
    </>
  )
}

export default Home