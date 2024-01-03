import React from "react";

import IncomesTable from "./IncomesTable/IncomesTable";
import IncomesSummary from "./IncomesSummary/IncomesSummary";

import Wrapper from "../../../template/Wrapper";

const Incomes = (props) => {
    let addIncomeButtonStyle;

    if (!props.enable) {
        addIncomeButtonStyle = "bg-blue-400 text-white px-2 py-1 rounded-md dropshadow-md hover:bg-blue-600 active:bg-blue-600 hover:scale-110";
    }
    else {
        addIncomeButtonStyle = "bg-blue-400 text-white px-2 py-1 rounded-md dropshadow-md"
    }        
        
    return (
        <>
            {props.categories.length > 0 ?
                <>
                    <IncomesSummary 
                        opacity = {props.opacity}
                        emailLogin = {props.emailLogin}
                        categories = {props.categories}
                        isUpdate = {props.isUpdate}
                    />

                    <Wrapper>
                        <h1 className="text-2xl font-bold text-center" style={{opacity: props.opacity}}> Incomes </h1>

                        <button 
                            className={addIncomeButtonStyle}
                            style={{opacity: props.opacity}}
                            onClick={props.createIncomeForm}
                            disabled={props.enable}
                        >
                            Add Income
                        </button>

                        <IncomesTable 
                            emailLogin = {props.emailLogin}
                            editIncomeForm = {props.editIncomeForm}
                            deleteIncomeForm = {props.deleteIncomeForm}
                            isUpdate = {props.isUpdate} 
                            style={{opacity: props.opacity}}
                            categories = {props.categories}
                            enable = {props.enable}
                        /> 
                    </Wrapper>                   
                </>
                : <h1> Loading... </h1>
            }

        </>
    )
}

export default Incomes;