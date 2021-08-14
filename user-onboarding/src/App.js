import React, { useState, useEffect } from 'react'
import './App.css';
import User from './components/User'
import UserForm from './components/UserForm'
import axios from 'axios';
import schema from './validation/formSchema';
import * as yup from 'yup'
import styled from 'styled-components';


const Div = styled.div`
border-radius: 10px;
max-width: 500px;
margin: 30px auto;
overflow: auto;
min-height: 300px;
padding: 30px;
border: 1px solid white;
background-color: #596869 ;
opacity: 1;
`

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
    closeModal()
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

    const closeModal = () => {
      document.querySelector('.bg-modal').style.display= 'none';
      document.querySelector('.add-button').style.display= 'flex';
    }
  const onClick = () => {
    document.querySelector('.bg-modal').style.display= 'flex';
    document.querySelector('.add-button').style.display= 'none';
  }
  const close = () => {
      document.querySelector('.bg-modal').style.display = 'none';
    
  }
    

  return (
    <div >
  <div className='bg-modal'>
        <div className='modal-content'>
          <div className='close' onClick={close}>+</div>
            <UserForm 
              values={formValues}
              disabled={disabled}
              submit={formSubmit}
              change={inputChange}
              errors={formErrors}
            />
          </div>
          
        </div>

    <button className='add-button' onClick={onClick}>Add User</button>
    

    <Div className="App">
    {
      users.map(user => {
        return (
          <User key={user.id} details={user} />
        )
      })
    }
    </Div>

    </div>
  )
}

export default App;
