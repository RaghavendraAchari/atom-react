import axios from "axios";

const BASE_URL = "https://atombyraghav.herokuapp.com";
// const BASE_URL = "http://localhost:8080";

export const USER_TOKEN = "ATOM_ADMIN_USER_TOKEN";

export async function authenticate(username, password){
    const url = BASE_URL + "/authenticate";
    return axios.post(url,{
        userName:username,
        passWord:password
    });
}

export async function validateUser(token){
    const url = BASE_URL + "/validate";
    token = "Bearer " + token;
    return axios.post(url,{},{headers:{
        'Authorization': token
    }});
}
