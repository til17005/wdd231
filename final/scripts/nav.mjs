// It seems pointless to put this into a module since it is only used in this file and becuase of how small it is
// but I am doing it anyway to keep with what has been taught and for the requirement of the final project

/**************************
***      Navigation     ***
**************************/
// Variables to select the navigation button and the navigation bar
export const navButton = document.querySelector('#nav-button');
export const navBar = document.querySelector('#nav-bar');

/**************************
***      Wayfinder      ***
**************************/
// Vaiables to select all navigation links and the current URL
export const navLinks = document.querySelectorAll('nav a');
export const currentURL = window.location.href;