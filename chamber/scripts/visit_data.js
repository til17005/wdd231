const visitData = document.querySelector('.visit_data');
const visitMessage = document.createElement('p');

// This is testing new Date() and localStorage functionality
// This will create a new Date object with the current date and time
// Not currently using. I thought about putting a date component on the page for the visits
const createVisitDate = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
const formatVisitDate = createVisitDate.toLocaleDateString('en-US', options);

// console.log(`Today's date is: ${formatVisitDate}`);


// Just for testing purposes, this will log the current date and time in the console using epoch time
// console.log(Date.now());

// This will retrieve the last epoch visit date from localStorage
function getVisitDate() {         
    return JSON.parse(localStorage.getItem('lastvisitdate'));
}

// console.log(`Last visit date was: ${getVisitDate()}`);

// Set the milliseconds in a day
const msToDays = 86400000;
// Get the last visit date from localStorage
const lastVisit = getVisitDate();
// Set now
const now = Date.now();
// Calculate the difference between now and the last visit date
const visitDiff = now - lastVisit;
// Calculate the number of days since the last visit
let daysSinceLastVisit = (visitDiff / msToDays).toFixed(0);

// For troubleshooting
// console.log(now);
// console.log(lastVisit);
// console.log(visitDiff);
// console.log(daysSinceLastVisit);

function displayVisitMessage() {
    if (!localStorage.getItem('lastvisitdate')) {     
         // If there is no last visit date display -->
        visitMessage.innerHTML = 'Welcome! Let us know if you have any questions.';
    } else {
        // If there is a last visit date display -->
        if (daysSinceLastVisit < 1) {
            visitMessage.innerHTML = 'Back so soon! Awesome!';
        } else if (daysSinceLastVisit > 1) {
            visitMessage.innerHTML = `You last visited ${daysSinceLastVisit} days ago.`;
        }
    }
    visitData.appendChild(visitMessage);
}

displayVisitMessage();

// This will set the localStorage with the Date.now() epoch date.
function setSVisitDate() {
    localStorage.setItem('lastvisitdate', Date.now());
}

setSVisitDate();