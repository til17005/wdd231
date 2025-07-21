const discover = document.querySelector('.discover');
const url = 'data/locations.json';

// Fetch and display member data from my local JSON file
const getLocations = async () => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const locationData = await response.json();
            return locationData;
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error('Error fetching locations:', error);
        return null;
    }
}

(async () => {
    const locationData = await getLocations();
    if (locationData) {
        // Set and clear the discover section
        discover.innerHTML = '';

        // I have addes 10 locations to my locations.json file. The assignment ask for 8 so I will pull eight with my broken (not truly random) randomizer

        // Randomize the order of locations
        const randomSet = locationData.locations.sort(() => Math.random() - 0.5);
        // Select the first 8 locations after randomization
        const selectedLocations = randomSet.slice(0, 8);

        // console.log(selectedLocations);

        // Loop through each location and create a new div for each
        selectedLocations.forEach(location => {
            // console.log(location);
            const locationItem = document.createElement('div');
            locationItem.innerHTML = `
                <h2>${location.name}</h2>
                <address>${location.address}</address>
                <figure>
                    <img src="images/${location.imagename}" alt="${location.name}" width="300" height="200" loading="lazy">
                </figure>                
                <p>${location.description}</p>                
                <button>Learn More</button>                
            `;
            discover.appendChild(locationItem);
        });
    }
})();