import * as yup from 'yup'

const schema = yup.object().shape({
    username: yup.string().required().min(3, 'Name must be 3 letters or more'), 
    email: yup.string().email().required(), 
    password: yup.string().required().min(4, 'password must be 4 characters or more'), 
    terms: yup.boolean().required('Must accept terms of service').oneOf([true], 'The terms and conditions must be accepted.')

})

export default schema