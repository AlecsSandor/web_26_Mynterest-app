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
  TextareaAutosize,
} from '@mui/material'
import Navbar from '../../global/Navbar/Navbar.js'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { theme } from '../../theme'
import { useState } from 'react'
import { createPin } from '../../services/dataServices.js'

const Create = () => {
  const [isImageLink, setIsImageLink] = useState('')
  const [isActionDone, setIsActionDone] = useState('')
  const user_id = (JSON.parse(localStorage.getItem('credentials'))).uid

  const initialValues = {
    title: '',
    description: '',
    link: '',
  }

  const onSubmit = async (values) => {
    const body = JSON.stringify({
      title: values.title,
      description: values.description,
      link: isImageLink,
      owner: user_id
    })
    
    console.log(body)
    const response = await createPin(body)
    console.log(response)
    if (response) {
      console.log('Pin Created')
      setIsActionDone('created')
    } else {
      console.log('Some Error')
      setIsActionDone('error')
    }
  }

  const updateLink = (link) => {
    setIsImageLink(link)
  }
  const validateField = (value) => {
    let error
    if (!value) {
      error = 'This field is required'
    }
    return error
  }

  const validateImageLink = (value) => {
    const imageExtensionsRegex = /\.(jpg|jpeg|png|gif|bmp|svg)$/i
    let error

    if (!isImageLink) {
      error = 'This field is required'
    } else if (!imageExtensionsRegex.test(isImageLink)) {
      error =
        'This is not a valid image link (valid image links end with an extension, eg. jpg, jpeg, png etc.)'
    }

    return error
  }

  const handleMakeAnother = () => {
    setIsActionDone('')
    setIsImageLink('')
  }

  return (
    <div>
      <Navbar />
      <div
        style={{
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: '#E0DFDE',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '250px',
            boxShadow: '0px 0px 10px rgba(10,10,10,0.1)',
            borderRadius: '30px',
            display: 'flex',
            flexDirection: 'column',
            justifyItems: 'center',
            justifyContent: 'center',
            background: 'white',
          }}
        >
          {isActionDone === '' ? (
            <Box
              display='flex'
              flexDirection='row'
              alignItems='center'
              justifyContent='center'
            >
              <Box padding='30px'>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isImageLink ? (
                    <img
                      src={isImageLink}
                      alt=''
                      style={{ borderRadius: '14px', maxWidth: '400px' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '250px',
                        height: '400px',
                        backgroundColor: '#E0DFDE',
                        borderRadius: '14px',
                      }}
                    ></div>
                  )}
                </Box>
              </Box>
              <Box display='flex' width='400px' flexDirection='column'>
                <Box width='100%' padding='50px'>
                  <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    <Form>
                      <Box
                        width='100%'
                        display='flex'
                        flexDirection='row'
                        justifyContent='flex-end'
                      >
                        <MenuItem
                          sx={{
                            borderRadius: '15px',
                            backgroundColor: 'black',
                            paddingX: '2px',
                            width: '80px',
                            margin: '0px',
                            '& :hover': {
                              backgroundColor: 'none',
                              color: 'black',
                            },
                          }}
                        >
                          <Button
                            padding='0px'
                            sx={{ color: 'white', width: '80px' }}
                            disableRipple
                            type='submit'
                          >
                            Save
                          </Button>
                        </MenuItem>
                      </Box>

                      <Box>
                        <div style={{ padding: '10px 0px' }}>
                          <Field
                            name='title'
                            validate={validateField}
                            as={TextField}
                            label='Title'
                            type='title'
                            variant='standard'
                            required
                            fullWidth
                            inputProps={{ style: { fontSize: 40 } }}
                            sx={{
                              '& .css-bjugqw-MuiFormLabel-root-MuiInputLabel-root.Mui-focused':
                                {
                                  color: '#E0DFDE',
                                  borderColor: '#E0DFDE',
                                },
                              '& .css-8ss0ly-MuiInputBase-root-MuiInput-root:after':
                                {
                                  borderColor: '#E0DFDE',
                                },
                              '& .MuiInputBase-colorPrimary:after': {
                                color: '#E0DFDE',
                                borderColor: '#E0DFDE',
                              },
                              '& .css-1c8ww8m.Mui-focused': {
                                borderColor: '#E0DFDE',
                                color: '#E0DFDE',
                              },
                            }}
                          />
                          <ErrorMessage name='title' component='div' />
                        </div>

                        <div style={{ padding: '10px 0px' }}>
                          <Field
                            name='description'
                            validate={validateField}
                            as={TextField}
                            type='text'
                            label='Description'
                            variant='standard'
                            required
                            fullWidth
                            inputProps={{
                              style: { fontSize: 12, fontFamily: 'Oxygen' },
                            }}
                            sx={{
                              '& .css-bjugqw-MuiFormLabel-root-MuiInputLabel-root.Mui-focused':
                                {
                                  color: '#E0DFDE',
                                  borderColor: '#E0DFDE',
                                },
                              '& .css-8ss0ly-MuiInputBase-root-MuiInput-root:after':
                                {
                                  borderColor: '#E0DFDE',
                                },
                              '& .MuiInputBase-colorPrimary:after': {
                                color: '#E0DFDE',
                                borderColor: '#E0DFDE',
                              },
                              '& .css-1c8ww8m.Mui-focused': {
                                borderColor: '#E0DFDE',
                                color: '#E0DFDE',
                              },
                            }}
                          />
                          <ErrorMessage name='text' component='div' />
                        </div>

                        <div style={{ padding: '10px 0px' }}>
                          <Field
                            name='link'
                            validate={validateImageLink}
                            as={TextField}
                            type='text'
                            label='Image Link'
                            variant='standard'
                            value={isImageLink}
                            onChange={(e) => {
                              updateLink(e.target.value)
                            }}
                            required
                            fullWidth
                            inputProps={{
                              style: { fontSize: 10 },
                            }}
                            sx={{
                              '& .css-bjugqw-MuiFormLabel-root-MuiInputLabel-root.Mui-focused':
                                {
                                  color: '#E0DFDE',
                                  borderColor: '#E0DFDE',
                                },
                              '& .css-8ss0ly-MuiInputBase-root-MuiInput-root:after':
                                {
                                  borderColor: '#E0DFDE',
                                },
                              '& .MuiInputBase-colorPrimary:after': {
                                color: '#E0DFDE',
                                borderColor: '#E0DFDE',
                              },
                              '& .css-1c8ww8m.Mui-focused': {
                                borderColor: '#E0DFDE',
                                color: '#E0DFDE',
                              },
                            }}
                          />
                          <ErrorMessage name='link' component='div' />
                        </div>
                      </Box>
                    </Form>
                  </Formik>
                </Box>
              </Box>
            </Box>
          ) : ( 
            isActionDone === 'created' ? (
            <Box>
              <Box padding='30px'>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={isImageLink}
                    alt=''
                    style={{ borderRadius: '14px', maxWidth: '300px' }}
                  />
                  <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                  >
                    <Typography fontSize='25px'>
                      Pin created succesfully!
                    </Typography>
                    <MenuItem
                      sx={{
                        borderRadius: '15px',
                        backgroundColor: 'black',
                        paddingX: '2px',
                        
                        margin: '0px',
                        '& :hover': {
                          backgroundColor: 'none',
                          color: 'black',
                        },
                      }}
                    >
                      <Button
                        padding='0px'
                        sx={{ color: 'white' }}
                        disableRipple
                        onClick={handleMakeAnother}
                      >
                        Make another
                      </Button>
                    </MenuItem>
                  </Box>
                </Box>
              </Box>
            </Box>
            ) : (
              <Box>
              <Box padding='30px'>
                  <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                  >
                    <Typography fontSize='25px' color='red'>
                      Something went wrong...
                    </Typography>
                    <MenuItem
                      sx={{
                        borderRadius: '15px',
                        backgroundColor: 'black',
                        paddingX: '2px',
                        
                        margin: '0px',
                        '& :hover': {
                          backgroundColor: 'none',
                          color: 'black',
                        },
                      }}
                    >
                      <Button
                        padding='0px'
                        sx={{ color: 'white' }}
                        disableRipple
                        onClick={handleMakeAnother}
                      >
                        Try again
                      </Button>
                    </MenuItem>
                  </Box>
                
              </Box>
            </Box>
            )
          )}
        </Box>
      </div>
    </div>
  )
}

export default Create
