import React from "react";

import HeaderLogin from "./HeaderLogin";
import HeaderNotLogin from "./HeaderNotLogin";


const Header = (props) => {
    const registerHandler = () => {
        props.registerFormClicked(true);
    }

    const loginHandler = () => {
        props.loginFormClicked(true);
    }

    const logoutHandler = () => {
        props.logout(true);
    }

    let content = "";
    const headerLoginContent = <HeaderLogin userLogin = {props.userLogin} logout = {logoutHandler}/>;
    const headerNotLoginContent = <HeaderNotLogin login = {loginHandler} register = {registerHandler}/>;

    if (props.isLoginSuccess) {
        content = headerLoginContent;
    }
    else {
        content = headerNotLoginContent;
    }      

    return (
        <header className="bg-slate-100 flex flex-row justify-center items-center p-4 dropshadow-md top-0 sticky select-none z-10">
            <div className="w-1/5">
                <p className="text-xl font-bold inline-block"> Budgetinq </p>    
            </div>
            
            <nav className="w-4/5">
                <ul className="flex float-right">
                    {content}
                </ul>
            </nav>
        </header>
    )
}

export default Header;