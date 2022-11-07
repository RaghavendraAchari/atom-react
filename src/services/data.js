const url = {
    production:"https://atombyraghav.azurewebsites.net/api",
    development:"http://localhost:8080/api"
}

let environment = "production";
//  let environment = "development";

const BASE_URL = url[environment];

export function getBaseURL(){
    return BASE_URL;
}

export const LINE_SPLIT = "\n";