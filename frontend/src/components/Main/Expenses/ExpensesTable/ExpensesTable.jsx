import React, {useState, useEffect} from "react";

import ExpensesTableRow from "./ExpensesTableRow";
import getExpensesAPI from "../../../../data/APIs/Expenses/getExpensesAPI";

const ExpensesTable = (props) => {
    const [expenses, setExpenses] = useState([]);
    const [sortBy, setSortBy] = useState("date");

    const [isLoading, setIsLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getExpensesAPI(props.emailLogin, sortBy);
                if (data.success) {
                    // the reason why using Object.values(data)[1] is because 
                    // the data is in object format, so we need to change into
                    // array, and the expenses data is in index 1, the index 0
                    // is for data.success 
                    // setExpenses(Object.values(data)[1]); 

                    setExpenses(Object.values(data)[1]);

                    if (Object.values(data)[1].length === 0) {
                        setIsEmpty(true);
                    }
                    else {
                        setIsEmpty(false);
                    }
                }
                else {
                    console.log(data.error);
                }       
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchData();    
    }, [props.isUpdate, sortBy]);

    const editExpenseFormClickHandler = (condition, expense) => {
        props.editExpenseForm(condition, expense);
    }

    const deleteExpenseFormClickHandler = (condition, expense) => {
        props.deleteExpenseForm(condition, expense);
    }

    const sortByExpenseDateHandler = () => {
        setSortBy("date");
    }

    const sortByExpenseNameHandler = () => {
        setSortBy("name");
    }

    const sortByExpenseCategoryHandler = () => {
        setSortBy("category");
    }

    const sortByExpenseAmountHandler = () => {
        setSortBy("amount");
    }

    return (
        <section className="bg-slate-300 w-full relative mt-4 rounded-md drop-shadow-md overflow-x-auto z-0" style={{opacity: props.style.opacity}}>
            {isLoading ? (<h1 className="font-bold"> Loading... </h1>) :
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <td style={{ width: "5%" }}> No. </td>
                            <td style={{ width: "15%" }} className="cursor-pointer" onClick={sortByExpenseDateHandler}> Date </td>
                            <td style={{ width: "30%" }} className="cursor-pointer" onClick={sortByExpenseNameHandler}> Expense </td>
                            <td style={{ width: "15%" }} className="cursor-pointer" onClick={sortByExpenseCategoryHandler}> Category </td>
                            <td style={{ width: "15%" }} className="cursor-pointer" onClick={sortByExpenseAmountHandler}> Amount </td>
                            <td style={{ width: "20%" }}> Action </td>    
                        </tr>
                    </thead>
                    <tbody>
                        {isEmpty ? 
                            <tr className="bg-slate-200 hover:bg-slate-50">
                                <td colSpan={6}> You don't have any expenses. </td>
                            </tr> :
                            expenses.map((expense, index) => {
                                const categories = props.categories.find(category => Number(category.categoryId) === expense.expenseCategory);

                                if (categories) {
                                    expense.expenseCategory = categories.categoryName;
                                }                                    
                                
                                return (
                                    <ExpensesTableRow 
                                        expense = {expense} 
                                        key = {index} 
                                        index = {index}
                                        editExpenseForm = {editExpenseFormClickHandler}
                                        deleteExpenseForm = {deleteExpenseFormClickHandler}
                                        enable = {props.enable}
                                    />                            
                                )
                        })}
                    </tbody>
                </table>              
            }
        </section>
    )
}

export default ExpensesTable;