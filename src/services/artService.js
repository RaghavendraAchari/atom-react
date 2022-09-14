import axios from "axios";
import { USER_TOKEN } from "./authService";
import {getBaseURL} from './data';

const BASE_URL = getBaseURL();
const url = BASE_URL + "/art";



export async function getArtList(){
    return axios.get(url);
}

export async function uploadNewArt(data){
    let token = sessionStorage.getItem(USER_TOKEN);
    if(token === null || token === undefined)
        return null;
    token = "Bearer " + token;
    return axios.post(url, data,{
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        }
     });
}

 