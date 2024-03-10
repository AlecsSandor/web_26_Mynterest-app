import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebase'
import { Box, TextField, Button } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { theme } from '../../../theme'

const Signup = () => {
  const onSubmit = async (values) => {
    //e.preventDefault()
    console.log(values)
    const email = values.email
    const password = values.password

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        // Save credentials to local storage
        localStorage.setItem(
          'credentials',
          JSON.stringify({
            token: user.accessToken,
            email: user.email,
            uid: user.uid
          })
        )
        window.location.href = '/'
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
        // ..
      })
  }

  const validatePassword = (value) => {
    let error
    if (!value) {
      error = 'Password is required'
    } else if (value.length < 7) {
      error = 'Password must be at least 7 characters long'
    }
    return error
  }

  const initialValues = {
    email: '',
    password: '',
  }

  return (
    <main style={{ padding: '20px' }}>
      <Box>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div style={{ padding: '10px 0px', width: '70%' }}>
                <Field
                  name='email'
                  as={TextField}
                  label='Email'
                  type='email'
                  required
                  fullWidth
                  InputProps={{
                    style: {
                      borderRadius: '20px',
                    },
                  }}
                  sx={{
                    '& label.Mui-focused': {
                      color: 'black',
                    },
                    '& .MuiInput-underline:after': {
                      borderBottomColor: 'black',
                    },
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: 'black',
                      },
                    },
                  }}
                />
                <ErrorMessage name='email' component='div' />
              </div>

              <div style={{ padding: '10px 0px', width: '70%' }}>
                <Field
                  name='password'
                  validate={validatePassword}
                  as={TextField}
                  type='password'
                  label='Password'
                  required
                  fullWidth
                  InputProps={{
                    style: {
                      borderRadius: '20px',
                    },
                  }}
                  sx={{
                    '& label.Mui-focused': {
                      color: 'black',
                    },
                    '& .MuiInput-underline:after': {
                      borderBottomColor: 'black',
                    },
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: 'black',
                      },
                    },
                  }}
                />
                <ErrorMessage
                  name='password'
                  component='div'
                  style={{ fontFamily: 'Poppins', fontSize: '13px' }}
                />
              </div>
            </Box>

            <Button
              variant='contained'
              type='submit'
              sx={{
                borderRadius: '50px',
                backgroundColor: 'black',
                color: theme.palette.primary.main,
                fontWeight: 'bold',
                marginTop: '13px',
                width: '70%',
                height: '45px',
                boxShadow: '0 0 0',
              }}
            >
              Sign up
            </Button>
          </Form>
        </Formik>
      </Box>
    </main>
  )
}

export default Signup
