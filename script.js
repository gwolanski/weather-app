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
}

function updateForecast(response) {
    let maxTemp = document.getElementById()
}

getCurrentWeather(currentCity);
getForecast(currentCity);