import axios from "axios";

import BASE_URL from "../baseUrlAPI";

const createExpenseAPI = async (email, name, date, category, amount) => {
    const response = await axios.post(`${BASE_URL}/Expenses/Create`, {
        UserEmail: email, 
        Name: name,
        Date: date,
        Category: Number(category),
        Amount: amount
    });

    return response.data;
}

export default createExpenseAPI;