import React from "react";

const Wrapper = (props) => {

    const style = "bg-slate-100 p-4 mt-4 mx-auto rounded-md drop-shadow-md "
        + props.width 
        + " " 
        + props.additional

    return (
        <section className={style} style={{opacity: props.opacity}}>
            {props.children}
        </section>
    )
}

export default Wrapper;