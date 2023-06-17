import { USER_TOKEN } from "./authService";
import { getBaseURL } from "./data";
import axios from "axios";

function getToken(){
    return sessionStorage.getItem(USER_TOKEN);
}

async function getAllArts(){
    let token = getToken();

    if(token !== undefined && token !== null){
        const url = getBaseURL() + "/api/admin/arts";
        token = "Bearer " + token;

        try {
            const { data } = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
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
                    date: element.date,
                    title: element.title,
                    description: element.description,
                    publishable: element.publishable
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
    throw Error("Sign in first!");
}

async function getAllAlbumFeeds(){
    let token = getToken();

    if(token !== undefined && token !== null){
        const url = getBaseURL() + "/api/admin/albumfeeds";
        token = "Bearer " + token;

        try {
            const { data } = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
    
            return data;
        } catch (e) {
            throw e;
        }
    }
    else
        throw Error("Sign In");
}

export default {
    getAllArts,
    getAllAlbumFeeds
}