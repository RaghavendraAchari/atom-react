import axios from "axios";
// import { USER_TOKEN } from "./authService";
import { getBaseURL } from './data';

const BASE_URL = getBaseURL();
const url = BASE_URL + "/api/categories";

export async function getCategoryList() {
    const response = await axios.get(url);
    if (response.status === 200) {
        return response.data
    }
    else throw Error();
}



