const url = {
    production:"https://atom-test.azurewebsites.net",
    development:"http://localhost:8080"
}

let environment = "production";
//let environment = "development";

const BASE_URL = url[environment];

export function getBaseURL(){
    return BASE_URL;
}


export const LINE_SPLIT = "\n";