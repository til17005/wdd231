// This variable is used for if staements below to determine whcih pages to run scripts on to avoid errors when not needed on all pages
const getURL = window.location.pathname;
// console.log(getURL);

/**************************
***      Navigation     ***
**************************/
import { navButton, navBar } from './nav.mjs';

// This function toggles the 'show' class on the navigation button and the navigation bar to be shown or hidden
navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});

/**************************
***      Wayfinder      ***
**************************/
import { navLinks, currentURL } from './nav.mjs';

// This will loop through all navigation links and add the 'wayfinder' class to the link that matches the current URL
navLinks.forEach(link => {
    if (link.href === currentURL) {
        link.classList.add('wayfinder');
    }
});

/**************************
***    Visit Storage    ***
**************************/
import { getVisitStorage } from './storage.mjs';

if (getURL == '/final/index.html') {
    const name = document.querySelector('.name');
    const back = document.querySelector('.back')

    if (getVisitStorage()) {
        name.innerHTML = `${getVisitStorage()},`;
        back.innerHTML = 'back';
    }
}

/**************************
***      Newsletter     ***
**************************/
if (getURL == '/final/index.html') {
    const newsletter = document.querySelector('.newsletter');
    newsletter.addEventListener('click', () => {
        window.location.href = '/final/subscribe.html';
    });
}


import { getString, signupInfo, intrests } from './newsletter.mjs';
import { setTimestamp } from './date.mjs';
import { setVisitStorage } from './storage.mjs';
if (getURL == '/final/thanks.html') {
    console.log(getString);
    //console.log(signupInfo);

    //console.log(signupInfo.get('first'));
    //console.log(signupInfo.get('last'));
    //console.log(signupInfo.get('phone'));
    //console.log(signupInfo.get('email'));
    //console.log(signupInfo.get('expertise'));
    //console.log(signupInfo.get('throwing-tips'));
    //console.log(signupInfo.get('disc-info'));
    //console.log(signupInfo.get('courses'));
    //console.log(signupInfo.get('tips-tricks'));
    //console.log(signupInfo.get('frequency'));

    //console.log(intrests);

    // SetTimestamp param
    signupInfo.set('timestamp', setTimestamp);

    const formatIntrests = intrests.join(', ');

    document.querySelector('.results').innerHTML = `
    <p><span>Name:</span> ${signupInfo.get('first')} ${signupInfo.get('last')}</p>
    <p><span>Phone:</span>  ${signupInfo.get('phone')}</p>
    <p><span>Email:</span> ${signupInfo.get('email')}</p>
    <p><span>Expertise:</span> ${signupInfo.get('expertise')}</p>
    <p><span>Intrests:</span> ${formatIntrests}</p>
    <p><span>Frequency:</span> ${signupInfo.get('frequency')}</p>
    <p><span>Form Completion:</span> ${signupInfo.get('timestamp')}</p>
    `;

    setVisitStorage();
}

/**************************
***        Discs        ***
**************************/
import { getDiscs, displayDiscDetails } from './discs.mjs';
if (getURL == '/final/discs.html') {
    const discover = document.querySelector('.discover');

    // I set an empty array here so I can use it later outside the function
    let discData = [];

    (async () => {
        discData = await getDiscs();
        if (discData) {
            // Set and clear my discover div
            discover.innerHTML = '';

            // Randomize the order of discs - I have used this version of randomization in other parts of my project this term
            // It's a quick and easy way to randomize an array even though it is not the most accurate way
            const randomSet = discData.sort(() => Math.random() - 0.5);

            // Select the first 21 discs after randomization
            // I started with 10 discs from the API, but it looked off so I went to 12 and it was too crowded, so I settled on 9
            // until I reread the instructions to include at least 15
            const selectedDiscs = randomSet.slice(0, 21);

            // Loop through each disc and create a new div for each
            selectedDiscs.forEach(disc => {
                const discItem = document.createElement('div');
                discItem.innerHTML = `
                <h2>${disc.name}</h2>
                <p>Brand: ${disc.brand}</p>
                <p>Type: ${disc.category}</p>
                <figure>
                    <img src="${disc.pic}" alt="${disc.brand} ${disc.name}" width="1" height="1" loading="lazy">
                </figure>                
                <button class="more-info" id="${disc.id}">More Info</button>
            `;
                discover.appendChild(discItem);
            });

            // Add an event listener to the discover section. I used discover because of a play on words.
            document.querySelector('.discover').addEventListener('click', (event) => {
                if (event.target.classList.contains('more-info')) {
                    const discId = event.target.id;
                    const disc = discData.find(d => d.id === discId);

                    if (disc) {
                        displayDiscDetails(disc);
                    }
                }
            });

        }
        // console.log(discData); // Log to console for debugging
    })();
}


/**************************
***       Weather       ***
**************************/
import { getCurrentWeather } from './weather.mjs';

if (getURL == '/final/locate.html') {
    getCurrentWeather();
}

/**************************
***      Tagelines      ***
**************************/
// This script imports my getTagline function from the tagline module
// and executes it to display a random tagline on the page.
import { getTagline } from './tagline.mjs';

getTagline();


/**************************
***        Dates        ***
**************************/
// Here I'm importing the year, today, and lastModDate variables from the date module
import { year, today, lastModDate } from './date.mjs';

// This will set the inner HTML to the current year
year.innerHTML = `<span class="currentyear">${today.getFullYear()}</span>`;

// This selects the element with the ID 'lastModified' and sets its text content to the last modified date in a "readable format"
// Readable format: meaning simple date and time string otherwise it would be a long string
// I put a sample of each output in the console for testing purposes
//console.log("Last modified date:", lastModDate);
//console.log("Last modified date:", lastModDate.toLocaleString());
document.getElementById("lastModified").textContent = "Last Modified: " + lastModDate.toLocaleString();