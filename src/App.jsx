import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from './views/Auth'
import Hotels from './views/Hotels'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/hotels" element={<Hotels />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
