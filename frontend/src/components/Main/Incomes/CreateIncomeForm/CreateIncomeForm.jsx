import React, {useState} from "react";

import FormPopup from "../../../../template/FormPopup";
import Button from "../../../../template/Button";
import Input from "../../../../template/Input";
import ErrorMessage from "../../../../template/ErrorMessage";

import createIncomeAPI from "../../../../data/APIs/Incomes/createIncomeAPI";

const CreateIncomeForm = (props) => {  
    // new expense data 
    const [name, setName] = useState();
    const [date, setDate] = useState();
    const [category, setCategory] = useState();
    const [amount, setAmount] = useState();

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
    const createHandler =  async (e) => {
        e.preventDefault();

        if (!category) {
            error.push("Please choose a category.");
        }

        if (error.length === 0) {
            try {
                const data = await createIncomeAPI(props.emailLogin, name, date, Number(category), amount);

                if (data.success) {
                    props.closeForm();
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

    return (
        <FormPopup label = "Add Income" submit = {createHandler} close = {props.closeForm}>            
            <Input
                id = "create-name"
                label = "Name"
                type = "text"
                change = {nameChangeHandler}
            />
            
            <Input
                id = "create-amount"
                label = "Amount"
                type = "number"
                change = {amountChangeHandler}
            />

            <section className="mt-4 flex flex-col lg:flex-row">
                <section className="w-full lg:w-1/4">
                    <label className="lg:float-right lg:mr-2" htmlFor="create-category"> 
                        Category
                    </label>    
                </section>
                
                <section className="w-full lg:w-3/4">
                    <select 
                        className="w-full lg:w-5/6 px-1"
                        name="create-category"
                        onChange={categoryChangeHandler}
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
                id = "create-date"
                label = "Date"
                type = "date"
                change = {dateChangeHandler}
            />  

            <ErrorMessage 
                error = {errorMessage}
            />

            <Button
                background = "bg-blue-400"
                backgroundHover = "bg-blue-600"
                backgroundActive = "bg-blue-600"
                color = "text-white"
                title = "Submit"
                type = "submit"
            />                                           
        </FormPopup>
    )
}

export default CreateIncomeForm;