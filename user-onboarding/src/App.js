import React, { useState, useEffect } from 'react'
import './App.css';
import User from './components/User'
import UserForm from './components/UserForm'
import axios from 'axios';
import schema from './validation/formSchema';
import * as yup from 'yup'

const initialFormValues = {
  username: '',
  email: '', 
  password: '', 
  terms: false
}

const initialFormErrors = {
  username: '', 
  email: '', 
  password: '', 
  terms: '' 
}

const initialUsers = []
const initialDisabled = true



function App() {

  const [users, setUsers] = useState(initialUsers)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const getUsers = () => {
    axios
    .get('https://reqres.in/api/users')
    .then(res => {
      console.log('axios call', res.data.data)
      const newUsers = res.data.data
      setUsers(newUsers)
    })
    .catch(err => console.log(err))
  }

  const postNewUser = newUser => {
    axios
    .post('https://reqres.in/api/users', newUser)
    .then(res => {
      console.log('from post call', res.data)
      setUsers([...users, newUser])
    })
    .catch(err => console.log(err))
    .finally(() => { 
    setFormValues(initialFormValues)
    })
  }

  const inputChange = (name, value) => {
    yup
    .reach(schema, name)
    .validate(value)
    .then(() => {
      setFormErrors({
        ...formErrors, 
        [name]: ''
      })
    })
    .catch(err => {
      setFormErrors({
        ...formErrors, 
        [name]: err.message
      })
    })
    setFormValues({
      ...formValues, 
      [name]: value
    })
}
  const formSubmit = () => {
    const newUser = {
      username: formValues.username.trim(), 
      email: formValues.email.trim(), 
      password: formValues.password.trim(), 
      terms: true
    }
    postNewUser(newUser)
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    schema
    .isValid(formValues)
    .then(isSchemaValid => {
      setDisabled(!isSchemaValid)
    })
  }, [formValues])
    

  return (
    <div className="App">

    <UserForm 
      values={formValues}
      disabled={disabled}
      submit={formSubmit}
      change={inputChange}
      errors={formErrors}
    />

    
    {
      users.map(user => {
        return (
          <User details={user} />
        )
      })
    }
    
    </div>
  )
}

export default App;
