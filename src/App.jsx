import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from './views/Auth'
import Users from './components/Users'
import UserDetails from './components/UserDetails'
import SubmitUser from './components/SubmitUser'
import UpdateUser from './components/UpdateUser'
import Products from './components/Products'
import ProductDetails from './components/ProductDetails'
import SubmitProduct from './components/SubmitProduct'
import UpdateProduct from './components/UpdateProduct'
import Admin from './views/Admin'
import Archive from './views/Archive'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Product from './views/Product'

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/archive" element={<Archive />}/>
          <Route path="/archive/:slug" element={<Product />}/>
          <Route path="/admin" element={<Admin />}>
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UserDetails />} />
            <Route path="users/submit" element={<SubmitUser />} />
            <Route path="users/edit/:id" element={<UpdateUser />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route path="products/submit" element={<SubmitProduct />} />
            <Route path="products/edit/:id" element={<UpdateProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  )
}

export default App
