const url = {
    production: "https://odd-teal-kangaroo-tie.cyclic.app",
    development: "http://localhost:7890"
}

let environment = "production";
// let environment = "development";

const BASE_URL = url[environment];

export function getBaseURL() {
    return BASE_URL;
}


export const LINE_SPLIT = "\n";