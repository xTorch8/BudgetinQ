import React from "react";

const Form = (props) => {
    return (
        <form className="bg-slate-100 w-1/2 mx-auto p-4 rounded-md drop-shadow-md" onSubmit={props.submit}>
            <h1 className="text-xl font-bold text-center"> {props.label} </h1>
            {props.children}
        </form>
    )
}

export default Form;