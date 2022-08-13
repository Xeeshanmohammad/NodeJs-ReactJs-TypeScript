import {object, string, ref} from "yup"

export const createUserSchema = object({
    body:object({
        name:string().required('Name is required'),
        email:string()
        .email('Email must be valid email')
        .required('Email is required'),
        password:string().required('password is required')
        .min(6,'password is too short , should be 6 char minimmum')
        .matches(/^[a-zA-Z0-9_.-]*$/,"password can only contain latin letter"),
        passwordConfirmation:string().oneOf(
            [ref("password"), null],"password must match"
        )
    })
})

export default createUserSchema