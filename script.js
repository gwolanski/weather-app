let currentCity = "Denver";
const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");
let fahrenheitDisplayed = true;
let celsiusDisplayed = false;
let unitConverter = document.getElementById("units-container");

let todayMaxTemp = document.getElementById("today-max-temp");
let todayMinTemp = document.getElementById("today-min-temp");

searchBtn.addEventListener("click", updateLocation);

function updateLocation() {
    let locationInput = searchBar.value;
    if (locationInput !== "") {
        currentCity = locationInput;
        searchBar.value = "";

        getCurrentWeather(currentCity);
        getForecast(currentCity);
    }
}

let fahrenheitToCelsius = (fahrenheit) => Math.round((fahrenheit - 32) * 5 / 9);

async function getCurrentWeather(location) {
    let currentWeatherURL =  "https://api.weatherapi.com/v1/current.json?key=2df0fe7fe5c54e55826132323230310&q=" + location;
    let locationDisplay = document.getElementById("current-location");
    let countryDisplay = document.getElementById("current-country");
    let currentRegion = "";
    let currentCountry = "";

    await fetch(currentWeatherURL, {
        mode: 'cors'
    })
        .then(response => response.json())
        .then(jsonResponse => {
            // console.log("jsonResponse: " + JSON.stringify(jsonResponse, null, 4))
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
        .catch(() => {
            alert("Error. Please enter a valid city.");
        })
}

function updateCurrentWeather(response) {
    let currentTemp = document.getElementById("current-temp");
    let currentCondition = document.getElementById("current-condition");
    let currentConditionIcon = document.getElementById("current-condition-icon")
    let feelsLike = document.getElementById("feels-like");
    let currentWind = document.getElementById("current-wind");

    currentCondition.innerHTML = response.current.condition.text;
    currentConditionIcon.innerHTML = "<img width=100px height=100px src=" + response.current.condition.icon + ">";
    currentTemp.innerHTML = Math.round(fahrenheitDisplayed ? response.current.temp_f : response.current.temp_c) + "°";
    feelsLike.innerHTML = "Feels like: " + Math.round(fahrenheitDisplayed ? response.current.feelslike_f : response.current.feelslike_c) + "°";
    currentWind.innerHTML = "Wind speed: " + Math.round(fahrenheitDisplayed ? response.current.wind_mph : response.current.wind_kph) + (fahrenheitDisplayed ? " mph" : " kph");
}

async function getForecast(location) {
    let forecastURL = "https://api.weatherapi.com/v1/forecast.json?key=2df0fe7fe5c54e55826132323230310&q=" + location + "&days=3";
    
    await fetch(forecastURL, {
        mode: 'cors'
    })
        .then(forecastResponse => 
            forecastResponse.json()
        )
        .then(jsonForecastResponse => {
            // console.log("jsonForecastResponse: " + JSON.stringify(jsonForecastResponse, null, 4));
            updateForecast(jsonForecastResponse);
        })
}

function updateForecast(response) {
    let forecastMaxTemp = [];
    let forecastMinTemp = [];
    let forecastCondition = [];

    for(let i=0; i < response.forecast.forecastday.length; i++) {       
        forecastMaxTemp.push(Math.round(response.forecast.forecastday[i].day.maxtemp_f));
        forecastMinTemp.push(Math.round(response.forecast.forecastday[i].day.mintemp_f));
        forecastCondition.push(response.forecast.forecastday[i].day.condition.icon);
    }
   
    let todayDate = document.getElementById("today-date");
    let todayCondition = document.getElementById("today-forecast-icon");

    todayDate.innerHTML = getTodayDateString();
    todayCondition.innerHTML = "<img width=80px height=80px src=" + forecastCondition[0] + ">";
    todayMaxTemp.innerHTML = "High: " + (fahrenheitDisplayed ? forecastMaxTemp[0] : fahrenheitToCelsius(forecastMaxTemp[0])) + "°";
    todayMinTemp.innerHTML = "Low: " + (fahrenheitDisplayed ? forecastMinTemp[0] : fahrenheitToCelsius(forecastMinTemp[0])) + "°";

    let tomorrowDate = document.getElementById("tomorrow-date");
    let tomorrowCondition = document.getElementById("tomorrow-forecast-icon");
    let tomorrowMaxTemp = document.getElementById("tomorrow-max-temp");
    let tomorrowMinTemp = document.getElementById("tomorrow-min-temp");

    tomorrowDate.innerHTML = getTomorrowDateString();
    tomorrowCondition.innerHTML = "<img width=80px height=80px src=" + forecastCondition[1] + ">";
    tomorrowMaxTemp.innerHTML = "High: " + (fahrenheitDisplayed ? forecastMaxTemp[1] : fahrenheitToCelsius(forecastMaxTemp[1])) + "°";
    tomorrowMinTemp.innerHTML = "Low: " + (fahrenheitDisplayed ? forecastMinTemp[1] : fahrenheitToCelsius(forecastMinTemp[1])) + "°";

    
    let thirdDayDate = document.getElementById("third-day-date");
    let thirdDayTitle = document.getElementById("third-day-title");
    let thirdDayCondition = document.getElementById("third-day-forecast-icon");
    let thirdDayMaxTemp = document.getElementById("third-day-max-temp");
    let thirdDayMinTemp = document.getElementById("third-day-min-temp");

    thirdDayDate.innerHTML = getThirdDayDateString();
    thirdDayTitle.innerHTML = getThirdDayName();
    thirdDayCondition.innerHTML = "<img width=80px height=80px src=" + forecastCondition[2] + ">";
    thirdDayMaxTemp.innerHTML = "High: " + (fahrenheitDisplayed ? forecastMaxTemp[2] : fahrenheitToCelsius(forecastMaxTemp[2])) + "°";
    thirdDayMinTemp.innerHTML = "Low: " + (fahrenheitDisplayed ? forecastMinTemp[2] : fahrenheitToCelsius(forecastMinTemp[2])) + "°";
}

function getTodayDateString() {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    let date = new Date().toLocaleDateString(undefined, options);
    const [month, day, year] = date.split("/");
    return `${year}-${month}-${day}`;
}

function getTomorrowDateString() {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    let date = new Date();
    date.setDate(date.getDate() + 1);
    let localDate = date.toLocaleDateString(undefined, options);
    const [month, day, year] = localDate.split("/");
    return `${year}-${month}-${day}`;
}

function getThirdDayDate() {
    let date = new Date();
    date.setDate(date.getDate() + 2);
    return date;
}

function getThirdDayDateString() {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    let thirdDayDate = getThirdDayDate();
    let localDate = thirdDayDate.toLocaleDateString(undefined, options);
    const [month, day, year] = localDate.split("/");
    return `${year}-${month}-${day}`;
}

function getThirdDayName() {
    let thirdDayDate = getThirdDayDate();
    let dayOfWeek = thirdDayDate.getDay();
    let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayName = daysOfWeek[dayOfWeek];
    return dayName;
}

unitConverter.addEventListener("click", unitConversion);

function unitConversion() {
    let celsius = document.querySelector(".celsius");
    let fahrenheit = document.querySelector(".fahrenheit");
    
    if (fahrenheitDisplayed) {
        fahrenheitDisplayed = false;
        celsiusDisplayed = true;

        fahrenheit.removeAttribute("id", "selected-unit");
        celsius.setAttribute("id", "selected-unit");
    } else {
        fahrenheitDisplayed = true;
        celsiusDisplayed = false;

        celsius.removeAttribute("id", "selected-unit");
        fahrenheit.setAttribute("id", "selected-unit");
    }

    getCurrentWeather(currentCity);
    getForecast(currentCity);
}

getCurrentWeather(currentCity);
getForecast(currentCity);