import React, {useState, useEffect} from "react";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

function App() {
  // determine whether the RegisterForm link on the Header is clicked or not.
  const [isRegisterUserFormClicked, setIsRegisterUserFormClicked] = useState(false);
  // determine whether the user registration process success or not.
  const [isRegisterUserSuccess, setIsRegisterUserSuccess] = useState(false);

  // determine whether the LoginForm link on the Header is clicked or not.
  const [isLoginFormClicked, setIsLoginFormClicked] = useState(false);
  // determine whether the login process success or not.
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  // save the value of user who has successfully login.  
  const [userLogin, setUserLogin] = useState();
  const [emailLogin, setEmailLogin] = useState();

  // this function will run when the RegisterForm link on the Header is clicked.
  // if the link is clicked, the RegisterForm component will occur.
  const registerFormClickedHandler = (condition) => {
    setIsRegisterUserFormClicked(condition);
    setIsLoginFormClicked(!condition);
  }

  // this function will run when the registration process is success.
  // if the registration is successful, the LoginForm component will occur.
  // there gonna be a dropdown with a name of the user.
  // when the dropdown is clicked, the logout button will occur.
  const registerUserSuccessHandler = (condition) => {
    setIsRegisterUserSuccess(condition);
    setIsRegisterUserFormClicked(!condition);
    setIsLoginFormClicked(condition);
  }

  // this function will run when the LoginForm link on the Header is clicked.
  // if the link is clicked, the LoginForm component will occur.
  const loginFormClickedHandler = (condition) => {
    setIsRegisterUserFormClicked(!condition);    
    setIsLoginFormClicked(condition);
  } 
  
  // this function will run when the login process is success.
  // if the login process is success, create a local storage to
  // save the user and the Dashboard component will occur.
  const loginSuccessHandler = (condition, email, user) => {
    setIsLoginSuccess(condition);
    setUserLogin(user);
    setEmailLogin(email);

    localStorage.setItem("isLogin", true);
    localStorage.setItem("userLogin", JSON.stringify(user));
    localStorage.setItem("emailLogin", email);

    setIsLoginFormClicked(false);
    setIsRegisterUserFormClicked(false);
  }

  // this function will run when the logout button on the header is clicked.
  // if the button is clicked, the Landing component will occur.
  // there gonna be LoginForm and RegisterForm links on the Header as well. 
  const logoutHandler = (condition) => {
    setIsLoginSuccess(!condition);
    setUserLogin(null);
    setEmailLogin(null);

    localStorage.removeItem("isLogin");
    localStorage.removeItem("userLogin");
    localStorage.removeItem("emailLogin");
  }

  // this useEffect will run everytime the browser is refreshed or opened.
  // it will check whether a user have already login or not.
  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    const user = JSON.parse(localStorage.getItem("userLogin"));
    const userEmail = localStorage.getItem("emailLogin");

    if (isLogin) {
      setIsLoginSuccess(true);
      setUserLogin(user);
      setEmailLogin(userEmail);
    }
  }, []);

  return (
    <div className="select-none flex flex-col min-h-screen">
      <Header
        registerFormClicked = {registerFormClickedHandler}

        isLoginSuccess = {isLoginSuccess}
        userLogin = {userLogin}
        loginFormClicked = {loginFormClickedHandler}
        loginSuccess = {loginSuccessHandler}

        logout = {logoutHandler}
      />

      <Main
        isRegisterUserFormClicked = {isRegisterUserFormClicked}
        isRegisterUserSuccess = {isRegisterUserSuccess}
        registerUserSuccess = {registerUserSuccessHandler}

        isLoginFormClicked = {isLoginFormClicked}
        isLoginSuccess = {isLoginSuccess}
        userLogin = {userLogin}
        emailLogin = {emailLogin}
        loginSuccess = {loginSuccessHandler}
      />

      <Footer />
    </div>
    
  );
}

export default App;
