import axios from "axios";

import BASE_URL from "../baseUrlAPI";

const registerAPI = async (firstName, lastName, email, password) => {
    const response = await axios.post(`${BASE_URL}/Users/Register`, {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: password
    });

    return response.data
}

export default registerAPI;