export function stripTrailingSlash(site) {
    // if site has an end slash (like: www.example.com/),
    // then remove it and return the site without the end slash
    return site.replace(/\/$/, '') // Match a forward slash / at the end of the string ($)
}

//export const BASE_URL = 'https://localhost:8544/ZLUX/plugins/org.zowe.zlux.sample.trialapp/services/trial/1.0.0/';
export const BASE_URL = 'https://my.mainframe.ibm.com:8544/ZLUX/plugins/org.zowe.zlux.sample.trialapp/services/trial/1.0.0/';
// export const BASE_URL = ZoweZLUX.uriBroker.pluginRESTUri(this.props.resources.pluginDefinition.getBasePlugin(), 'trial', "");
