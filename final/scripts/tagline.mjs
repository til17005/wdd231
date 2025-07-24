/**************************
***      Tagelines      ***
**************************/
// This script fetches a random taglines from my local tagline.json file and displays it on the page
const tagline = document.querySelector('.tagline');
const url = 'data/tagline.json';

// Exporting the getTagline function so it can be used in main.mjs
// Fetch and display a random tagline
export const getTagline = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.taglines.length);
        tagline.textContent = `"${data.taglines[randomIndex]}"`;
    } catch (error) {
        console.error('Error fetching tagline:', error);
    }
};