import * as Yup from 'yup';

// friendly-frontend/src/lib/validation/index.ts
// this file contains all the validation schemas and initial values that are used in the application
// these all are used in the signup form, login form, profile form, etc

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const SignupValidationSchema = Yup.object({
    firstName: Yup.string()
        .min(2, "Minimum 2 character")
        .max(15, "Maximum 2 character")
        .required("Required!"),
    lastName: Yup.string()
        .min(2, "Minimum 2 character")
        .max(15, "Maximum 2 character")
        .required("Required!"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Required!"),
    phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(10, "phone number must be of 10 numbers")
        .required("Required!"),
    password: Yup.string()
        .min(6, "Minimum 6 characters")
        .matches(
            /(?=.*[a-zA-Z])(?=.*\d)/,
            'Password must contain both letters and numbers'
          )
        .required("Required!"),
    confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Password is not matched").required("Required!"),
})
export const SignupFormInitialValues =
{
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirm_password: ""
}

export const ChangePasswordValidationSchema = Yup.object({
    oldPassword: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Required!"),
    newPassword: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Required!"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Password is not matched").required("Required!"),
})

export const ChangePasswordInitialValues =
{
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
}

export const NewFriendValidationSchema = Yup.object({
    fullName: Yup.string()
        .min(2, "Minimum 2 character")
        .max(15, "Maximum 2 character")
        .required("Required!"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Required!"),
    message: Yup.string()
        .required("Required!"),
})

export const NewFriendInitialValues = {
    fullName: "",
    email: "",
    message: ""
}
export const AdminRegisterValidationSchema = Yup.object({
    adminEmail: Yup.string()
        .email("Invalid email format")
        .required("Required!"),
    admin_password: Yup.string()
        .min(6, "Minimum 6 characters")
        .matches(
            /(?=.*[a-zA-Z])(?=.*\d)/,
            'Password must contain both letters and numbers'
          )
        .required('Required!'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref("admin_password")], "Password is not matched")
        .required("Required!"),
    fullName: Yup.string()
        .min(2, "Minimum 2 character")
        .max(15, "Maximum 2 character")
        .required("Required!"),
})

export const AdminRegisterInitialValues = {
    adminEmail: "",
    admin_password: "",
    confirm_password: "",
    fullName: ""
}

