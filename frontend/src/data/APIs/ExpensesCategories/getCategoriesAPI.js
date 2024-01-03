import axios from "axios";

import BASE_URL from "../baseUrlAPI";

const getCategoriesAPI = async () => {
    const response = await axios.get(`${BASE_URL}/ExpensesCategories/Get`);
    return response.data;
}

export default getCategoriesAPI;