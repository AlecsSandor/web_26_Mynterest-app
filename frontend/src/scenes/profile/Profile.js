import React from 'react'
import { Box, MenuItem, Typography, Button } from '@mui/material'
import Navbar from '../../global/Navbar/Navbar.js'
import { profile_01, profile_02, profile_03 } from '../../assets'
import { alpha } from '@mui/material/styles'
import { theme } from '../../theme'
import { useState, useEffect } from 'react'
import PhotoGrid from '../../global/PhotoGrid/PhotoGrid.js'

const Profile = () => {
  const [usersEmail, setUsersEmail] = useState(null)
  const [seeSaved, setSeeSaved] = useState(true)

  useEffect(() => {
    const theEmail = JSON.parse(localStorage.getItem('credentials'))
    setUsersEmail(theEmail)
  }, [])

  const changeTabSaved = () => {
    setSeeSaved(true)
  }
  const changeTabCreated = () => {
    setSeeSaved(false)
  }

  return (
    <div>
      <Navbar />
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '80px',
        }}
      >
        <Box width='100%' paddingTop='50px'>
          <img
            src={profile_01}
            alt=''
            width='130px'
            height='130px'
            style={{ borderRadius: '80px' }}
          />
          <Typography sx={{ fontSize: '35px' }}>
            {usersEmail ? usersEmail.email.split('@')[0] : ''}
          </Typography>
          <Typography sx={{ fontFamily: 'Oxygen', fontSize: '13px' }}>
            {usersEmail ? usersEmail.email : ''}
          </Typography>
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='center'
            paddingY='20px'
            columnGap='20px'
          >
            <MenuItem
              sx={{
                borderRadius: '50px',
                backgroundColor: alpha(theme.palette.secondary.main, 0.35),
                paddingX: '2px',
                margin: '0px',
                '& :hover': { backgroundColor: 'none', color: 'black' },
              }}
            >
              <Button padding='0px' sx={{ color: 'black' }} disableRipple>
                Shared
              </Button>
            </MenuItem>
            <MenuItem
              sx={{
                borderRadius: '50px',
                backgroundColor: alpha(theme.palette.secondary.main, 0.35),
                paddingX: '2px',
                margin: '0px',
                '& :hover': { backgroundColor: 'none', color: 'black' },
              }}
            >
              <Button padding='0px' sx={{ color: 'black' }} disableRipple>
                Edit Profile
              </Button>
            </MenuItem>
          </Box>
        </Box>
        <Box
          display='flex'
          flexDirection='row'
          paddingTop='20px'
          paddingBottom='30px'
        >
          <MenuItem
            disableRipple
            sx={{
              borderRadius: '50px',
              backgroundColor: 'none',
              paddingX: '2px',
              margin: '0px',
              '& :hover': {},
            }}
          >
            <Button
              padding='0px'
              onClick={changeTabCreated}
              sx={{
                color: 'black',
                textDecoration: `${seeSaved ? 'none' : 'underline'}`,
              }}
              disableRipple
            >
              Created
            </Button>
          </MenuItem>
          <MenuItem
            disableRipple
            sx={{
              borderRadius: '50px',
              backgroundColor: 'none',
              paddingX: '2px',
              margin: '0px',
              '& :hover': {},
            }}
          >
            <Button
              padding='0px'
              onClick={changeTabSaved}
              sx={{
                color: 'black',
                textDecoration: `${seeSaved ? 'underline' : 'none'}`,
              }}
              disableRipple
            >
              Saved
            </Button>
          </MenuItem>
        </Box>
        <PhotoGrid query={seeSaved ? 'getSavedImages' : 'getCreatedPins'} />
      </div>
    </div>
  )
}

export default Profile
