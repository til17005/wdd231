const discover = document.querySelector('.discover');
const discURL = 'https://discit-api.fly.dev/disc';

// Fetch and display disc data from the API
const getDiscs = async () => {
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

        // Select the first 9 discs after randomization
        // I started with 10 discs from the API, but it looked off so I went to 12 and it was too crowded, so I settled on 9
        const selectedDiscs = randomSet.slice(0, 9);

        // Loop through each disc and create a new div for each
        selectedDiscs.forEach(disc => {
            const discItem = document.createElement('div');
            discItem.innerHTML = `
                <h2>${disc.name}</h2>
                <p>Brand: ${disc.brand}</p>
                <p>Type:${disc.category}</p>
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
    console.log(discData); // Log to console for debugging
})();


// Set my disc dialog element
const discDialog = document.querySelector('.disc-dialog');

// Function to show my disc modal
function displayDiscDetails(disc) {
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