import axios from "axios";

import BASE_URL from "../baseUrlAPI";

const deleteExpenseAPI = async (email, id) => {
    const response = await axios.delete(`${BASE_URL}/Expenses/Delete`, {
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

export default deleteExpenseAPI;