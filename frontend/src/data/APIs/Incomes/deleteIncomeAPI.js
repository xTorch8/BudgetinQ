import axios from "axios";

import BASE_URL from "../baseUrlAPI";

const deleteIncomeAPI = async (email, id) => {
    const response = await axios.delete(`${BASE_URL}/Incomes/Delete`, {
        data: {
            UserEmail: email, 
            Id: id            
        },
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response.data;
}

export default deleteIncomeAPI;