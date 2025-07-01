/* Set year */
// Variable to select the current year element
const year = document.querySelector("#currentyear");
// Variable to get the current date
const today = new Date();
// This will set the inner HTML to the current year
year.innerHTML = `<span class="currentyear">${today.getFullYear()}</span>`;

/* Last modified */
// Variable to select the last modified date element
let lastModDate = new Date(document.lastModified);
// This selects the element with the ID 'lastModified' and sets its text content to the last modified date in a "readable format"
// Readable format: meaning simple date and time string otherwise it would be a long string
// I put a sample of each output in the console
//console.log("Last modified date:", lastModDate);
//console.log("Last modified date:", lastModDate.toLocaleString());
document.getElementById("lastModified").textContent = "Last Modified: " + lastModDate.toLocaleString();