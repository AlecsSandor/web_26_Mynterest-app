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
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsIcon from '@mui/icons-material/Notifications'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { profile_01, profile_02, profile_03 } from '../../assets'
import { veswip } from '../../assets'
import { theme } from '../../theme'
//import { fetchQuery } from '../../services/dataServices'
import { setItems, setSavedItems } from '../../state/itemsSlice'
import { useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Navbar = () => {

  const userSavedItems = useSelector((state) => state.items.savedItems)
  const navigate = useNavigate()
  const isNonMobileScreens = useMediaQuery('(min-width: 700px)')
  //const [searchQuery, setSearchQuery] = useState('')

  const dispatch = useDispatch()

  const searchQuery = useRef('')

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const [anchorCreate, setAnchorCreate] = React.useState(null)
  const openCreate = Boolean(anchorCreate)
  const handleCreateClick = (event) => {
    setAnchorCreate(event.currentTarget)
  }
  const handleClose = async () => {
    setAnchorEl(null)
  }

  const handleLogOut = async () => {
    handleClose(null)
    await logOut()
  }

  const logOut = async () => {
    localStorage.removeItem('credentials')
    dispatch(setSavedItems([]))
    window.location.href = '/'
  }

  const handleCloseCreate = () => {
    setAnchorCreate(null)
  }

  const handleCreatePin = () => {
    window.location.href = '/create'
  }

  const headHome = () => {
    window.location.href = '/'
  }

  const handleProfileClick = () => {
    window.location.href = '/profile'
  }

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '30px',
    display: 'flex',
    alignItems: 'flex-start',
    padding: '6px',
    backgroundColor: alpha(theme.palette.secondary.main, 0.35),
    '&:hover': {
      backgroundColor: alpha(theme.palette.secondary.main, 0.42),
    },
    '& .css-1vc5897-MuiInputBase-root': {
      width: '100%',
    },
    width: '100%',
  }))

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: '3px',
    position: 'absolute',
    pointerEvents: 'none',
    marginTop: '1px',
  }))

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
    },
  }))

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
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
          : 'rgb(55, 65, 81)',
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

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      console.log(searchQuery.current.querySelector('input').value)
      // Fetch data with the latest searchQuery
      fetchQuery(searchQuery.current.querySelector('input').value)
    }
  }

  const fetchQuery = async (query) => {
    try {
      const items = await fetch(`http://localhost:8080?q=${query}`)
      const result = await items.json()
      dispatch(setItems(result))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <Box
      display='flex'
      alignItems='center'
      flexDirection='column'
      width='100%'
      color='black'
      position='fixed'
      top='0'
      left='0'
      zIndex='2'
      sx={{ backgroundColor: 'white' }}
    >
      {/* DESKTOP NAV ------------------------------------------------------------------------------------------------ */}
      {isNonMobileScreens ? (
        <Box
          width='100%'
          margin='auto'
          display='flex'
          paddingX='10px'
          paddingY='13px'
          justifyContent='space-between'
        >
          <Box
            flex='0.6'
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            gap='6px'
          >
            <MenuItem sx={{ borderRadius: '50px' }}>
              <Box>
                <img width='25' height='25' src={veswip} alt=''/>
              </Box>
            </MenuItem>

            <MenuItem
              sx={{
                borderRadius: '50px',
                backgroundColor: 'black',
                paddingX: '2px',
                margin: '0px',
                '& :hover': { backgroundColor: 'none', color: 'black' },
              }}
            >
              <Button padding='0px' sx={{ color: 'white' }} disableRipple onClick={headHome}>
                Home
              </Button>
            </MenuItem>

            <MenuItem sx={{ borderRadius: '50px', padding: '5px' }}>
              <Button
                disableRipple
                onClick={handleCreateClick}
                sx={{ color: 'black' }}
              >
                {' '}
                Create
                <KeyboardArrowDownIcon />
              </Button>
            </MenuItem>
            <StyledMenu
              // id='demo-customized-menu'
              // MenuListProps={{
              //   'aria-labelledby': 'demo-customized-button',
              // }}
              anchorEl={anchorCreate}
              open={openCreate}
              onClose={handleCloseCreate}
            >
              <Box paddingY='10px' paddingX='10px' >
                  <MenuItem onClick={handleCreatePin} disableRipple sx={{ borderRadius:'12px'}}>
                    Create Pin
                  </MenuItem>
                </Box>
            </StyledMenu>
          </Box>

          <Box width='100%' paddingX='8px'>
            <Search>
              <SearchIconWrapper>
                <SearchIcon fontSize='large' sx={{ color: 'rgb(55, 65, 81)' }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder='Search…'
                inputProps={{ 'aria-label': 'search' }}
                ref={searchQuery}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    handleKeyPress(event)
                  }
                }}
              />
            </Search>
          </Box>

          <Box
            flex='0.6'
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
            gap='6px'
          >
            <IconButton
              size='large'
              aria-label='show 17 new notifications'
              color='inherit'
            >
              <Badge badgeContent={17} color='error'>
                <NotificationsIcon fontSize='large' />
              </Badge>
            </IconButton>

            <Box
              width='50px'
              height='50px'
              display='flex'
              alignItems='center'
              justifyContent='center'
              borderRadius='50px'
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.secondary.light,
                },
                cursor: 'pointer',
              }}
              onClick={handleProfileClick}
            >
              <img
                src={profile_01}
                alt='p'
                width='30px'
                height='30px'
                style={{ borderRadius: `50px` }}
              />
            </Box>

            <div>
              <MenuItem sx={{ borderRadius: '50px', padding: '8px' }}>
                <Button
                  onClick={handleClick}
                  disableRipple
                  sx={{
                    color: 'black',
                    padding: '0px',
                    minWidth: '0px',
                  }}
                >
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
                <Box
                  paddingX='20px'
                  paddingY='10px'
                  onClick={handleClose}
                  display='flex'
                  flexDirection='column'
                >
                  <Typography
                    fontWeight='400'
                    fontFamily='Oxygen'
                    fontSize='12px'
                    paddingY='10px'
                  >
                    Currently in
                  </Typography>
                  <MenuItem
                    sx={{ borderRadius:'12px' }}
                    onClick={handleProfileClick}
                  >
                    <Box
                      display='flex'
                      flexDirection='row'
                      justifyContent='space-between'
                    >
                      <img src={profile_01} alt='' height='50px' style={{ marginRight:'20px', borderRadius:'50px' }} />
                      <Box display='flex' flexDirection='column'>
                        <Typography>Alex Sandor</Typography>
                        <Typography
                          fontWeight='500'
                          fontFamily='Oxygen'
                          fontSize='13px'
                          color='gray'
                        >
                          sandoralecs@gmail.com
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                </Box>

                <Box paddingX='20px' paddingY='10px'>
                  <Typography
                    fontWeight='400'
                    fontFamily='Oxygen'
                    fontSize='12px'
                    paddingY='10px'
                  >
                    More options
                  </Typography>
                  <MenuItem onClick={handleLogOut} disableRipple sx={{ borderRadius:'12px' }}>
                    Log out
                  </MenuItem>
                </Box>
              </StyledMenu>
            </div>
          </Box>
        </Box>
      ) : (
        <div></div>
      )}
    </Box>
  )
}

export default Navbar
