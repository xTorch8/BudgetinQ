import React, {useState} from "react";

import Form from "../../../../template/Form";
import Button from "../../../../template/Button";
import Input from "../../../../template/Input";
import ErrorMessage from "../../../../template/ErrorMessage";

import loginAPI from "../../../../data/APIs/Users/userLoginAPI";

const LoginForm = (props) => {
    // User login data
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    // User login error
    const error = [];
    const [errorMessage, setErrorMessage] = useState();

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const data = await loginAPI(email, password);
            if (data.success) {
                props.loginSuccess(true, email, {
                    firstName: data.firstName, 
                    lastName: data.lastName
                });
            }
            else {
                error.push(data.error);
                
            }            
        }
        catch (error) {
            console.error(error);
            error.push(error);
        }
        setErrorMessage(error);
    }

    return (
        <Form label = "Login Form" submit = {loginHandler}>
            <Input 
                id = "login-email"
                label = "Email"
                type = "email"
                change  = {emailChangeHandler}
            />

            <Input 
                id = "login-password"
                label = "Password"
                type = "password"
                change = {passwordChangeHandler}
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

export default LoginForm;