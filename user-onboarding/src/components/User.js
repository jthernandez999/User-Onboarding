import React from 'react'

function User({ details }) {
    if (!details) {
        return <h3>Working on fetching your user&apos;s details...</h3>
    }
    return (
        <div className='user container'>
            <h2>{details.username}</h2>
            <p>Email:{details.email}</p>
            <p>Password:{details.password}</p>
            <p>Agree:{details.terms === true ? 'yes' : 'no' }</p>
        </div>
    )
}

export default User