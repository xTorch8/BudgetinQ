import React from "react";

const ButtonNavigation = (props) => {
    let style;
    if (!props.enable) {
        style = "bg-slate-200 my-1 md:mx-1 rounded-md dropshadow-md px-2 py-1 hover:bg-slate-300 active:bg-slate-300 hover:scale-110";  
    }
    else {
        style = "bg-slate-200 my-1 md:mx-1 rounded-md dropshadow-md px-2 py-1"; 
    }

    return (
        <button 
            className={style}
            style={{opacity: props.opacity}}
            onClick={props.click}
            disabled={props.enable}
        > 
            {props.title} 
        </button>
    )
}

export default ButtonNavigation;