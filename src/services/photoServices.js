import axios from "axios";
import { USER_TOKEN } from "./authService";
import { getBaseURL } from './data';

const BASE_URL = getBaseURL();

export async function getAllPhotos(pageNumber, category) {
    const url = BASE_URL + "/api/albumfeed/" + pageNumber;
    return await axios.get(url, { params: { category: category } });
}

export async function getIndividualPhoto(id) {
    const url = BASE_URL + "/api/photo/" + id;
    return await axios.get(url);
}

export async function postAlbumFeed(data) {
    const url = BASE_URL + "/api/albumfeed";
    let token = sessionStorage.getItem(USER_TOKEN);
    if (token === null || token === undefined)
        throw new Error("Token Error");

    token = "Bearer " + token;
    return axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

}
export async function getDataByCategory(pageNumber, category) {
    const url = BASE_URL + "/api/albumfeed/";
    const pageSize = 10;
    const sortDirection = "asc";
    const sortField = "date";

    return axios.get(url, {
        params: {
            page: pageNumber,
            size: pageSize,
            sortOrder: sortDirection,
            sortField: sortField,
            filterBy: category
        }
    })
}