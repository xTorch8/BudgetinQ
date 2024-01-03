import React, {useState} from "react";

import Form from "../../../../template/Form";
import Button from "../../../../template/Button";
import Input from "../../../../template/Input";
import ErrorMessage from "../../../../template/ErrorMessage";

import registerAPI from "../../../../data/APIs/Users/userRegisterAPI";

const RegisterForm = (props) => {
    // User registration data
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Registration error
    const [errorMessage, setErrorMessage] = useState();
    const error = [];

    const firstNameChangeHandler = (e) => {
        setFirstName(e.target.value);
    }

    const lastNameChangeHandler = (e) => {
        setLastName(e.target.value);
    }

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    const confirmPasswordChangeHandler = (e) => {
        setConfirmPassword(e.target.value);
    }

    const registerHandler = async (e) => {
        e.preventDefault();

        // Name and email validation have been done in the form

        // Password validation
        if (password.length < 8) {
            error.push("Password must have a minimum 8 character. ");
        }

        if (!(/[A-Z]/.test(password) && /[a-z]/.test(password) && /[^a-zA-z0-0]/.test(password) && /\d/)) {
            error.push("Password must contains uppercase, lowercase, number, and symbol. ");
        }

        // Confirm password validation
        if (!confirmPassword) {
            error.push("Confirm password must have the same value with the password field. ");
        }

        if (error.length === 0) {
            try {
                const data = await registerAPI(firstName, lastName, email, password);

                if (data.success) {
                    props.registerSuccess(true);
                }
                else {
                    error.push(data.error);
                }

            }
            catch (error) {
                console.error(error);
            }
        }

        setErrorMessage(error);
    }

    return (
        <Form label = "Register Form" submit = {registerHandler}>
            <Input 
                id = "register-first-name"
                label = "First Name"
                type = "text"
                change  = {firstNameChangeHandler}
            />
            
            <Input 
                id = "register-last-name"
                label = "Last Name"
                type = "text"
                change  = {lastNameChangeHandler}
            />

            <Input 
                id = "register-email"
                label = "Email"
                type = "email"
                change  = {emailChangeHandler}
            />

            <Input 
                id = "register-password"
                label = "Password"
                type = "password"
                change  = {passwordChangeHandler}
            /> 

            <Input 
                id = "register-confirm-password"
                label = "Confirm Password"
                type = "password"
                change  = {confirmPasswordChangeHandler}
            />                       

            <ErrorMessage 
                error = {errorMessage}
            />

            <Button 
                background = "bg-slate-200"
                backgroundHover = "bg-slate-300"
                backgroundActive = "bg-slate-300"
                title = "Submit"
                type = "submit"
            />
                                 
        </Form>
    )
}

export default RegisterForm;