const currentTemp = document.querySelector('.current');

// My API key
const myAPI = '6f3bf18df5dd39d2e4dbbdffb43ff880';
// Location for the API call
const lat = 49.75;
const lon = 6.64;

// Imperial units for Fahrenheit
const units = 'imperial';

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myAPI}&units=${units}`;

async function getWeather() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // For my testing only
            displayWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

function displayWeather(data) {
    const weatherCard = document.createElement('div');
    const weatherContainer = document.createElement('div');
    const temperature = document.createElement('p');
    const weatherDesc = document.createElement('p');
    const high = document.createElement('p');
    const low = document.createElement('p');
    const humidity = document.createElement('p');
    const sunRise = document.createElement('p');
    const sunSet = document.createElement('p');
    const icon = document.createElement('img');

    weatherCard.setAttribute('class', 'weather-card');
    weatherContainer.setAttribute('class', 'weather-container');
    temperature.setAttribute('class', 'temperature');
    weatherDesc.setAttribute('class', 'weather-description');
    high.setAttribute('class', 'high');
    low.setAttribute('class', 'low');
    humidity.setAttribute('class', 'humidity');
    sunRise.setAttribute('class', 'sunrise');
    sunSet.setAttribute('class', 'sunset');
    icon.setAttribute('class', 'weather-icon');
    icon.setAttribute('src', `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    icon.setAttribute('alt', data.weather[0].description);

    temperature.innerHTML = `${data.main.temp}&deg;F`;
    weatherDesc.innerHTML = data.weather[0].description;
    high.innerHTML = `High: ${data.main.temp_max}&deg;F`;
    low.innerHTML = `Low: ${data.main.temp_min}&deg;F`;
    humidity.innerHTML = `Humidity: ${data.main.humidity}%`;

    // After trying these two lines and having them not work I researched more about how to convert the Unix timestamp to a date object and then get the hours and minutes from that date object.
    // sunRise.innerHTML = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString({ hour: '2-digit', minute: '2-digit' })}`;
    // sunSet.innerHTML = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString({ hour: '2-digit', minute: '2-digit' })}`;

    // Something still didn't seem right with the sunrise and sunset times. Then I realized that the times were in UTC and I needed to convert them to the local time zone of Europe/Berlin.
    const sunriseDate = new Date(data.sys.sunrise * 1000);
    const sunRiseFormatted = new Intl.DateTimeFormat('en-US', {timeStyle: 'short', timeZone: 'Europe/Berlin'}).format(sunriseDate);
    sunRise.innerHTML = `Sunrise: ${sunRiseFormatted}`;

    const sunsetDate = new Date(data.sys.sunset * 1000);
    const sunSetFormatted = new Intl.DateTimeFormat('en-US', {timeStyle: 'short', timeZone: 'Europe/Berlin'}).format(sunsetDate);
    sunSet.innerHTML = `Sunset: ${sunSetFormatted}`;

    weatherCard.appendChild(icon);
    weatherCard.appendChild(weatherContainer);
    weatherContainer.appendChild(temperature);
    weatherContainer.appendChild(weatherDesc);
    weatherContainer.appendChild(high);
    weatherContainer.appendChild(low);
    weatherContainer.appendChild(humidity);
    weatherContainer.appendChild(sunRise);
    weatherContainer.appendChild(sunSet);

    currentTemp.appendChild(weatherCard);
}

getWeather();