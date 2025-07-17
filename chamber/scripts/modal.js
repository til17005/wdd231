const learnMore = document.querySelector('.membershipModal');
const url = 'data/memberships.json';

// Fetch and display member data from my local JSON file
const getMembershipLevels = async () => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const membershipData = await response.json();
            // console.log(membershipData);
            return membershipData;
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error('Error fetching membership levels:', error);
        return null
    }
}

// This added event listener waits for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // This selects all buttons in the document and adds a click event listener to each button
    document.querySelectorAll('.memberships button').forEach(button => {
        // When a button is clicked, it retrieves the class name of the button
        button.addEventListener('click', () => {
            const getClassName = button.className;
            //console.log(getClassName);

            (async () => {
                const levelData = await getMembershipLevels();
                //console.log(levelData);

                const selectedLevel = levelData.membership[getClassName];

                // Create modal 
                learnMore.innerHTML = '';
                learnMore.innerHTML = `
                    <button id="closeModal">❌</button>
                    <h2>${selectedLevel.name}</h2>
                    <p>Annual Cost: ${selectedLevel.cost}</p>
                    <ul>                        
                        ${selectedLevel.benefits.map(b => `<li>${b}</li>`).join('')}
                    </ul>
                `;

                learnMore.showModal();

                closeModal.addEventListener("click", () => {
                    learnMore.close();
                });
            })();
        });
    });
});