import React from 'react'
import {
  Box,
  Typography,
} from '@mui/material'
import SignUp from './signUp/SignUp'
import LogIn from './logIn/LogIn'
import { useState } from 'react'
import { loginBackground, veswip } from '../../assets'

const Auth = () => {
  const [signUp, setSignUp] = useState(1)

  const handleSwitchClick = () => {
    if (signUp) {
      setSignUp(0)
    } else {
      setSignUp(1)
    }
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundSize: 'cover',
        backgroundPosition: '75% 25%',
        backgroundImage: `url(${loginBackground})`,
        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.7)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        
          width: '400px',
          minWidth: '250px',
          boxShadow: '0px 0px 30px rgba(10,10,10,0.2)',
          borderRadius: '30px',
          display: 'flex',
          flexDirection: 'column',
          justifyItems: 'center',
          justifyContent: 'center',
          background: 'white',
        }}
      >
        <Box
          paddingTop='40px'
        >
          <img src={veswip} alt='' style={{height: '40px'}}/>
        </Box>
        <Box>
          <Typography fontSize='25px' fontWeight='bold' paddingTop='20px'>
            Welcome to Mynterest
          </Typography>
          <Typography fontWeight='regular' paddingX='10px' paddingTop='10px'>
            Find new fashion ideas
          </Typography>
        </Box>
        {signUp ? <SignUp /> : <LogIn />}

        <Typography fontSize='10px' fontFamily='Oxygen' fontWeight='200' >By continuing, you agree to Mynterest's<br/>Terms of Service and acknowledge that you've<br/>read our Privacy Policy. Notice at collection.</Typography>
        <Box
          display='flex'
          flexDirection='row'
          justifyContent='space-around'
          paddingY='20px'
          paddingX='100px'
        >
          <Typography fontSize='11px'>{ signUp ? 'Already a member?' : 'Create an account!'}</Typography>
          <Typography
            onClick={handleSwitchClick}
            fontWeight='bold'
            fontSize='11px'
            style={{cursor:'pointer'}}
          >{ signUp ? 'Log in' : 'Sign up'}</Typography>
        </Box>
      </Box>
    </div>
  )
}

export default Auth
