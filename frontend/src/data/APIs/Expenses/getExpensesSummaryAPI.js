import axios from "axios";

import BASE_URL from "../baseUrlAPI";

const getExpensesSummaryAPI = async (email) => {
    const response = await axios.get(`${BASE_URL}/Expenses/GetSummary`, {
        params: {
            userEmail: email
        }
    });

    return response.data;
}

export default getExpensesSummaryAPI;