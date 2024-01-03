import React from "react";

const IncomesTableRow = (props) => {
    const editIncomeFormClickHandler = () => {
        props.editIncomeForm(true, props.income);
    }

    const deleteIncomeFormClickHandler = () => {
        props.deleteIncomeForm(true, props.income);
    }

    let editIncomeButtonStyle;
    let deleteIncomeButtonStyle;
    if (!props.enable) {
        editIncomeButtonStyle = "bg-yellow-400 text-white px-2 py-1 rounded-md dropshadow-md hover:bg-yellow-600 active:bg-yellow-600";
        deleteIncomeButtonStyle = "bg-red-600 text-white ml-2 px-2 py-1 rounded-md dropshadow-md hover:bg-red-800 active:bg-red-800";
    }
    else {
        editIncomeButtonStyle = "bg-yellow-400 text-white px-2 py-1 rounded-md dropshadow-md";
        deleteIncomeButtonStyle = "bg-red-600 text-white ml-2 px-2 py-1 rounded-md dropshadow-md";
    }

    return (
        <tr className="odd:bg-slate-200 even:bg-slate-100 hover:odd:bg-slate-50"> 
            <td> {props.index + 1} </td>
            <td> {props.income.incomeDate.split("T")[0]} </td>
            <td> {props.income.incomeName} </td>
            <td> {props.income.incomeCategory} </td>
            <td> {props.income.incomeAmount} </td>
            <td className="flex flex-row"> 
                <button 
                    className={editIncomeButtonStyle} 
                    onClick={editIncomeFormClickHandler}
                    disabled={props.enable}
                >
                    Edit
                </button>

                <button 
                    className={deleteIncomeButtonStyle} 
                    onClick={deleteIncomeFormClickHandler}
                    disabled={props.enable}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default IncomesTableRow;