import React from "react"

const HeaderLogin = (props) => {
    return (
        <li className="mx-2">        
        <details>
            <summary > {props.userLogin.firstName + " " + props.userLogin.lastName} </summary>
            <section className="bg-white absolute hover:bg-slate-300 hover:scale-110">
                <button onClick={props.logout}>
                    Logout
                </button>                            
            </section>

        </details>
    </li>
    )
}

export default HeaderLogin;