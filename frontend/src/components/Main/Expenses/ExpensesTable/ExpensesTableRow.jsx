import React from "react";

const ExpensesTableRow = (props) => {

    const editExpenseFormClickHandler = () => {
        props.editExpenseForm(true, props.expense);
    }

    const deleteExpenseFormClickHandler = () => {
        props.deleteExpenseForm(true, props.expense);
    }

    let editExpenseButtonStyle;
    let deleteExpenseButtonStyle;
    if (!props.enable) {
        editExpenseButtonStyle = "bg-yellow-400 text-white px-2 py-1 rounded-md dropshadow-md hover:bg-yellow-600 active:bg-yellow-600";
        deleteExpenseButtonStyle = "bg-red-600 text-white ml-2 px-2 py-1 rounded-md dropshadow-md hover:bg-red-800 active:bg-red-800";
    }
    else {
        editExpenseButtonStyle = "bg-yellow-400 text-white px-2 py-1 rounded-md dropshadow-md";
        deleteExpenseButtonStyle = "bg-red-600 text-white ml-2 px-2 py-1 rounded-md dropshadow-md";
    }

    return (
        <tr className="odd:bg-slate-200 even:bg-slate-100 hover:odd:bg-slate-50"> 
            <td> {props.index + 1} </td>
            <td> {props.expense.expenseDate.split("T")[0]} </td>
            <td> {props.expense.expenseName} </td>
            <td> {props.expense.expenseCategory} </td>
            <td> {props.expense.expenseAmount} </td>
            <td className="flex flex-row"> 
                <button 
                    className={editExpenseButtonStyle} 
                    onClick={editExpenseFormClickHandler}
                    disabled={props.enable}
                >
                    Edit
                </button>

                <button 
                    className={deleteExpenseButtonStyle} 
                    onClick={deleteExpenseFormClickHandler}
                    disabled={props.enable}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default ExpensesTableRow;