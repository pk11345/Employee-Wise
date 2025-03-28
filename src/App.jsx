import React from 'react'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import UserList from './components/UserList'

const App = () => {
  return (
   <>
   <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/UserList' element={<UserList/>}/>
   </Routes>
   </>
  )
}

export default App