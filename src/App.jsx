import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from './views/Auth'
import { PRODUCTS, SUBMIT_PRODUCT, SUBMIT_USER, USERS } from '../util/constants'
import Admin from './views/Admin'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/users" element={<Admin operation={USERS}/>} />
        <Route path="/admin/users/submit" element={<Admin operation={SUBMIT_USER}/>} />
        <Route path="/admin/products" element={<Admin operation={PRODUCTS}/>} />
        <Route path="/admin/products/submit" element={<Admin operation={SUBMIT_PRODUCT} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
