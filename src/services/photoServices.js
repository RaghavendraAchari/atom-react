import axios from "axios";
import {getBaseURL} from './data';

const BASE_URL = getBaseURL();

export async function getAllPhotos(){
    const url = BASE_URL + "/albumfeed";
    return await axios.get(url);
}

export async function getIndividualPhoto(id){
    const url = BASE_URL + "/photo/" + id;
    return await axios.get(url);
}