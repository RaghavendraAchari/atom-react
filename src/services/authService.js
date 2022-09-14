import axios from "axios";

const BASE_URL = "https://atombyraghav.herokuapp.com";

export const USER_TOKEN = "ATOM_ADMIN_USER_TOKEN";

export async function authenticate(username, password){
    const url = BASE_URL + "/authenticate";
    return axios.post(url,{
        userName:username,
        passWord:password
    });
}
