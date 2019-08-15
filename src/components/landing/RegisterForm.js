import React, {useEffect} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Card } from 'semantic-ui-react'

import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import {Formik} from 'formik'
import * as Yup from 'yup'

import * as R from 'ramda'
import * as RA from 'ramda-adjunct'

// See LoginForm.js for congruent comments regarding structure of component

const RegisterValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name required'),
  lastName: Yup.string().required('Last name required'),
  email: Yup.string()
    .email('Invalid Email')
    .required('Email required'),
  emailConfirm: Yup.string()
    .oneOf([Yup.ref('email'), null], 'Email mismatch')
    .required('Email confirm required'),
  password: Yup.string().required('Password required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password mismatch')
    .required('Password confirm required'),
})

const RegisterForm = ({
  setShowLogin
}) => {
  const [createUser, {loading, data, error}] = useMutation(gql`
    mutation CreateUser(
      $firstName: String!,
      $lastName: String!,
      $email: Email!,
      $password: String!
    ) {
      createUser(
        firstName: $firstName,
        lastName: $lastName,
        email: $email,
        password: $password
      ) {
        userID
      }
    }
  `)
  useEffect(() => {
    if (RA.isNotNilOrEmpty(data) && R.has('createUser'. data)) {
      setShowLogin(true)
    }
  }, [data])
  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Formik
          intialValues={{
            firstName: '', lastName: '',
            email: '', emailConfirm: '',
            password: '', passwordConfirm: ''
          }}
          onSubmit={(values) => {
            const {firstName, lastName, email, password} = values
            console.log(values)
            createUser({variables: {firstName, lastName, email, password}})
          }}
          validationSchema={RegisterValidationSchema}
          render={({
            touched,
            errors,
            handleSubmit, handleChange, handleBlur
          }) => {
            const isError = valueName => R.and(
              R.both(
                R.has(valueName),
                R.compose(RA.isNotNil, R.prop(valueName))
              )(touched),
              R.both(
                R.has(valueName),
                R.compose(RA.isNotNil, R.prop(valueName))
              )(errors)
            )
            return (
              <Form size='large' onSubmit={handleSubmit}>
                <Card fluid>
                  <Card.Content>
                    <Form.Input
                      fluid iconPosition='left'
                      placeholder='First name'
                      error={isError('firstName')}
                      name='firstName'
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Form.Input 
                      fluid iconPosition='left'
                      placeholder='Last name'
                      error={isError('lastName')}
                      name='lastName'
                      onChange={handleChange}
                      onBlur={handleBlur}                    
                    />
                    <Form.Input 
                      fluid iconPosition='left'
                      placeholder='E-mail address'
                      error={isError('email')}
                      name='email'
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Form.Input 
                      fluid iconPosition='left'
                      placeholder='Confirm e-mail address'
                      error={isError('emailConfirm')}
                      name='emailConfirm'
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Form.Input
                      fluid icon='lock' iconPosition='left'
                      placeholder='Password'
                      type='password'
                      error={isError('password')}
                      name='password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Form.Input
                      fluid icon='lock' iconPosition='left'
                      placeholder='Confirm password'
                      type='password'
                      error={isError('passwordConfirm')}
                      name='passwordConfirm'
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Card.Content>
                  <Card.Content>
                    <Button
                      fluid color='grey' size='large'
                      type='submit'
                      disabled={
                        R.any(RA.isTrue, [
                          true, // Remove when deployed, only one user for now
                          R.any(isError, [
                            'firstName',
                            'lastName',
                            'email',
                            'emailConfirm',
                            'password',
                            'passwordConfirm'
                          ]),
                          R.isEmpty(touched)
                        ])
                      }
                      content='Register'
                    />
                  </Card.Content>
                  <Card.Content extra>
                    <Button
                      fluid color='grey'
                      type='button'
                      onClick={() => setShowLogin(true)}
                      content='Click to login'
                    />
                  </Card.Content>
                </Card>
              </Form>
            )
          }}
        />
      </Grid.Column>
    </Grid>
  )
}

export default RegisterForm