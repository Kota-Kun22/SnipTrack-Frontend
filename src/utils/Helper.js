import { subDomainList } from "./const";


export const getApps = () => {
    const subdomain = getSubDomain(window.location.hostname);

    const mainApp = subDomainList.find((app) => app.main);
    if (subdomain === "") return mainApp.app; 

    const apps = subDomainList.find((app) => subdomain === app.subdomain);

    return apps ? apps.app : mainApp.app;
}

// url.localhost like here i will spilt into 2 parts in localhost
// url.urlbestshort.com like here i will spilt into 3 parts in production
export const getSubDomain = (hostname) => {
    console.log("Current hostname:", hostname); // Debug log
    
    const parts = hostname.split('.');
    
    // For localhost with subdomain like "url.localhost:5173"
    if (hostname.includes('localhost')) {
        // If it's "url.localhost" or "url.localhost:5173"
        if (parts.length >= 2 && parts[0] !== 'localhost' && parts[0] !== 'www') {
            return parts[0]; // Return "url"
        }
        return ""; // No subdomain for main localhost
    }
    
    // For production domains
    if (parts.length > 2) {
        return parts[0];
    }
    
    return "";
};