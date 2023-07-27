import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { AllTasks } from './components/AllTasks';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { ToastContainer } from 'react-toastify';
import { PrivateRoute } from './components/PrivateRoute';






function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<PrivateRoute />}>
            <Route path='/' element={<AllTasks />}/>
          </Route>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
  
}

export default App
