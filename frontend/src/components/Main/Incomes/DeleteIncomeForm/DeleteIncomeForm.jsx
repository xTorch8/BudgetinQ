import React, {useState} from "react";

import FormPopup from "../../../../template/FormPopup";
import Button from "../../../../template/Button";
import ErrorMessage from "../../../../template/ErrorMessage";

import deleteIncomeAPI from "../../../../data/APIs/Incomes/deleteIncomeAPI";

const DeleteIncomeForm = (props) => {
    // set error message
    const [errorMessage, setErrorMessage] = useState();
    const error = [];

    // submit handler
    const deleteHandler = async (e) => {
        e.preventDefault();

        try {
            const data = await deleteIncomeAPI(props.emailLogin, props.income.incomeId);
            if (data.success) {
                props.closeIncomeForm();
            }
            else {
                console.log(data.error);
                error.push(data.error);
            }
        }
        catch (error) {
            console.error(error);
        }
        
        setErrorMessage(error);
    }

    return (
        <FormPopup label = "Delete Income" submit = {deleteHandler} close = {props.closeIncomeForm}>
            <ErrorMessage 
                error = {errorMessage}
            />

            <Button
                color = "text-white"
                background = "bg-red-600"
                backgroundHover = "bg-red-800"
                backgroundActive = "bg-red-800"
                title = "Submit"
                type = "submit"
            />             
        </FormPopup>
    )
}

export default DeleteIncomeForm;