const url = 'data/members.json';
const cards = document.querySelector('#cards');

const getMemberData = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.table (data);
        displayMembers(data.companies);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

const displayMembers = (members) => {
    members.forEach(member => {
        const card = document.createElement('section');
        const div = document.createElement('div');
        const name = document.createElement('h2');
        const address = document.createElement('p');
        const phone = document.createElement('p');
        const website = document.createElement('a');
        const icon = document.createElement('img');

        name.textContent = member.name;
        div.setAttribute('class', 'company-name');
        address.textContent = `${member.address}`;
        phone.textContent = `${member.phone}`;
        website.textContent = `${member.website}`;
        website.setAttribute('href', member.website);
        website.setAttribute('target', '_blank');
        icon.setAttribute('src', member.icon);
        icon.setAttribute('alt', `Logo of ${member.name}`);
        icon.setAttribute('loading', 'lazy');
        icon.setAttribute('width', '48');
        icon.setAttribute('height', '48');

        div.appendChild(icon);
        div.appendChild(name); 

        card.appendChild(div);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        cards.appendChild(card);
    });
}

getMemberData();