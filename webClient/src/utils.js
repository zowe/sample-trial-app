import { BASE_URL } from "./config";

let host = 'tvt5003.svl.ibm.com:7554';
if (typeof window.location !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname !== 'localhost' || process.env.NODE_ENV === 'production') {
        host = window.location.host;
    }
}

export function stripTrailingSlash(site) {
    // if site has an end slash (like: www.example.com/),
    // then remove it and return the site without the end slash
    return site.replace(/\/$/, '') // Match a forward slash / at the end of the string ($)
}
export function whichServer() {
    let server = host;
    if (window.location.hostname === 'tester.test.com') {
        server = 'tester.test.com:7443';
    }
    return server;
}

export function getBaseUrl() {
    if(BASE_URL==='' || BASE_URL === null ) return null
    return BASE_URL
}