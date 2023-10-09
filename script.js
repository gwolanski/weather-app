let currentCity = "Denver";
const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");


searchBtn.addEventListener("click", updateLocation);

function updateLocation() {
    let locationInput = searchBar.value;
    if (locationInput !== "") {
        currentCity = locationInput;
        searchBar.innerHTML = "";

        getCurrentWeather(currentCity);
        getForecast(currentCity);
;    }

}

async function getCurrentWeather(location) {
    let currentWeatherURL =  "http://api.weatherapi.com/v1/current.json?key=2df0fe7fe5c54e55826132323230310&q=" + location;
    let locationDisplay = document.getElementById("current-location");
    let countryDisplay = document.getElementById("current-country");
    let currentRegion = "";
    let currentCountry = "";

    fetch(currentWeatherURL, {
        mode: 'cors'
    })
        .then(response => response.json())
        .then(jsonResponse => {
            console.log("jsonResponse: " + JSON.stringify(jsonResponse, null, 4))
            currentCity = jsonResponse.location.name;
            currentRegion = jsonResponse.location.region;
            currentCountry = jsonResponse.location.country;

            if (jsonResponse.location.country === "United States of America") {
                locationDisplay.innerHTML = currentCity + ", " + currentRegion;
            } else {
                locationDisplay.innerHTML = currentCity;
            }
            countryDisplay.innerHTML = currentCountry;

            updateCurrentWeather(jsonResponse);
        })
        // code below for displaying error message if city is invalid
        // .catch(error => )
}

function updateCurrentWeather(response) {
    let currentTempF = document.getElementById("current-temp");
    let currentCondition = document.getElementById("current-condition");
    let currentConditionIcon = document.getElementById("current-condition-icon")
    let feelsLikeF = document.getElementById("feels-like");
    let currentWind = document.getElementById("current-wind");

    currentCondition.innerHTML = response.current.condition.text;
    currentConditionIcon.innerHTML = "<img width=100px height=100px src=" + response.current.condition.icon + ">";
    currentTempF.innerHTML = Math.round(response.current.temp_f) + "°";
    feelsLikeF.innerHTML = "Feels like: " + Math.round(response.current.feelslike_f) + "°";
    currentWind.innerHTML = "Wind speed: " + response.current.wind_mph + " mph";
}

async function getForecast(location) {
    let forecastURL = "http://api.weatherapi.com/v1/forecast.json?key=2df0fe7fe5c54e55826132323230310&q=" + location + "&days=3";
    
    fetch(forecastURL, {
        mode: 'cors'
    })
        .then(forecastResponse => forecastResponse.json())
        .then(jsonForecastResponse => {
            console.log("jsonForecastResponse: " + JSON.stringify(jsonForecastResponse, null, 4))
        })
        updateForecast(location);
}

function updateForecast(response) {
    let todayDate = document.getElementById("today-date");
    let todayCondition = document.getElementById("today-forecast-icon");
    let todayMaxTemp = document.getElementById("today-max-temp");
    let todayMinTemp = document.getElementById("today-min-temp");

    let tomorrowDate = document.getElementById("tomorrow-date");
    let tomorrowCondition = document.getElementById("tomorrow-forecast-icon");
    let tomorrowMaxTemp = document.getElementById("tomorrow-max-temp");
    let tomorrowMinTemp = document.getElementById("tomorrow-min-temp");

    let thirdDayDate = document.getElementById("third-day-date");
    let thirdDayCondition = document.getElementById("third-day-forecast-icon");
    let thirdDayMaxTemp = document.getElementById("third-day-max-temp");
    let thirdDayMinTemp = document.getElementById("third-day-min-temp");

    console.log("getTodayDate:" + getTodayDate());
    console.log("getTomorrowDate: " + getTomorrowDate());
    console.log("getThirdDayDate: " + getThirdDayDate());
    
}

function getTodayDate() {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    let date = new Date().toLocaleDateString(undefined, options);
    const [month, day, year] = date.split("/");
    return `${year}-${month}-${day}`;
}

function getTomorrowDate() {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    let date = new Date();
    date.setDate(date.getDate() + 1);
    let localDate = date.toLocaleDateString(undefined, options);
    const [month, day, year] = localDate.split("/");
    return `${year}-${month}-${day}`;
}

function getThirdDayDate() {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    let date = new Date();
    date.setDate(date.getDate() + 2);
    let localDate = date.toLocaleDateString(undefined, options);
    const [month, day, year] = localDate.split("/");
    return `${year}-${month}-${day}`;
}

getCurrentWeather(currentCity);
getForecast(currentCity);