import React, {useState, useEffect} from "react";

import IncomesTableRow from "./IncomesTableRow";
import getIncomesAPI from "../../../../data/APIs/Incomes/getIncomesAPI";

const IncomesTable = (props) => {
    const [incomes, setIncomes] = useState([]);
    const [sortBy, setSortBy] = useState("date");

    const [isLoading, setIsLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getIncomesAPI(props.emailLogin, sortBy);
                if (data.success) {
                    // the reason why using Object.values(data)[1] is because 
                    // the data is in object format, so we need to change into
                    // array, and the expenses data is in index 1, the index 0
                    // is for data.success 
                    // setExpenses(Object.values(data)[1]); 

                    setIncomes(Object.values(data)[1]);

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

    const editIncomeFormClickHandler = (condition, income) => {
        props.editIncomeForm(condition, income);
    }

    const deleteIncomeFormClickHandler = (condition, income) => {
        props.deleteIncomeForm(condition, income);
    }

    const sortByIncomeDateHandler = () => {
        setSortBy("date");
    }

    const sortByIncomeNameHandler = () => {
        setSortBy("name");
    }

    const sortByIncomeCategoryHandler = () => {
        setSortBy("category");
    }

    const sortByIncomeAmountHandler = () => {
        setSortBy("amount");
    }

    return (
        <section className="bg-slate-300 w-full relative mt-4 rounded-md drop-shadow-md overflow-x-auto z-0" style={{opacity: props.style.opacity}}>
            {isLoading ? (<h1 className="font-bold"> Loading... </h1>) :
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <td style={{ width: "5%" }}> No. </td>
                            <td style={{ width: "15%" }} className="cursor-pointer" onClick={sortByIncomeDateHandler}> Date </td>
                            <td style={{ width: "30%" }} className="cursor-pointer" onClick={sortByIncomeNameHandler}> Income </td>
                            <td style={{ width: "15%" }} className="cursor-pointer" onClick={sortByIncomeCategoryHandler}> Category </td>
                            <td style={{ width: "15%" }} className="cursor-pointer" onClick={sortByIncomeAmountHandler}> Amount </td>
                            <td style={{ width: "20%" }}> Action </td>    
                        </tr>
                    </thead>
                    <tbody>
                        {isEmpty ? 
                            <tr className="bg-slate-200 hover:bg-slate-50">
                                <td colSpan={6}> You don't have any incomes. </td>
                            </tr> :
                            incomes.map((income, index) => {
                                const categories = props.categories.find(category => Number(category.categoryId) === income.incomeCategory);

                                if (categories) {
                                    income.incomeCategory = categories.categoryName;
                                }                                    

                                return (
                                    <IncomesTableRow 
                                        income = {income} 
                                        key = {index} 
                                        index = {index}
                                        editIncomeForm = {editIncomeFormClickHandler}
                                        deleteIncomeForm = {deleteIncomeFormClickHandler}
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

export default IncomesTable;