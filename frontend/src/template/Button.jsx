import React from "react";

const Button = (props) => {
    const style = props.background 
        + " block mx-auto my-4 px-2 py-1 rounded-md dropshadow-md hover:scale-110 "
        + "hover:" + props.backgroundHover
        + "active:" + props.backgroundActive 
        + " " + props.color;
        
    return (
        <button className={style} type={props.type} onClick={props.onClick}>
            {props.title}
        </button>
    )
}

export default Button;