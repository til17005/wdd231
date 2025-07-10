const getURL = window.location.href;
//console.log(getURL);

// Set pageName by spiting the string into an array using / as the separator then pop returns the last entry in the array which is the page name
// I was going to try doing this with my getURL above, but pathname is a bit more simple to use as there is less information returned to deal with
const pageName = window.location.pathname.split("/").pop();
//console.log(pageName);


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
        if (pageName == 'directory.html') {
            displayMembers(data.companies);
        } else if (pageName == 'index.html') {
            // I first filter the list on the member level then I sort them using Math.random.
            // I found online that the - 0.5 will cause the random effect I want by assinging a possible negative
            // this keeps it more simple and it works in the browsers I have tested
            // https://stackoverflow.com/questions/42661936/whats-the-difference-between-math-random-0-5-and-math-random-0-5

            const memberLevelCheck = data.companies.filter(company =>
                company['member_level'] == 3 || company['member_level'] == 2
            );
            const randomSelect = memberLevelCheck.sort(() => Math.random() - .5);
            // It then take the frist 3 from the randomized order
            const selectedMembers = randomSelect.slice(0,3);

            displayMembers(selectedMembers);
        }
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
            const tag = document.createElement('p');
            const address = document.createElement('p');
            const phone = document.createElement('a');
            const website = document.createElement('a');
            const email = document.createElement('a');
            const icon = document.createElement('img');
            
            name.textContent = member.name;
            tag.textContent = member.tag_line;
            tag.setAttribute('class', 'tagline');
            div.setAttribute('class', 'company-name');
            address.textContent = `${member.address}`;
            phone.textContent = `${member.phone}`;
            phone.setAttribute('href', `tel:${member.phone}`);
            phone.setAttribute('class', 'phone');        
            website.textContent = `${member.website}`;
            website.setAttribute('href', member.website);
            website.setAttribute('target', '_blank');
            email.textContent = `${member.email}`;
            email.setAttribute('href', `mailto:${member.email}`);
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

        if (pageName == 'directory.html') {
            cards.appendChild(card);
        } else if (pageName == 'index.html') {
            const memberCard = document.createElement('section');
            const memberDiv = document.createElement('div');

            memberDiv.appendChild(icon);
            memberDiv.appendChild(email);
            memberDiv.appendChild(phone);
            memberDiv.appendChild(website);
            memberCard.appendChild(name);
            memberCard.appendChild(tag);
            memberCard.appendChild(memberDiv);

            businessCards.appendChild(memberCard);
        }

    });
}

// Call getMemberData. This will fetch the data from the JSON file and display it on the page using the displayMembers function.
getMemberData();


// I built this if statement when I found we needede to add directory info to the home page. These were contant issues as home does not use these listeners.
if (pageName == 'directory.html') {
    //console.log("It works");
    
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
} /* else {
    console.log("This is not direcctory.html");
} */