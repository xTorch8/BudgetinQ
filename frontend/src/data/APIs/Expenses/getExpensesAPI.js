import axios from "axios";

import BASE_URL from "../baseUrlAPI";

const getExpensesAPI = async (email, sortBy) => {
    const response = await axios.get(`${BASE_URL}/Expenses/Get`, {
        params: {
            userEmail: email,
            sortBy: sortBy
        }
    });

    return response.data;
}

export default getExpensesAPI;