import React from 'react'
import { Box } from '@mui/material'

const Loader = () => {
  return (
    <Box width='100%' height='300px' display='flex' flexDirection='column' alignItems='center'>
        <div className='loaderFor'></div>
    </Box>
  )
}

export default Loader
