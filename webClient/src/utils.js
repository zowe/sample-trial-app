const config = require('./config.js');
export function stripTrailingSlash(site) {
    // if site has an end slash (like: www.example.com/),
    // then remove it and return the site without the end slash
    return site.replace(/\/$/, '') // Match a forward slash / at the end of the string ($)
}

export const BASE_URL = config.BASE_URL;
