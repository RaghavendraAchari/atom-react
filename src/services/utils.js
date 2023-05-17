export function getDriveViewLink(id){
    return `https://drive.google.com/uc?export=view&id=${id}`;
}

export function getDriveViewLinkByUrl(url){
    const id = getIdByDriveUrl(url);

    return `https://drive.google.com/uc?export=view&id=${id}`;
}

export function getDriveViewLinkById(id){
    return `https://drive.google.com/uc?export=view&id=${id}`;
}

export function getDriveDownloadLink(id){
    return `https://drive.google.com/uc?export=download&id=${id}`;
}

export function getIdByDriveUrl(url){
    const driveLink = "https://drive.google.com/file/d/";
    const str = url.slice(driveLink.length);
    const id = str.split("/")[0]; //get the first value after splitting 

    return id;
}

export function getSmallPreviewUrl(id) {
    return `https://lh3.google.com/u/1/d/${id}=s320`;
}

export function getLargePreviewUrl(id) {
    return `https://lh3.google.com/u/1/d/${id}`;
}

export function getLargePreviewUrlFromLink(link){
    if(link !== null && link !== undefined){
        return link.split("=")[0];
    }
}