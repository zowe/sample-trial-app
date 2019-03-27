import { BASE_URL } from "./config";
export function stripTrailingSlash(site) {
    // if site has an end slash (like: www.example.com/),
    // then remove it and return the site without the end slash
    return site.replace(/\/$/, '') // Match a forward slash / at the end of the string ($)
}

export function getBaseUrl() {
    if(BASE_URL==='' || BASE_URL === null ) return null
    return BASE_URL
}