import React from "react";

const ErrorMessage = (props) => {
    return (
        <p className="mt-2 text-red-500"> {props.error} </p>
    )
}

export default ErrorMessage;