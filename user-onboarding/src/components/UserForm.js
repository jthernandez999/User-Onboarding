import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'

const Div = styled.div`
display: block;
align-items: center;
justify-contents: space-between;
margin: 75px auto;

`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    background: #F5F9E9;
    width: 90%;
    cursor: pointer;
    margin: 30px auto;
    opacity: 1;
    
`

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
        <Form className='form container' onSubmit={onSubmit}>

            <Div className='form-group inputs'>
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

            </Div>

            <div className='form-group submit'>
                
                <Button onClick={onSubmit}variant='contained' color='primary' className='submitBtn' disabled={disabled}>Submit</Button>
                
            </div>


        </Form>
    )
}



// username: '', 
// email: '', 
// password: '', 
// terms: '', 