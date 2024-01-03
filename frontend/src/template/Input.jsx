import React from "react";

const Input = (props) => {
    return (
        <section className="mt-4 flex flex-col lg:flex-row">
            <section className="w-full lg:w-1/4">
                <label className="lg:float-right lg:mr-2" htmlFor={props.id}> 
                    {props.label}
                </label>    
            </section>
            
            <section className="w-full lg:w-3/4">
                <input 
                    className="w-full lg:w-5/6 px-1" 
                    name={props.id} 
                    type={props.type}
                    onChange={props.change}
                    value={props.value} 
                    required
                />    
            </section>  
        </section> 
    )
}

export default Input;