// Select the current and forecast temperature containers
const currentTemp = document.querySelector('.current');

const day = document.querySelector('.day');
const temperature = document.querySelector('.temperature');

// My API key
const myAPI = '6f3bf18df5dd39d2e4dbbdffb43ff880';
// Location for the API call
const lat = 49.75;
const lon = 6.64;

// Imperial units for Fahrenheit
const units = 'imperial';

// URL for the current weather
const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myAPI}&units=${units}`;
// URL for the forecast weather
const forecastWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${myAPI}&units=${units}`;

// Function to fetch and display current weather data
async function getCurrentWeather() {
    try {
        const response = await fetch(currentWeatherURL);
        if (response.ok) {
            const weatherData = await response.json();
            //console.log(weatherData); // For my testing only
            displayCurrentWeather(weatherData);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

// Function to fetch and display forecast weather data
async function getForecastWeather() {
    try {
        const response = await fetch(forecastWeatherURL);
        if (response.ok) {
            const forecastData = await response.json();
            console.log(forecastData); // For my testing only
            displayForecastWeather(forecastData);
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

    temperature.innerHTML = `${weatherData.main.temp}&deg;F`;
    weatherDesc.innerHTML = weatherData.weather[0].description;
    high.innerHTML = `High: ${weatherData.main.temp_max}&deg;F`;
    low.innerHTML = `Low: ${weatherData.main.temp_min}&deg;F`;
    humidity.innerHTML = `Humidity: ${weatherData.main.humidity}%`;

    // After trying these two lines and having them not work I researched more about how to convert the Unix timestamp to a date object and then get the hours and minutes from that date object.
    // sunRise.innerHTML = `Sunrise: ${new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString({ hour: '2-digit', minute: '2-digit' })}`;
    // sunSet.innerHTML = `Sunset: ${new Date(weatherData.sys.sunset * 1000).toLocaleTimeString({ hour: '2-digit', minute: '2-digit' })}`;

    // Something still didn't seem right with the sunrise and sunset times. Then I realized that the times were in UTC and I needed to convert them to the local time zone of Europe/Berlin.
    const sunriseDate = new Date(weatherData.sys.sunrise * 1000);
    const sunRiseFormatted = new Intl.DateTimeFormat('en-US', {timeStyle: 'short', timeZone: 'Europe/Berlin'}).format(sunriseDate);
    sunRise.innerHTML = `Sunrise: ${sunRiseFormatted}`;

    const sunsetDate = new Date(weatherData.sys.sunset * 1000);
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

// Function to display forecast weather data
function displayForecastWeather(forecastData) {

    const forecastContainer = document.createElement('div');
    forecastContainer.setAttribute('class', 'forecast-container');

    forecastData.list.forEach((forecast) => {
        const forecastCard = document.createElement('div');
        forecastCard.setAttribute('class', 'forecast-card');

        const date = document.createElement('p');
        date.setAttribute('class', 'forecast-date');
        date.innerHTML = new Date(forecast.dt * 1000).toLocaleDateString();

        const temperature = document.createElement('p');
        temperature.setAttribute('class', 'forecast-temperature');
        temperature.innerHTML = `${forecast.main.temp}&deg;F`;

        const weatherDesc = document.createElement('p');
        weatherDesc.setAttribute('class', 'forecast-description');
        weatherDesc.innerHTML = forecast.weather[0].description;

        forecastCard.appendChild(date);
        forecastCard.appendChild(temperature);
        forecastCard.appendChild(weatherDesc);
        forecastContainer.appendChild(forecastCard);
    });

    document.querySelector('#forecast').appendChild(forecastContainer);
}

getCurrentWeather();
getForecastWeather();


function getWeatherDays() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const weatherDays = [];

    for (let i = 0; i < 3; i++) {
        const dayIndex = (today.getDay() + i) % 7;
        weatherDays.push(daysOfWeek[dayIndex]);
    }

    // Display in the DOM
    const dayList = document.getElementById('day-list');
    dayList.innerHTML = ''; // Clear previous content

    weatherDays.forEach(day => {
        const li = document.createElement('li');
        li.textContent = day;
        dayList.appendChild(li);
    });

    //console.log(today);
    //console.log(weatherDays);
}

getWeatherDays();
