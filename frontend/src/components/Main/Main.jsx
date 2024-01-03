import React from "react";

import Landing from "./Landing/Landing";
import RegisterForm from "./User/RegisterForm/RegisterForm";
import LoginForm from "./User/LoginForm/LoginForm";
import Dashboard from "./Dashboard/Dashboard";

const Main = (props) => {
    const registerSuccessHandler = (condition) => {
        props.registerUserSuccess(condition);
    }

    const loginSuccessHandler = (condition, email, user) => {
       props.loginSuccess(condition, email, user);
    }

    // Content management
    let content = "";

    const landingContent = <Landing />;
    const registerFormContent = <RegisterForm registerSuccess = {registerSuccessHandler}/>;
    const loginFormContent = <LoginForm loginSuccess = {loginSuccessHandler}/>;
    const dashboardContent = <Dashboard userLogin = {props.userLogin} emailLogin = {props.emailLogin}/>

    if (!props.isLoginFormClicked && !props.isRegisterUserFormClicked && !props.isLoginSuccess){
        content = landingContent;
    }
    else if(!props.isLoginFormClicked && !props.isRegisterUserFormClicked && props.isLoginSuccess){
        content = dashboardContent;
    }
    else if(props.isRegisterUserFormClicked){
        content = registerFormContent
    }
    else if(props.isLoginFormClicked || props.isRegisterUserSuccess){
        content = loginFormContent;
    }

    return (
        <main className="p-4 scroll-smooth">
            {content}
        </main>
    )
}

export default Main;