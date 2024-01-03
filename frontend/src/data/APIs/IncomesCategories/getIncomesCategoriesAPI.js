import axios from "axios";

import BASE_URL from "../baseUrlAPI";

const getIncomesCategoriesAPI = async () => {
    const response = await axios.get(`${BASE_URL}/IncomesCategories/Get`);
    return response.data;
}

export default getIncomesCategoriesAPI;