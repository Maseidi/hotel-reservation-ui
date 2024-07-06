import React from 'react'
import AdminMenu from '../components/AdminMenu'
import {
  PRODUCTS,
  SHOW_PRODUCT,
  SHOW_USER,
  SUBMIT_PRODUCT,
  SUBMIT_USER,
  UPDATE_PRODUCT,
  UPDATE_USER,
  USERS
} from '../../util/constants'
import Users from '../components/Users'
import SubmitUser from '../components/SubmitUser'
import UserDetails from '../components/UserDetails'
import UpdateUser from '../components/UpdateUser'
import Products from '../components/Products'
import SubmitProduct from '../components/SubmitProduct'
import ProductDetails from '../components/ProductDetails'
import UpdateProduct from '../components/UpdateProduct'

const Admin = ({ operation }) => {
  return (
    <div className="flex">
      <AdminMenu />
      {operation == USERS && <Users />}
      {operation == SUBMIT_USER && <SubmitUser />}
      {operation == SHOW_USER && <UserDetails />}
      {operation == UPDATE_USER && <UpdateUser />}
      {operation == PRODUCTS && <Products />}
      {operation == SUBMIT_PRODUCT && <SubmitProduct />}
      {operation == SHOW_PRODUCT && <ProductDetails/>}
      {operation == UPDATE_PRODUCT && <UpdateProduct />}
    </div>
  )
}

export default Admin
