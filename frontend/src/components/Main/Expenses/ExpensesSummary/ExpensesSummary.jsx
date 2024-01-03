import React, {useState, useEffect} from "react";

import Wrapper from "../../../../template/Wrapper";

import getExpensesSummaryAPI from "../../../../data/APIs/Expenses/getExpensesSummaryAPI";

import PieChart from "../../../../template/PieChart";
import LineChart from "../../../../template/LineChart";

const ExpensesSummary = (props) => {
    const [categoryTotal, setCategoryTotal] = useState([]);
    const [monthlyTotal, setMonthlyTotal] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getExpensesSummaryAPI(props.emailLogin);

                if (data.success) {                    
                    if (Object.values(data)[1].length === 0) {
                        setIsEmpty(true);
                    }
                    else {
                        setIsEmpty(false);
                    }
                    
                    setCategoryTotal({
                        labels: Object.values(data)[1].map((data) => {
                            const categories = props.categories.find(category => Number(category.categoryId) === data.category);
                            data.category = categories.categoryName;

                            return data.category;
                        }), 
                        datasets: [
                            {
                                label: "Total Expenses",
                                data: Object.values(data)[1].map((data) => {
                                    return data.totalExpense;
                                }),
                                backgroundColor: [
                                    "#ffadad",
                                    "#ffd6a5",
                                    "#fdffb6",
                                    "#caffbf",
                                    "#9bf6ff",
                                    "#a0c4ff", 
                                    "#bdb2ff",
                                    "#ffc6ff"
                                ],
                                borderColor: "black",
                                borderWidth: 2
                            }
                        ]
                    });

                    setMonthlyTotal({
                        labels: Object.values(data)[2].map((data) => {
                           return (String(data.year) + "-" + String(data.month)) 
                        }),
                        datasets: [
                            {
                                label: "Total Expenses",
                                data: Object.values(data)[2].map((data) => {
                                    return data.totalExpense
                                }),
                                backgroundColor: [
                                    "#9bf6ff"
                                ],
                                borderColor: "black",
                                borderWidth: 2,
                                tension: 0.5
                            }
                        ]
                    });
                }
                else {
                    console.error(data.error);
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
    }, [props.isUpdate]);

    return (
        <Wrapper opacity = {props.opacity}>
            <h1 className="text-2xl font-bold text-center"> Expenses Summary </h1>
            {
                isLoading ? <h1> Loading...</h1> :
                isEmpty ? <h1> You don't have any expenses. </h1> : 
                <section className="flex flex-col md:flex-row justify-content items-scratch mt-4">
                    <section className="bg-slate-200 w-2/3 md:w-1/3 mx-auto md:mx-2 p-4 rounded-md dropshadow-md">
                        <h1 className="text-center font-bold"> Total Expenses Based on Category </h1>
                        <PieChart chartData = {categoryTotal}/>  
                    </section>

                    <section className="bg-slate-200 w-full mt-2 md:mt-0 md:w-2/3 mx-1 md:mx-2 p-4 rounded-md dropshadow-md">
                        <h1 className="text-center font-bold"> Total Expenses Based on Time Frame </h1>  
                        <LineChart chartData = {monthlyTotal}/>  
                    </section>                   
                </section>
            }
        </Wrapper>
    )
}

export default ExpensesSummary;