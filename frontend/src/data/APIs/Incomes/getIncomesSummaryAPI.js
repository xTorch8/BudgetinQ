import axios from "axios";

import BASE_URL from "../baseUrlAPI";

const getIncomesSummaryAPI = async (email) => {
    const response = await axios.get(`${BASE_URL}/Incomes/GetSummary`, {
        params: {
            userEmail: email
        }
    });

    return response.data;
}

export default getIncomesSummaryAPI;