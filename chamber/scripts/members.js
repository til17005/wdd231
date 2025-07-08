/**** Create Cards ****/

// Fetch and display member data from my local JSON file
const url = 'data/members.json';
// Select the cards container where member data will be displayed
const cards = document.querySelector('#cards');
const businessCards = document.querySelector('.business-cards');

// Get (fetch) member data from my JSON file and display it using the displayMembers function below
const getMemberData = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.table (data); // Commented out for debugging purposes
        displayMembers(data.companies);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

// My function to create and display member cards
const displayMembers = (members) => {
    members.forEach(member => {
        const card = document.createElement('section');
        const div = document.createElement('div');
        const name = document.createElement('h2');
        const address = document.createElement('p');
        const phone = document.createElement('a');
        const website = document.createElement('a');
        const icon = document.createElement('img');

        name.textContent = member.name;
        div.setAttribute('class', 'company-name');
        address.textContent = `${member.address}`;
        phone.textContent = `${member.phone}`;
        phone.setAttribute('href', `tel:${member.phone}`);
        phone.setAttribute('class', 'phone');        
        website.textContent = `${member.website}`;
        website.setAttribute('href', member.website);
        website.setAttribute('target', '_blank');
        icon.setAttribute('src', member.icon);
        icon.setAttribute('alt', `Logo of ${member.name}`);
        icon.setAttribute('loading', 'lazy');
        icon.setAttribute('width', '48');
        icon.setAttribute('height', '48');

        div.appendChild(icon);
        div.appendChild(name); 

        card.appendChild(div);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        cards.appendChild(card);
    });
}

// Call getMemberData. This will fetch the data from the JSON file and display it on the page using the displayMembers function.
getMemberData();


/**** Adjust View ****/
// This section of code allows switching between the grid and list views.

// Select the grid and list buttons, and the display area for member cards
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const display = document.querySelector("#cards");

// This adds an event listener to the grid button. When clicked, it will switch the display to grid view.
gridButton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
});

// This adds an event listener to the list button. When clicked, it will switch the display to list view.
listButton.addEventListener("click", showList);

// This function switches the display to list view by adding the "list" class and removing the "grid" class.
function showList() {
    display.classList.add("list");
    display.classList.remove("grid");
}