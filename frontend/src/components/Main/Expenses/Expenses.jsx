import React from "react";

import ExpensesSummary from "./ExpensesSummary/ExpensesSummary";
import ExpensesTable from "./ExpensesTable/ExpensesTable";

import Wrapper from "../../../template/Wrapper";

const Expenses = (props) => {
    let addExpenseButtonStyle;

    if (!props.enable) {
        addExpenseButtonStyle = "bg-blue-400 text-white px-2 py-1 rounded-md dropshadow-md hover:bg-blue-600 active:bg-blue-600 hover:scale-110";
    }
    else {
        addExpenseButtonStyle = "bg-blue-400 text-white px-2 py-1 rounded-md dropshadow-md"
    }        
        

    return (
        <>
            {props.categories.length > 0 ?
                <>
                    <ExpensesSummary 
                        opacity = {props.opacity}
                        emailLogin = {props.emailLogin}
                        categories = {props.categories}
                        isUpdate = {props.isUpdate}
                    />

                    <Wrapper>
                        <h1 className="text-2xl font-bold text-center" style={{opacity: props.opacity}}> Expenses </h1>

                        <button 
                            className={addExpenseButtonStyle}
                            style={{opacity: props.opacity}}
                            onClick={props.createExpenseForm}
                            disabled={props.enable}
                        >
                            Add Expenses
                        </button>
                    
                        <ExpensesTable 
                            emailLogin = {props.emailLogin}
                            editExpenseForm = {props.editExpenseForm}
                            deleteExpenseForm = {props.deleteExpenseForm}
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

export default Expenses;