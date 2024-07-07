import React from 'react'
import AdminMenu from '../components/AdminMenu'
import { Outlet } from 'react-router-dom'

const Admin = () => {
  return <div className='flex'>
    <AdminMenu/>
    <div className='w-72 h-[100vh]'></div>
    <Outlet/>
  </div>
}

export default Admin
