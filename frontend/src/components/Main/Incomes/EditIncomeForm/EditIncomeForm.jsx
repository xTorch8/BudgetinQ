import React, {useState, useEffect} from "react";

import FormPopup from "../../../../template/FormPopup";
import Button from "../../../../template/Button";
import Input from "../../../../template/Input";
import ErrorMessage from "../../../../template/ErrorMessage";

import editIncomeAPI from "../../../../data/APIs/Incomes/editIncomeAPI";

const EditIncomeForm = (props) => {
    // edit income data
    const [name, setName] = useState(props.income.incomeName);
    const [date, setDate] = useState(props.income.incomeDate.split("T")[0]);
    const [category, setCategory] = useState(props.income.incomeCategory);
    const [amount, setAmount] = useState(props.income.incomeAmount);

    // error message
    const [errorMessage, setErrorMessage] = useState();
    const error = [];

    // input change handler
    const nameChangeHandler = (e) => {
        setName(e.target.value);
    }

    const dateChangeHandler = (e) => {
        setDate(e.target.value);
    }

    const categoryChangeHandler = (e) => {
        setCategory(e.target.value);
    }

    const amountChangeHandler = (e) => {
        setAmount(e.target.value);
    }

    // submit handler
    const editHandler = async (e) => {
        e.preventDefault();

        if (!category) {
            error.push("Please choose a category.");
        }

        if (error.length === 0) {
            try {
                const data = await editIncomeAPI(props.emailLogin, props.income.incomeId, name, date, Number(category), amount);
                if (data.success) {
                    props.closeIncomeForm();
                }
                else {
                    error.push(data.error);
                    console.log(data.error);
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        setErrorMessage(error);
    }

    // convert income category to id
    useEffect(() => {
        const index = props.categories.find(category => category.categoryName === props.income.incomeCategory);
        if (index) {
            setCategory(index.categoryId);
        }
    }, []);

    return (
        <FormPopup label = "Edit Income" submit = {editHandler} close = {props.closeIncomeForm}>
            <Input 
                id = "edit-name"
                label = "Name"
                type = "text"
                change = {nameChangeHandler}
                value = {name}
            />            

            <Input 
                id = "edit-amount"
                label = "Amount"
                type = "number"
                change = {amountChangeHandler}
                value = {amount}
            />   

            <section className="mt-4 flex flex-col lg:flex-row">
                <section className="w-full lg:w-1/4">
                    <label className="lg:float-right lg:mr-2" htmlFor="edit-category"> 
                        Category
                    </label>    
                </section>
                
                <section className="w-full lg:w-3/4">
                    <select 
                        className="w-full lg:w-5/6 px-1"
                        name="edit-category"
                        onChange={categoryChangeHandler}
                        value={category}
                    >
                        <option> Select Category </option>
                        {props.categories.map((category) => {
                            return (
                                <option 
                                    key={category.categoryId}
                                    value={category.categoryId}
                                >
                                    {category.categoryName}
                                </option>
                            )
                        })}
                    </select>
                </section>  
            </section>

            <Input 
                id = "edit-date"
                label = "Date"
                type = "date"
                change = {dateChangeHandler}
                value = {date}
            />               

            <ErrorMessage 
                error = {errorMessage}
            />

            <Button 
                color = "text-white"
                background = "bg-yellow-400"
                backgroundHover = "bg-yellow-600"
                backgroundActive = "bg-yellow-600"
                title = "Submit"
                type = "submit"            
            />                                         
        </FormPopup>
    )
}

export default EditIncomeForm;