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


const discData = await getDiscs();
console.log(discData); // Logs actual data


(async () => {
    const discData = await getDiscs();
    if (discData) {
        // Set and clear my discover div
        discover.innerHTML = '';

        // Randomize the order of discs
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
                <button>Learn More</button>
            `;
            discover.appendChild(discItem);
        });
    }
})();
