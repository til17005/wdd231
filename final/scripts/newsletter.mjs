/**************************
***      Newsletter     ***
**************************/
// Export variables to use for results
export const getString = window.location.search;

export const signupInfo = new URLSearchParams(getString);

export const intrests = (() => {
    const intrestList = [];
    if ((signupInfo.get('throwing-tips')) == 'true') {
        intrestList.push("Throwing Tips");
    }
    if ((signupInfo.get('disc-info')) == 'true') {
        intrestList.push("Disc Information");
    }
    if ((signupInfo.get('courses')) == 'true') {
        intrestList.push("Course Information");
    }
    if ((signupInfo.get('tips-tricks')) == 'true') {
        intrestList.push("Tips & Tricks");
    }
    return intrestList;
})();