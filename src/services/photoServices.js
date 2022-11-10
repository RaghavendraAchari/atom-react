import axios from "axios";
import { USER_TOKEN } from "./authService";
import {getBaseURL} from './data';

const BASE_URL = getBaseURL();

export async function getAllPhotos(pageNumber){
    const url = BASE_URL + "/api/albumfeed/page/" + pageNumber;
    return await axios.get(url);
}

export async function getIndividualPhoto(id){
    const url = BASE_URL + "/api/photo/" + id;
    return await axios.get(url);
}

export async function postAlbumFeed(data){
    const url = BASE_URL + "/api/albumfeed";
    let token = sessionStorage.getItem(USER_TOKEN);
    if(token === null || token === undefined)
        throw new Error("Token Error");
    
    token = "Bearer "+ token;
    return axios.post(url, data,{
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        }
     });

}