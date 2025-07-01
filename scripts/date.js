//Set year
const year = document.querySelector("#currentyear");
const today = new Date();
year.innerHTML = `<span class="currentyear">${today.getFullYear()}</span>`;

// Last modified
let lastModDate = new Date(document.lastModified);
document.getElementById("lastModified").textContent = "Last Modified: " + lastModDate.toLocaleString();