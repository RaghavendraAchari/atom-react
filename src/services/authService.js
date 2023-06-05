import axios from "axios";
import { getBaseURL } from "./data";

const BASE_URL = getBaseURL();
// const BASE_URL = "http://localhost:8080";

export const USER_TOKEN = "ATOM_ADMIN_USER_TOKEN";

export async function authenticate(username, password){
    const url = BASE_URL + "/token";
    return axios.post(url,{
        username:username,
        password:password
    });
}

export async function validateUser(token){
    const url = BASE_URL + "/validate";
    token = "Bearer " + token;
    return axios.post(url,{},{headers:{
        'Authorization': token
    }});
}

export async function logout(token){
    const url = BASE_URL + "/logout";
    token = "Bearer " + token;
    return axios.post(url,{},{headers:{
        'Authorization': token
    }});
}
