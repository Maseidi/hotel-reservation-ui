import React from 'react'
import AdminMenu from '../components/AdminMenu'
import { USERS } from '../../util/constants'
import Users from '../components/Users'

const Admin = ({operation}) => {
  return <div className='flex'>
    <AdminMenu/>
    { operation == USERS &&  <Users/>}
  </div>
}

export default Admin
