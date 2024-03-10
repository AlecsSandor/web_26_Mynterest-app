import React from 'react'
import PhotoGrid from '../../global/PhotoGrid/PhotoGrid.js'
import Navbar from '../../global/Navbar/Navbar.js'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { styled, alpha } from '@mui/material/styles'
import {
  Box,
  Link,
  MenuItem,
  Typography,
  Button,
  Menu,
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { deleteSavedPin, savePin } from '../../services/dataServices.js'
import { setSavedItems, updateSavedItems } from '../../state/itemsSlice.js'

const Home = () => {
  const userSavedItems = useSelector((state) => state.items.savedItems)
  const item = useSelector((state) => state.items.visitingItem)
  const dispatch = useDispatch()
  const [userId, setUserId] = useState(null)

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 20,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light'
          ? 'rgb(55, 65, 81)'
          : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }))

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClose = async (event) => {
    event.stopPropagation()
    setAnchorEl(null)
  }

  const handleClick = (event) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const [isSaved, setIsSaved] = useState(false)

  const handleSave = async (event) => {
    let _id = item[item.length - 1]._id
    event.stopPropagation()
    if (userSavedItems.includes(_id)) {
      const indexToRemove = userSavedItems.indexOf(_id)
      const newItemsArray = userSavedItems.map(item => item)
      newItemsArray.splice(indexToRemove, 1)
      dispatch(setSavedItems(newItemsArray))
      setIsSaved(false)

      const body = JSON.stringify({
        userID: userId,
        itemID: _id,
      })
      const response = await deleteSavedPin(body)
      if (response) {
        console.log('Pin Deleted')
      } else {
        console.log('Pin not deleted')
      }
    } else {
      const body = JSON.stringify({
        userID: userId,
        itemID: _id,
      })
      setIsSaved(true)
      dispatch(updateSavedItems(_id))
      const response = await savePin(body)
      if (response) {
        console.log('Pin Saved')
      } else {
        console.log('Pin not saved')
      }
    }
    
  }

  useEffect = (() => {
    const credentials = JSON.parse(localStorage.getItem('credentials'))
    setUserId(credentials.uid)
    if (userSavedItems.includes(item._id)) {
      setIsSaved(true)
    }
  })

  return (
    <div>
      <Navbar />
      <div
        style={{
          backgroundColor: '#FFFFFF',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '110px',
        }}
      >
        <Box
          sx={{
            boxShadow: '0px 0px 10px rgba(10,10,10,0.1)',
            borderRadius: '30px',
            display: 'flex',
            flexDirection: 'column',
            justifyItems: 'center',
            justifyContent: 'center',
            background: 'white',
            maxWidth: '60%',
          }}
        >
          <Box
            display='flex'
            flexDirection='row'
            alignItems='space-around'
            justifyContent='space-around'
          >
            <Box padding='0px'>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={item[item.length - 1].url}
                  alt=''
                  style={{
                    borderRadius: '30px 0px 0px 30px',
                    maxWidth: '400px',
                  }}
                />
              </Box>
            </Box>

            <Box display='flex' flexDirection='column' overflow='hidden'>
              <Box padding='50px' overflow='hidden'>
                <Box
                  width='100%'
                  display='flex'
                  flexDirection='row'
                  justifyContent='flex-end'
                  paddingY='20px'
                  paddingLeft='160px'
                  columnGap='10px'
                >
                  <MenuItem sx={{ borderRadius: '50px', padding: '8px' }}>
                    <Button
                      disableRipple
                      onClick={handleClick}
                      sx={{
                        color: 'black',
                        padding: '0px',
                        minWidth: '0px',
                      }}
                    >
                      Your board
                      <KeyboardArrowDownIcon sx={{ padding: '0px' }} />
                    </Button>
                  </MenuItem>
                  <StyledMenu
                    id='demo-customized-menu'
                    MenuListProps={{
                      'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <Box paddingX='20px' paddingY='10px'>
                      <Typography
                        fontWeight='400'
                        fontFamily='Oxygen'
                        fontSize='12px'
                        paddingY='10px'
                      >
                        Choose where to save it
                      </Typography>
                      <MenuItem
                        //onClick={handleLogOut}
                        disableRipple
                        sx={{ borderRadius: '12px' }}
                      >
                        Feature not implemented yet
                      </MenuItem>
                    </Box>
                  </StyledMenu>
                  <MenuItem
                    sx={{
                      borderRadius: '50px',
                      backgroundColor: `${isSaved ? 'white' : 'black'}`,
                      paddingX: '2px',
                      margin: '0px',
                      '& :hover': { backgroundColor: 'none', color: 'black' },
                    }}
                    onClick = {handleSave}
                  >
                    <Button padding='0px' sx={{ color: `${isSaved ? 'black' : 'white'}` }} disableRipple>
                      {isSaved ? 'Saved' : 'Save'}
                    </Button>
                  </MenuItem>
                </Box>

                <Box display='flex' flexDirection='column' rowGap='20px'>
                  <Link
                    sx={{
                      fontWeight: '400',
                      fontFamily: 'Oxygen',
                      fontSize: '14px',
                      textAlign: 'left',
                      color: 'black'
                    }}
                    target="_blank"
                    rel="noopener"
                    href={item[item.length - 1].url}
                  >
                    {item[item.length - 1].url.slice(0, 20) + '...'}
                  </Link>

                  <Typography sx={{ fontSize: '30px', textAlign: 'left' }}>
                    {item[item.length - 1].title}
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: '400',
                      fontFamily: 'Oxygen',
                      textAlign: 'left',
                    }}
                  >
                    {item[item.length - 1].description}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Typography paddingY='25px' sx={{ fontSize: '20px' }}>
          More like this
        </Typography>
        <PhotoGrid />
      </div>
    </div>
  )
}

export default Home
