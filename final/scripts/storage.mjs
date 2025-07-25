import { signupInfo } from "./newsletter.mjs";

/**************************
***      Get Storage    ***
**************************/
export function getVisitStorage() {
    return (localStorage.getItem('name'));
}

/**************************
***      Set Storage    ***
**************************/
export function setVisitStorage() {
    localStorage.setItem('name', signupInfo.get('first'));    
}