import React from "react";

const HeaderNotLogin = (props) => {
    return (
        <>
            <li className="mx-2">
                <button onClick={props.login}> 
                    Login 
                </button>
            </li>
            <li className="mx-2">
                <button onClick={props.register}>
                    Register
                </button>
            </li>
        </>
    )
}

export default HeaderNotLogin;