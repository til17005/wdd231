// This is what I have discovered in order to create timestamp with hh:mm mm/dd/yyy format
// .padStart pads the beginning of a sting
const setTimestamp = document.querySelector('.timestamp');
const now = new Date();

const setHours = String(now.getHours()).padStart(2, '0');
const setMinutes = String(now.getMinutes()).padStart(2, '0');
// +1 for the month becasue it starts at 0
const setMonth = String(now.getMonth() + 1).padStart(2, '0');
const setDay = String(now.getDate()).padStart(2, '0');
const setYear = now.getFullYear();

const getTimestamp = `⌚ ${setHours}:${setMinutes} 📅 ${setMonth}/${setDay}/${setYear}`;

const getString = window.location.search;
//console.log(getString);

const getInfo = new URLSearchParams(getString);
//console.log(getInfo);

// SetTimestamp param
getInfo.set('timestamp', getTimestamp);

document.querySelector('.results').innerHTML = `
<p>Name: ${getInfo.get('first')} ${getInfo.get('last')}</p>
<p>Organizational Title: ${getInfo.get('orgtitle')}</p>
<p>Email: ${getInfo.get('email')}</p>
<p>Phone: ${getInfo.get('phone')}</p>
<p>Organization Name: ${getInfo.get('orgname')}</p>
<p>Membership Level: ${getInfo.get('membership')}</p>
<p>Business Description:: ${getInfo.get('description')}</p>
<p>Submitted:  ${getInfo.get('timestamp')}</p>

`;