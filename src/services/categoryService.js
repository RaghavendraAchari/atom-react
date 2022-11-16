import axios from "axios";
// import { USER_TOKEN } from "./authService";
import {getBaseURL} from './data';

const BASE_URL = getBaseURL();
const url = BASE_URL + "/api/category";



export async function getCategoryList(){
    return axios.get(url);
}



 