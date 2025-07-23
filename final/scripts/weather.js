const currentWeather = document.querySelector('.weather');

// My API key
const myAPI = '6f3bf18df5dd39d2e4dbbdffb43ff880';
// Location for the API call
const lat = 40.09;
const lon = -111.62;

// Imperial units for Fahrenheit
const units = 'imperial';

// URL for the current weather
const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myAPI}&units=${units}`;

// Function to fetch and display current weather data
async function getCurrentWeather() {
    try {
        const response = await fetch(currentWeatherURL);
        if (response.ok) {
            const weatherData = await response.json();
            console.log(weatherData); // For my testing only
            displayCurrentWeather(weatherData);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

function displayCurrentWeather(weatherData) {
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
    icon.setAttribute('src', `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`);
    icon.setAttribute('alt', weatherData.weather[0].description);

    temperature.innerHTML = `${Math.round(weatherData.main.temp)}&deg;F`;
    weatherDesc.innerHTML = weatherData.weather[0].description;
    high.innerHTML = `<span>High:</span> ${Math.round(weatherData.main.temp_max)}&deg;F`;
    low.innerHTML = `<span>Low:</span> ${Math.round(weatherData.main.temp_min)}&deg;F`;
    humidity.innerHTML = `<span>Humidity:</span> ${weatherData.main.humidity}%`;

    // Something still didn't seem right with the sunrise and sunset times. Then I realized that the times were in UTC and I needed to convert them to the local time zone of America/Denver.
    const sunriseDate = new Date(weatherData.sys.sunrise * 1000);
    const sunRiseFormatted = new Intl.DateTimeFormat('en-US', { timeStyle: 'short', timeZone: 'America/Denver' }).format(sunriseDate);
    sunRise.innerHTML = `<span>Sunrise:</span> ${sunRiseFormatted}`;

    const sunsetDate = new Date(weatherData.sys.sunset * 1000);
    const sunSetFormatted = new Intl.DateTimeFormat('en-US', { timeStyle: 'short', timeZone: 'America/Denver' }).format(sunsetDate);
    sunSet.innerHTML = `<span>Sunset:</span> ${sunSetFormatted}`;

    weatherCard.appendChild(icon);
    weatherCard.appendChild(weatherContainer);
    weatherContainer.appendChild(temperature);
    weatherContainer.appendChild(weatherDesc);
    weatherContainer.appendChild(high);
    weatherContainer.appendChild(low);
    weatherContainer.appendChild(humidity);
    weatherContainer.appendChild(sunRise);
    weatherContainer.appendChild(sunSet);

    currentWeather.appendChild(weatherCard);
}

getCurrentWeather();