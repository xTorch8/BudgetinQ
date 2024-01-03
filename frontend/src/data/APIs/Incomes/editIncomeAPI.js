import axios from "axios";

import BASE_URL from "../baseUrlAPI";

const editIncomeAPI = async (email, id, name, date, category, amount) => {
    const response = await axios.put(`${BASE_URL}/Incomes/Edit`, {
        UserEmail: email, 
        Id: id,
        Name: name,
        Date: date,
        Category: Number(category),
        Amount: amount
    });

    return response.data;
}

export default editIncomeAPI;