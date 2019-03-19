export function stripTrailingSlash(site) {
    // if site has an end slash (like: www.example.com/),
    // then remove it and return the site without the end slash
    return site.replace(/\/$/, '') // Match a forward slash / at the end of the string ($)
}