/* Navigation */
// Variables to select the navigation button and the navigation bar
const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

// This function toggles the 'show' class on the navigation button and the navigation bar to be shown or hidden
navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});

/* My wayfinder */
// Vaiables to select all navigation links and the current URL
const navLinks = document.querySelectorAll('nav a');
const currentURL = window.location.href;

// This will loop through all navigation links and add the 'wayfinder' class to the link that matches the current URL
navLinks.forEach(link => {
    if (link.href === currentURL) {
        link.classList.add('wayfinder');
    }
});