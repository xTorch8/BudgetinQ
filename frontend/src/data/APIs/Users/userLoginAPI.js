import axios from "axios";

import BASE_URL from "../baseUrlAPI";

const loginAPI = async (email, password) => {
    const response = await axios.post(`${BASE_URL}/Users/Login`, {
        Email: email,
        Password: password
    });

    return response.data
}

export default loginAPI