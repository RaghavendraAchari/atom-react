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
