import axios from "axios";
import {getBaseURL} from './data';

const BASE_URL = getBaseURL();

export async function getArtList(){
    const url = BASE_URL + "/art";
    return axios.get(url);
}

 