
export default function UserForm(props) {
    const {
        values, 
        disabled,
        change,
        errors, 
        submit,
    } = props

const onSubmit = evt => {
    evt.preventDefault()
    submit()
}

const onChange = evt => {
        const { checked, name, type, value } = evt.target 
        if(type === 'checkbox') {
            change(name, checked)
        } else {
            change(name, value)
        }
    }
    
    return (
        <form className='form container' onSubmit={onSubmit}>

            <div className='form-group inputs'>
                <h4>General Information</h4>

                <div className='errors'>
                    <div>{errors.username}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.terms}</div>
                </div>

                <label>Username
                    <input 
                        onChange={onChange}
                        value={values.username}
                        name='username'
                        type='text'
                    />
                </label>

                <label>Email
                    <input
                    onChange={onChange}
                        value={values.email}
                        name='email'
                        type='email'
                        />
                </label>

                <label>Password
                    <input 
                    onChange={onChange}
                    value={values.password}
                    name='password'
                    type='password'
                    />
                </label>

                <label>Terms of Service
                    <input 
                    onChange={onChange}
                    name='terms'
                    type='checkbox'
                    checked={values.terms}
                    />
                </label>

            </div>

            <div className='form-group submit'>
                <button disabled={disabled}>Submit</button>
            </div>
        </form>
    )
}



// username: '', 
// email: '', 
// password: '', 
// terms: '', 