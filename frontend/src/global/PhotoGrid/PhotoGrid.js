import React from 'react'
import { Box, useMediaQuery } from '@mui/material'
import ImageItem from './ImageItem'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setItems } from '../../state/itemsSlice'
import Loader from '../Loader/Loader'
import { getSavedImages, getCreatedPins } from '../../services/dataServices'

const PhotoGrid = (props) => {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.items.items)
  const userSavedItems = useSelector((state) => state.items.savedItems)

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const items = await fetch('http://localhost:8080')
      const result = await items.json()
      dispatch(setItems(result))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fetchSavedImages = async () => {
    try {
      let queryArray = []
      for (var item in userSavedItems) {
        queryArray.push({ _id: userSavedItems[item] })
      }
      const body = JSON.stringify({
        data: queryArray,
      })
      const result = await getSavedImages(body)
      dispatch(setItems(result.savedPins))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fetchCreatedPins = async () => {
    try {
      const body = JSON.stringify({
        owner: JSON.parse(localStorage.getItem('credentials')).uid,
      })
      const result = await getCreatedPins(body)
      dispatch(setItems(result.savedPins))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const isHugeScreen = useMediaQuery('(min-width:1701px )')
  const isLargeScreen = useMediaQuery('(max-width: 1700px)')
  const isMediumScreen = useMediaQuery('(max-width: 1400px)')
  const isSmallScreen = useMediaQuery('(max-width:700px)')

  useEffect(() => {
    if (props.query == 'getSavedImages') {
      fetchSavedImages()
    } else if (props.query == 'getCreatedPins') {
      fetchCreatedPins()
    } else {
      fetchData()
    }
  }, [props.query, userSavedItems])

  const renderItems = () => {
    let elements = []
    let id = 0
    items.map((item) => {
      elements.push(<ImageItem key={id} item={item} />)
      id += 1
    })
    return elements
  }

  return (
    <Box
      maxWidth='1700px'
      position='relative'
      margin='auto'
      padding='10px 10px'
      transition='all 0.5s ease'
      alignItems='center'
      sx={{
        columnCount: `${
          !items.length
            ? '1'
            : isSmallScreen
            ? '2'
            : isMediumScreen
            ? '4'
            : isLargeScreen
            ? '6'
            : isHugeScreen
            ? '10'
            : '1'
        }`,
        columnGap: '10px',
        width: '100%',
      }}
    >
      {items.length ? renderItems() : <Loader></Loader>}
    </Box>
  )
}

export default PhotoGrid
