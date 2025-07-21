const tagline = document.querySelector('.tagline');
const url = 'data/tagline.json';

// Fetch and display tagline data from my local JSON file
const getTagline = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.taglines.length);
        tagline.textContent = `"${data.taglines[randomIndex]}"`;
    } catch (error) {
        console.error('Error fetching tagline:', error);
    }
};

getTagline();