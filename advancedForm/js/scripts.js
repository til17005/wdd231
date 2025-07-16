const getString = window.location.search;
console.log(getString);

const myInfo = new URLSearchParams(getString);
console.log(myInfo);

console.log(myInfo.get('first'));
console.log(myInfo.get('last'));
console.log(myInfo.get('ordinance'));
console.log(myInfo.get('date'));
console.log(myInfo.get('location'));
console.log(myInfo.get('phone'));
console.log(myInfo.get('email'));

document.querySelector('#results').innerHTML = `
<p>Apointment for ${myInfo.get('first')} ${myInfo.get('last')}</p>
<p> Proxy ${myInfo.get('ordinance')} on ${myInfo.get('date')} in the ${myInfo.get('location')} Temple</p>
<p>Your Phone: ${myInfo.get('phone')}</p>
<p>${myInfo.get('email')}</p>
`;
