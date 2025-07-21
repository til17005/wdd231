// Select the current and forecast temperature containers
const currentTemp = document.querySelector('.current');
const forecastTemp = document.querySelector(".forecast");

// My API key
const myAPI = '6f3bf18df5dd39d2e4dbbdffb43ff880';
// Location for the API call
const lat = 40;
const lon = 111;

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
            //console.log(forecastData); // For my testing only
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

    temperature.innerHTML = `${Math.round(weatherData.main.temp)}&deg;F`;
    weatherDesc.innerHTML = weatherData.weather[0].description;
    high.innerHTML = `High: ${Math.round(weatherData.main.temp_max)}&deg;F`;
    low.innerHTML = `Low: ${Math.round(weatherData.main.temp_min)}&deg;F`;
    humidity.innerHTML = `Humidity: ${weatherData.main.humidity}%`;

    // After trying these two lines and having them not work I researched more about how to convert the Unix timestamp to a date object and then get the hours and minutes from that date object.
    // sunRise.innerHTML = `Sunrise: ${new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString({ hour: '2-digit', minute: '2-digit' })}`;
    // sunSet.innerHTML = `Sunset: ${new Date(weatherData.sys.sunset * 1000).toLocaleTimeString({ hour: '2-digit', minute: '2-digit' })}`;

    // Something still didn't seem right with the sunrise and sunset times. Then I realized that the times were in UTC and I needed to convert them to the local time zone of Europe/Berlin.
    const sunriseDate = new Date(weatherData.sys.sunrise * 1000);
    const sunRiseFormatted = new Intl.DateTimeFormat('en-US', { timeStyle: 'short', timeZone: 'Europe/Berlin' }).format(sunriseDate);
    sunRise.innerHTML = `Sunrise: ${sunRiseFormatted}`;

    const sunsetDate = new Date(weatherData.sys.sunset * 1000);
    const sunSetFormatted = new Intl.DateTimeFormat('en-US', { timeStyle: 'short', timeZone: 'Europe/Berlin' }).format(sunsetDate);
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
    const spanNumber0 = document.querySelector('.day0');
    const spanNumber1 = document.querySelector('.day1');
    const spanNumber2 = document.querySelector('.day2');

    spanNumber0.innerHTML = `${Math.round(forecastData.list[0].main.temp)}&deg;F`;
    spanNumber1.innerHTML = `${Math.round(forecastData.list[1].main.temp)}&deg;F`;
    spanNumber2.innerHTML = `${Math.round(forecastData.list[2].main.temp)}&deg;F`;
}

// THis is my function for creating "Today" and the names of the next two days: Depending on the current day of the week
function getWeatherDays() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const weatherDays = [];

    for (let i = 0; i < 3; i++) {
        // The % 7 is used to wrap around the daysOfWeek array
        const dayIndex = (today.getDay() + i) % 7;
        // Set today as Today then the next two days as the next days of the week
        // Basiclly if i is 0 then today, if i is 1 then tomorrow, if i is 2 then the day after tomorrow
        // those are the 3 days I'm displaying in the forecast
        let dayToday;
        if (i == 0) {
            dayToday = "Today";
        } else {
            dayToday = daysOfWeek[dayIndex];
        }
        // push will add the next day to the end of the array
        weatherDays.push(dayToday);
    }

    weatherDays.forEach((day, i) => {
        const forecastDiv = document.createElement('div');
        const forecastDays = document.createElement('p');
        const forecastSpan = document.createElement('span');

        forecastDiv.setAttribute('class', day);
        forecastDays.setAttribute('class', 'day');
        // Just a little trick to add the index of the array to the class of the span
        forecastSpan.setAttribute('class', `day${i}`);

        forecastDays.innerHTML = `${day}: `;

        forecastDays.appendChild(forecastSpan);
        forecastDiv.appendChild(forecastDays);

        forecastTemp.appendChild(forecastDiv);

        //console.log(`${i}: ${day}`);
    });

    //console.log(today);
    //console.log(weatherDays);
    
    
}

getWeatherDays();
getCurrentWeather();
getForecastWeather();
