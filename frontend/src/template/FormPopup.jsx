import React from "react";

const FormPopup = (props) => {
    return (
        <form 
            className="bg-slate-100 fixed top-1/4 left-1/4 w-1/2 p-4 rounded-md drop-shadow-md z-10 opacity-100" 
            onSubmit={props.submit}
        >
            <section className="flex">
                <section className="w-11/12">
                    <h1 className="text-xl font-bold text-center"> {props.label} </h1>    
                </section>
                <section className="w-1/12">
                    <button 
                        className="float-right hover:text-red-600 hover:scale-110" 
                        onClick={props.close}
                    > 
                        X 
                    </button>     
                </section>     
            </section>

            {props.children}                                                    
        </form>
    )
}

export default FormPopup;