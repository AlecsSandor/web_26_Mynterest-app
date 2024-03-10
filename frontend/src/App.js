import Home from './scenes/home/Home'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LogIn from './scenes/authentication/logIn/LogIn'
import SignUp from './scenes/authentication/signUp/SignUp'
import Auth from './scenes/authentication/Auth'
import Create from './scenes/create/Create'
import Pin from './scenes/pin/Pin'
import Profile from './scenes/profile/Profile'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

function App() {

  const storedCredentials = localStorage.getItem('credentials')
  let isAuth = false
  if (storedCredentials) {
    const { email, token } = JSON.parse(storedCredentials)
    isAuth = true
    // Dispatch an action to update the Redux store with the stored credentials
    console.log(isAuth)
  }
    

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={isAuth ? <Home /> : <Navigate to="/auth"/> } />
          <Route path="/auth" element={isAuth ? <Home/> : <Auth/>}/>
          <Route path="/create" element={isAuth ? <Create/> : <Auth/>}/>
          <Route path="/pin" element={isAuth ? <Pin/> : <Auth/>}/>
          <Route path="/profile" element={isAuth ? <Profile/> : <Auth/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
