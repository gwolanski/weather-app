let currentCity = "Denver";
const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");


searchBtn.addEventListener("click", updateLocation);

function updateLocation() {
    let locationInput = searchBar.value;
    if (locationInput !== "") {
        currentCity = locationInput;
        console.log("currentLocation: " + currentCity);
        searchBar.innerHTML = "";

        getCurrentWeather(currentCity);
    }

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
            console.log("jsonResponse: " + jsonResponse)
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
    let feelsLike = document.getElementById("feels-like");
    let currentWind = document.getElementById("current-wind");


    currentTempF.innerHTML = response.current.temp_f;
    // currentCondition.innerHTML
}

getCurrentWeather(currentCity);