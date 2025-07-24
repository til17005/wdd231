/**************************
***        Discs        ***
**************************/
const discURL = 'https://discit-api.fly.dev/disc';

// Fetch and display disc data from the API
export const getDiscs = async () => {
    try {
        const response = await fetch(discURL);
        if (response.ok) {
            const discData = await response.json();
            return discData;
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error('Error fetching discs:', error);
        return null;
    }
}

/**************************
***        Modal        ***
**************************/
// Set my disc dialog element
const discDialog = document.querySelector('.disc-dialog');

// Function to show my disc modal
export function displayDiscDetails(disc) {
    discDialog.innerHTML = '';
    discDialog.innerHTML = `
        <h2>${disc.name}</h2>
        <p>Brand: <span>${disc.brand}</span></p>
        <p>Type: <span>${disc.category}</span></p>
        <figure>
            <img src="${disc.pic}" alt="${disc.brand} ${disc.name}" width="1" height="1" loading="lazy">
        </figure>
        <p>Speed: <span>${disc.speed}</span></p>
        <p>Glide: <span>${disc.glide}</span></p>
        <p>Turn: <span>${disc.turn}</span></p>
        <p>Fade: <span>${disc.fade}</span></p>
        <p>Stability: <span>${disc.stability}</span></p>
        <button class="close-dialog">❌</button>
    `;

    discDialog.showModal();

    const closeDialog = document.querySelector(".close-dialog");
    closeDialog.addEventListener("click", () => {
        discDialog.close();
    });
};