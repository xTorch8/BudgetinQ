import axios from "axios";

import BASE_URL from "../baseUrlAPI";

const getIncomesAPI = async (email, sortBy) => {
    const response = await axios.get(`${BASE_URL}/Incomes/Get`, {
        params: {
            userEmail: email,
            sortBy: sortBy
        }
    });

    return response.data;
}

export default getIncomesAPI;