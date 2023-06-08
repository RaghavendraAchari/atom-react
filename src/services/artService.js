import axios from "axios";
import { USER_TOKEN } from "./authService";
import { getBaseURL } from './data';

const BASE_URL = getBaseURL();
const url = BASE_URL + "/api/arts";

const size = 4;

export async function getArtList(page) {
    const params = {
        page,
        size,
        sortBy: "date",
        sortOrder: "desc"
    }

    try {
        const { data } = await axios.get(url, {
            params: params
        });

        const mappedData = data.arts.map(element => {
            return {
                _id: element._id,
                photos: [{
                    _id: 1,
                    originalFileUrl: element.originalFileUrl,
                    thumbnailUrl: element.thumbnailUrl,
                    midResUrl: element.midResUrl
                }],
                date: new Date(Date.parse(element.date)).toDateString(),
                title: element.title,
                description: element.description,
            };
        });
        return {
            ...data,
            arts: mappedData
        };
    } catch (e) {
        throw e;
    }
}

export async function uploadNewArt(data) {
    let token = sessionStorage.getItem(USER_TOKEN);
    if (token === null || token === undefined)
        return null;
    token = "Bearer " + token;
    return axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
}



