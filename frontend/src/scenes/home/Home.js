import React, { useState } from 'react'
import PhotoGrid from '../../global/PhotoGrid/PhotoGrid.js'
import Navbar from '../../global/Navbar/Navbar.js'
import { setSavedItems } from '../../state/itemsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getSaved } from '../../services/dataServices.js'

const Home = () => {
  const userSavedItems = useSelector((state) => state.items.savedItems)

  const [jk, setJk] = useState(null)

  const loadingSavedItems = async () => {
    const id = (JSON.parse(localStorage.getItem('credentials'))).uid
    const body = JSON.stringify({
      userID: id
    })
    //const result = await items.json()
    let theItems = await (getSaved(body))
    let arrayOf = []
    for (let i=0; i < ((theItems.savedPins).length)-1; i++) {
      arrayOf.push((theItems.savedPins[i]).itemID)
    }
    dispatch(setSavedItems(arrayOf))
  }
  
  const dispatch = useDispatch() 
  useEffect(() => {
    loadingSavedItems()
  }, [])

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
          paddingTop: '80px',
        }}
      > 
        <PhotoGrid /> 
      </div>
    </div>
  )
}

export default Home
