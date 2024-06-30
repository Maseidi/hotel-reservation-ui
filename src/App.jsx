import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './components/Signup'
import Signin from './components/Signin'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
