import axios from "axios";
import { USER_TOKEN } from "./authService";
import { getBaseURL } from './data';

const BASE_URL = getBaseURL();

export async function getDataByCategory(pageNumber, category) {
    const url = BASE_URL + "/api/albumfeeds";
    const pageSize = 10;
    const sortDirection = "desc";
    const sortField = "date";

    if (category === "All")
        category = "all";

    const response = await axios.get(url, {
        params: {
            page: pageNumber,
            size: pageSize,
            sortOrder: sortDirection,
            sortField: sortField,
            category: category
        }
    });
    if (response.status === 200) {
        return response.data;
    }
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

export async function deleteAlbumFeed(album) {
    const url = BASE_URL + "/api/albumfeeds" + "/" + album._id;
    let token = sessionStorage.getItem(USER_TOKEN);
    if (token === null || token === undefined)
        throw new Error("Token Error");

    token = "Bearer " + token;
    const response = await axios.delete(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })

    if (response.status === 200 && response.data) {
        return true;
    } else {
        return false;
    }
}

export async function updateAlbumFeed(album) {
    const url = BASE_URL + "/api/albumfeeds" + "/" + album._id;
    let token = sessionStorage.getItem(USER_TOKEN);
    if (token === null || token === undefined)
        throw new Error("Token Error");

    token = "Bearer " + token;
    const response = await axios.put(url, album, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })

    if (response.status === 200 && response.data) {
        return true;
    } else {
        return false;
    }
}

export default {
    getDataByCategory,
    postAlbumFeed,
    deleteAlbumFeed,
    updateAlbumFeed
}