/**************************
***      Set Year       ***
**************************/
// Variable to select the current year element
export const year = document.querySelector("#currentyear");
// Variable to get the current date
export const today = new Date();

/**************************
***    Last Modified    ***
**************************/
// Variable to select the last modified date element
export let lastModDate = new Date(document.lastModified);

/**************************
***      Timestamp      ***
**************************/
const now = new Date();

const setHours = String(now.getHours()).padStart(2, '0');
const setMinutes = String(now.getMinutes()).padStart(2, '0');
// +1 for the month becasue it starts at 0
const setMonth = String(now.getMonth() + 1).padStart(2, '0');
const setDay = String(now.getDate()).padStart(2, '0');
const setYear = now.getFullYear();

export const setTimestamp = `⌚ ${setHours}:${setMinutes} 📅 ${setMonth}/${setDay}/${setYear}`;