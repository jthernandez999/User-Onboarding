import React from 'react'
import styled from 'styled-components'

const Div = styled.div`

border-radius: 20px;
border: 1px solid black;
padding: 1px;
margin: 4px;
background-color: #F5F9E9;
opacity: 1;
width: 98%;
`

function User({ details }) {
    if (!details) {
        return <h3>Working on fetching your user&apos;s details...</h3>
    }
    return (
        <Div className='user container'>
            <h2>{details.first_name} {details.last_name}</h2>
            <h2>{details.username}</h2>
            <p>Email:{details.email}</p>
            <p>Password:{details.password}</p>
            <p>Agree:{details.terms === true ? 'yes' : 'no' }</p>
        </Div>
    )
}

export default User