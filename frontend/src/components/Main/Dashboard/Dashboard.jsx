import React, {useState, useEffect} from "react";

import Expenses from "../Expenses/Expenses";
import CreateExpensesForm from "../Expenses/CreateExpensesForm/CreateExpensesForm";
import EditExpensesForm from "../Expenses/EditExpensesForm/EditExpensesForm";
import DeleteExpensesForm from "../Expenses/DeleteExpensesForm/DeleteExpensesForm";

import Incomes from "../Incomes/Incomes";
import CreateIncomeForm from "../Incomes/CreateIncomeForm/CreateIncomeForm";
import EditIncomeForm from "../Incomes/EditIncomeForm/EditIncomeForm";
import DeleteIncomeForm from "../Incomes/DeleteIncomeForm/DeleteIncomeForm";


import Wrapper from "../../../template/Wrapper";
import ButtonNavigation from "../../../template/ButtonNavigation";

import getCategoriesAPI from "../../../data/APIs/ExpensesCategories/getCategoriesAPI";
import getIncomesCategoriesAPI from "../../../data/APIs/IncomesCategories/getIncomesCategoriesAPI";


const Dashboard = (props) => {
    // determine which expense to edit or delete.
    const [expenses, setExpenses] = useState([]);
    // expenseCategory based on the database.
    const [expensesCategories, setExpensesCategories] = useState([]);

    // determine whether the create expense button is clicked or not.
    const [isCreateExpenseFormClicked, setIsCreateExpenseFormClicked] = useState(false);
    // determine whether the edit expense button is clicked or not.
    const [isEditExpenseFormClicked, setIsEditExpenseFormClicked] = useState(false);
    // determine whether the delete expense button is clicked or not.
    const [isDeleteExpenseFormClicked, setIsDeleteExpenseFormClicked] = useState(false);

    // determine which income to edit or delete.
    const [incomes, setIncomes] = useState([]);
    // incomeCategory based on the database.
    const [incomesCategories, setIncomesCategories] = useState([]);

    // determine whether the create income button is clicked or not.
    const [isCreateIncomeFormClicked, setIsCreateIncomeFormClicked] = useState(false);
    // determine whether the edit income button is clicked or not.
    const [isEditIncomeFormClicked, setIsEditIncomeFormClicked] = useState(false);
    // determine whether the delete income button is clicked or not.
    const [isDeleteIncomeFormClicked, setIsDeleteIncomeFormClicked] = useState(false);

    // set the opacity style.
    // whenever a form is trigger, the opacity will be 0.2.
    // however, if there isn't any form trigger (normal condition),
    // the opacity will be 1.
    const [opacity, setOpacity] = useState(1);

    // determine whether the expenses button is clicked or not.
    const [isExpensesButtonClicked, setIsExpensesButtonClicked] = useState(true);
    // determine whether the incomes button is clicked or not.
    const [isIncomesButtonClicked, setIsIncomesButtonClicked] = useState(false);

    // this function will run whenever the create expense button is clicked.
    // when the button is clicked, the CreateExpensesForm component will occur.
    const createExpenseFormClickHandler = () => {
        setIsCreateExpenseFormClicked(true);
        setOpacity(0.2);
    }

    // this function will run whenever the close button 
    // on the CreateExpensesForm is clicked or the proccess of
    // create expense is successful.
    const closeCreateExpenseFormHandler = () => {
        setIsCreateExpenseFormClicked(false);
        setOpacity(1);
    }

    // this function will run whenever the edit expense button is clicked.
    // when the button is clicked, the EditExpensesForm component will occur.
    const editExpenseFormClickHandler = (condition, expenses) => {
        setIsEditExpenseFormClicked(condition);
        setExpenses(expenses);
        setOpacity(0.2);
    }

    // this function will run whenever the close button 
    // on the EditExpensesForm is clicked or the proccess of
    // edit expense is successful.
    const closeEditExpenseFormHandler = () => {
        setIsEditExpenseFormClicked(false);
        setOpacity(1);
        setExpenses([]);
    }

    // this function will run whenever the delete expense button is clicked.
    // when the button is clicked, the DeleteExpensesForm component will occur.
    const deleteExpenseFormClickHandler = (condition, expenses) => {
        setIsDeleteExpenseFormClicked(condition);
        setOpacity(0.2);
        setExpenses(expenses);
    }

    // this function will run whenever the close button 
    // on the EditExpensesForm is clicked or the proccess of
    // edit expense is successful.
    const closeDeleteExpenseFormHandler = () => {
        setIsDeleteExpenseFormClicked(false);
        setOpacity(1);
        setExpenses([]);
    }    

    // this function will run whenever the create income button is clicked.
    // when the button is clicked, the CreateIncomeForm component will occur.
    const createIncomeFormClickHandler = () => {
        setIsCreateIncomeFormClicked(true);
        setOpacity(0.2);
    }

    // this function will run whenever the close button 
    // on the CreateIncomeForm is clicked or the proccess of
    // create expense is successful.
    const closeCreateIncomeExpenseFormHandler = () => {
        setIsCreateIncomeFormClicked(false);
        setOpacity(1);
    }

    // this function will run whenever the edit income button is clicked.
    // when the button is clicked, the EditIncomeForm component will occur.
    const editIncomeFormClickHandler = (condition, incomes) => {
        setIsEditIncomeFormClicked(condition);
        setIncomes(incomes);
        setOpacity(0.2);
    }

    // this function will run whenever the close button 
    // on the EditIncomeForm is clicked or the proccess of
    // edit income is successful.
    const closeEditIncomeFormHandler = () => {
        setIsEditIncomeFormClicked(false);
        setOpacity(1);
        setIncomes([]);
    }

    // this function will run whenever the delete income button is clicked.
    // when the button is clicked, the DeleteIncomeForm component will occur.
    const deleteIncomeFormClickHandler = (condition, incomes) => {
        setIsDeleteIncomeFormClicked(condition);
        setOpacity(0.2);
        setIncomes(incomes);
    }

    // this function will run whenever the close button 
    // on the DeleteExpenseForm is clicked or the proccess of
    // delete expense is successful.
    const closeDeleteIncomeFormHandler = () => {
        setIsDeleteIncomeFormClicked(false);
        setOpacity(1);
    }    

    // this function will run whenever the show expenses button is clicked.
    // when the button is clicked, it will show the Expenses component.
    const showExpensesClickHandler = () => {
        setIsExpensesButtonClicked(true);
        setIsIncomesButtonClicked(false);
    }

    // this function will run whenever the show incomes button is clicked.
    // when the button is clicked, it will show the Incomes component.
    const showIncomesClickHandler = () => {
        setIsExpensesButtonClicked(false);
        setIsIncomesButtonClicked(true);
    }

    // the useEffect will get all the categories set in the database
    // all the categories will store in the expensesCategories variable
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCategoriesAPI();

                if (data.success) {
                    setExpensesCategories(data.categories);      
                }                    
            }
            catch (error) {
                console.error(error);
            } 
        }
        fetchData();
    }, []);

    // the useEffect will get all the categories set in the database
    // all the categories will store in the incomeCategories variable
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getIncomesCategoriesAPI();

                if (data.success) {
                    setIncomesCategories(data.categories);      
                }                    
            }
            catch (error) {
                console.error(error);
            } 
        }
        fetchData();
    }, []);

    // these code will determine which form should occur
    let formContent;
    if (isCreateExpenseFormClicked) {
        formContent = 
            <CreateExpensesForm 
                closeForm = {closeCreateExpenseFormHandler} 
                emailLogin = {props.emailLogin}
                categories = {expensesCategories}
            />;
    }
    else if (isEditExpenseFormClicked) {
        formContent = 
            <EditExpensesForm 
                expense = {expenses}
                categories = {expensesCategories}
                closeExpenseForm = {closeEditExpenseFormHandler}
                emailLogin = {props.emailLogin}
            />;
    }
    else if (isDeleteExpenseFormClicked) {
        formContent = 
            <DeleteExpensesForm 
                expense = {expenses}
                closeExpenseForm = {closeDeleteExpenseFormHandler}
                emailLogin = {props.emailLogin}
            />;
    }
    else if (isCreateIncomeFormClicked) {
        formContent =
            <CreateIncomeForm 
                closeForm = {closeCreateIncomeExpenseFormHandler} 
                emailLogin = {props.emailLogin}
                categories = {incomesCategories}
            />;
    }
    else if (isEditIncomeFormClicked) {
        formContent = 
            <EditIncomeForm 
                income = {incomes}
                categories = {incomesCategories}
                closeIncomeForm = {closeEditIncomeFormHandler}
                emailLogin = {props.emailLogin}
            />
    }
    else if (isDeleteIncomeFormClicked) {
        formContent = 
            <DeleteIncomeForm 
                income = {incomes}
                closeIncomeForm = {closeDeleteIncomeFormHandler}
                emailLogin = {props.emailLogin}
            />
    }
    else{
        formContent = null;
    }

    // these code will determine which content should occur
    let content;
    if (isExpensesButtonClicked) {
        content = 
            <Expenses 
                opacity = {opacity}
                emailLogin = {props.emailLogin}
                isUpdate = {isCreateExpenseFormClicked || isEditExpenseFormClicked || isDeleteExpenseFormClicked}
                createExpenseForm = {createExpenseFormClickHandler}
                editExpenseForm = {editExpenseFormClickHandler}
                deleteExpenseForm = {deleteExpenseFormClickHandler}
                categories = {expensesCategories}
                enable = {isCreateExpenseFormClicked || isEditExpenseFormClicked || isDeleteExpenseFormClicked} 
            />        
    }
    else if (isIncomesButtonClicked) {
        content = 
            <Incomes 
                opacity = {opacity}
                emailLogin = {props.emailLogin}
                isUpdate = {isCreateIncomeFormClicked || isEditIncomeFormClicked || isDeleteIncomeFormClicked}
                createIncomeForm = {createIncomeFormClickHandler}
                editIncomeForm = {editIncomeFormClickHandler}
                deleteIncomeForm = {deleteIncomeFormClickHandler}
                categories = {incomesCategories}
                enable = {isCreateIncomeFormClicked || isEditIncomeFormClicked || isDeleteIncomeFormClicked}
            />
    }

    return (
        <section>
            {formContent}   

            <Wrapper width = "w-3/5" opacity = {opacity}>
                <h1 className="text-2xl mb-0"> Hellow </h1>
                <h1 className="text-2xl mt-0 font-bold"> {props.userLogin.firstName + " " + props.userLogin.lastName}! </h1>                
            </Wrapper>

            <section className="flex flex-col md:flex-row mt-8">
                <ButtonNavigation 
                    title = "Expenses"
                    click = {showExpensesClickHandler}
                    opacity = {opacity}
                    enable = {isCreateExpenseFormClicked || isEditExpenseFormClicked || isDeleteExpenseFormClicked} 
                />
                <ButtonNavigation 
                    title = "Incomes"
                    click = {showIncomesClickHandler} 
                    opacity = {opacity}
                    enable = {isCreateExpenseFormClicked || isEditExpenseFormClicked || isDeleteExpenseFormClicked} 
                />
            </section>

            {content}   
        </section>

    )
}

export default Dashboard;