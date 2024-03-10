import React, { useState } from 'react'
import {
  Box,
  IconButton,
  MenuItem,
  Typography,
  useMediaQuery,
  TextField,
  Badge,
  Menu,
  Button,
} from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useDispatch, useSelector } from 'react-redux'
import { setSavedItems, setVisitingItem, updateSavedItems } from '../../state/itemsSlice'
import { savePin, deleteSavedPin } from '../../services/dataServices.js'
import { useEffect } from 'react'
import { getSaved } from '../../services/dataServices.js'

const ImageItem = ({ item }) => {
  const userSavedItems = useSelector((state) => state.items.savedItems)

  const [userId, setUserId] = useState(null)

  const dispatch = useDispatch()

  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

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
  const handleClick = (event) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }
  const handleClose = async (event) => {
    event.stopPropagation()
    setAnchorEl(null)
  }

  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleClickOnPin = () => {
    dispatch(setVisitingItem(item))
    window.location.href = '/pin'
  }

  const [isSaved, setIsSaved] = useState(false)

  const handleSave = async (event) => {
    event.stopPropagation()
    if (userSavedItems.includes(item._id)) {
      const indexToRemove = userSavedItems.indexOf(item._id)
      const newItemsArray = userSavedItems.map(item => item)
      newItemsArray.splice(indexToRemove, 1)
      dispatch(setSavedItems(newItemsArray))
      setIsSaved(false)

      const body = JSON.stringify({
        userID: userId,
        itemID: item._id,
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
        itemID: item._id,
      })
      setIsSaved(true)
      dispatch(updateSavedItems(item._id))
      const response = await savePin(body)
      if (response) {
        console.log('Pin Saved')
      } else {
        console.log('Pin not saved')
      }
    }
    
  }

  useEffect(() => {
    const credentials = JSON.parse(localStorage.getItem('credentials'))
    setUserId(credentials.uid)
    if (userSavedItems.includes(item._id)) {
      setIsSaved(true)
    }
  }, [userSavedItems, item._id])

  return (
    <Box
      marginBottom='3px'
      position='relative'
      display='inline-block'
      boxSizing='content-box'
      sx={{ cursor: 'pointer' }}
    >
      <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <img
          src={item.url}
          alt=''
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '22px',
          }}
          onLoad={handleImageLoad}
        />

        <Box
          position='absolute'
          width='100%'
          height='97.7%'
          borderRadius='22px'
          top='0'
          left='0'
          sx={{
            opacity: isHovered ? '1' : '0',
            backgroundColor: 'rgba(10, 10, 10, 0.3)',
          }}
          zIndex='1'
          display='flex'
          flexDirection='column'
          justifyContent='space-between'
          onClick={handleClickOnPin}
        >
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            padding='20px'
          >
            <MenuItem sx={{ borderRadius: '50px', padding: '8px' }}>
              <Button
                onClick={handleClick}
                disableRipple
                sx={{
                  color: 'white',
                  padding: '0px',
                  minWidth: '0px',
                }}
              >
                Your Board
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
            >
              <Button
                padding='0px'
                sx={{ color: `${isSaved ? 'black' : 'white'}` }}
                disableRipple
                onClick={handleSave}
              >
                {isSaved ? 'Saved' : 'Save'}
              </Button>
            </MenuItem>
          </Box>

          <Box>
            <MenuItem
              sx={{
                borderRadius: '50px',
                backgroundColor: 'black',
                marginBottom: '25px',
                marginLeft: '20px',
                paddingX: '0px',
                '& :hover': { backgroundColor: 'none', color: 'black' },
                width: '60%',
              }}
            >
              <Button
                sx={{
                  color: 'white',
                  fontSize: '9px',
                  overflow: 'hidden',
                  paddingY: '3px',
                }}
                disableRipple
              >
                {item.url.slice(0, 22) + '...'}
              </Button>
            </MenuItem>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ImageItem
