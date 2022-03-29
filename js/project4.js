const DateTime = luxon.DateTime;
let images = [];
let imagesSources = [
    "../assets/img/clear-background.jpg",
    "../assets/img/cloud-background.jpg",
    "../assets/img/default-background.jpg",
    "../assets/img/rain-background.jpg",
    "../assets/img/snow-background.jpg",
    "../assets/img/thunderstorm-background.jpg",
    "https://www.metaweather.com/static/img/weather/sn.svg",
    "https://www.metaweather.com/static/img/weather/sl.svg",
    "https://www.metaweather.com/static/img/weather/h.svg",
    "https://www.metaweather.com/static/img/weather/t.svg",
    "https://www.metaweather.com/static/img/weather/hr.svg",
    "https://www.metaweather.com/static/img/weather/lr.svg",
    "https://www.metaweather.com/static/img/weather/s.svg",
    "https://www.metaweather.com/static/img/weather/hc.svg",
    "https://www.metaweather.com/static/img/weather/lc.svg",
    "https://www.metaweather.com/static/img/weather/c.svg",
]

main();

function main() {
    initSearchEvent();
    initCitiesEvent();
    //Preload images
    preloadImages(...imagesSources);
}



//Event init Functions
function initSearchEvent() {
    let searchBtn = document.getElementById('searchBtn');
    searchBtn.onclick = searchCity;
}

function initCitiesEvent() {
    let selectElement = document.querySelector("#cities");
    let originalF = selectElement.onchange;
    selectElement.onchange = async function() {
        loadingAlert();
        var index = this.selectedIndex;
        this.selectedIndex = index;
        var woeid = this.children[index].value;
        localStorage.setItem('woeid', woeid);
        changeWeatherInfo();
    }
}

//Search a city
async function searchCity() {
    searchingAlert();
    //Search the city
    await fetchLocation();
    //City found?
    if (localStorage.getItem("woeid") == -1) return notFoundAlert();
    setCitiesOptions();
    changeWeatherInfo();
}

async function changeWeatherInfo() {
    //Search weather info
    await fetchWeather();
    //Set info on HTML
    setWeather(0);
    setBackground();
}

//Alert Functions
function searchingAlert() {
    Toastify({
        text: "Buscando",
        duration: 2000,
        style: {
            background: "linear-gradient(to right, #06beb6, #48b1bf)",
        }
    }).showToast();
}

function loadingAlert() {
    Toastify({
        text: "Cargando...",
        duration: 1000,
        style: {
            background: "linear-gradient(to right, #06beb6, #48b1bf)",
        }
    }).showToast();
}

function notFoundAlert() {
    Toastify({
        text: "Capital no encontrada!",
        duration: 2000,
        style: {
            background: "linear-gradient(to right, #ed213a, #93291e)",
        }
    }).showToast();
    return;
}



//DOM Functions

function setCitiesOptions() {
    let data = JSON.parse(localStorage.getItem("cities"));
    let selectElement = document.querySelector("#cities");
    selectElement.innerHTML = "";
    data.forEach(c => {
        let optionElement = document.createElement("option");
        optionElement.value = c.woeid;
        optionElement.innerText = c.title;
        selectElement.appendChild(optionElement);
    });

}

function setWeather(day) {
    //Find JSON info on LocalStorage and DOM parent div
    const data = JSON.parse(localStorage.getItem("data"));
    const {
        applicable_date: date,
        weather_state_abbr: abbr,
        weather_state_name: state,
        the_temp: temp,
        min_temp: minTemp,
        max_temp: maxTemp,
    } = data.consolidated_weather[day];
    localStorage.setItem("day", day);
    let weatherBody = document.querySelector(".weather__body");
    let dateFormatted = DateTime.fromISO(date).setLocale('es').toLocaleString(DateTime.DATE_HUGE);

    //Create DOM elements
    let titlesElement = document.createElement("div");
    let dateElement = document.createElement("p");
    let countryElement = document.createElement("h2");
    let cityElement = document.createElement("h3");
    let infoElement = document.createElement("div");
    let weatherIconElement = document.createElement("img");
    let weatherStateElement = document.createElement("h3");
    let actualTemperatureElement = document.createElement("h4");
    let temperaturesElement = document.createElement("div");
    let minTemperatureElement = document.createElement("p");
    let maxTemperatureElement = document.createElement("p");
    let buttonsElement = document.createElement("div");

    //Set info and classes on elements
    titlesElement.className = "weather__titles";
    infoElement.className = "weather__info";
    temperaturesElement.className = "weather__temperatures";
    buttonsElement.className = "weather__buttons";
    dateElement.innerText = dateFormatted;
    countryElement.innerText = data.parent.title;
    cityElement.innerText = data.title;
    weatherIconElement.src = `https://www.metaweather.com/static/img/weather/${abbr}.svg`;
    weatherIconElement.width = 32;
    weatherStateElement.innerText = state;
    actualTemperatureElement.innerText = `${temp.toFixed(2)}°C`;
    minTemperatureElement.innerText = `Temperatura minima: ${minTemp.toFixed(2)}°C`;
    maxTemperatureElement.innerText = `Temperatura maxima: ${maxTemp.toFixed(2)}°C`;
    weatherBody.innerHTML = "";

    //Append elements 
    titlesElement.appendChild(countryElement);
    titlesElement.appendChild(cityElement);
    titlesElement.appendChild(dateElement);
    infoElement.appendChild(weatherIconElement);
    infoElement.appendChild(weatherStateElement);
    infoElement.appendChild(actualTemperatureElement);
    temperaturesElement.appendChild(minTemperatureElement);
    temperaturesElement.appendChild(maxTemperatureElement);
    setDaysButtons(buttonsElement);
    weatherBody.appendChild(titlesElement);
    weatherBody.appendChild(infoElement);
    weatherBody.appendChild(temperaturesElement);
    weatherBody.appendChild(buttonsElement);
    setSources(...data.sources);
}

//Set previus and next buttons on DOM
function setDaysButtons(parentElement) {
    let nextBtn = document.createElement("button");
    let previousBtn = document.createElement("button");
    nextBtn.id = "nextBtn";
    previousBtn.id = "previousBtn";
    nextBtn.innerText = ">";
    previousBtn.innerText = "<";
    nextBtn.onclick = () => {
        let day = parseInt(localStorage.getItem("day"));
        if (day >= 5) return;
        setWeather(day + 1);
        setBackground();
    };
    previousBtn.onclick = () => {
        let day = parseInt(localStorage.getItem("day"));
        if (day <= 0) return;
        setWeather(day - 1);
        setBackground();
    };
    parentElement.appendChild(previousBtn);
    parentElement.appendChild(nextBtn);
}

function setSources(...sources) {
    let pSources = document.querySelector(".weather__sources")
    let text = "Sources <br>";
    sources.forEach(s => text += `  ${s.title}`);
    pSources.innerHTML = text;
}


//Set Background image based on state
function setBackground() {
    const data = JSON.parse(localStorage.getItem("data"));
    const day = localStorage.getItem("day");
    const state = data.consolidated_weather[day].weather_state_name;
    const mainElement = document.getElementById("main");
    const set = function(file) {
        mainElement.style.backgroundImage = `url(../assets/img/${ file })`;
    }
    if (state == "Clear") {
        set("clear-background.jpg");
    } else if (state == "Light Cloud" || state == "Heavy Cloud") {
        set("cloud-background.jpg");
    } else if (state == "Showers" || state == "Light Rain" || state == "Heavy Rain") {
        set("rain-background.jpg");
    } else if (state == "Thunderstorm") {
        set("thunderstom-background.jpg");
    } else if (state == "Hail" || state == "Sleet" || state == "Snow") {
        set("snow-background.jpg");
    } else {
        set("default-background.jpg");
    }
}

//Fetch and Storage functions
async function fetchLocation() {
    let searchText = document.getElementById('searchTxt').value;
    let data = await fetchData(`https://immense-lake-21479.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${searchText}`);
    localStorage.setItem('woeid', data.length === 0 ? -1 : data[0].woeid);
    localStorage.setItem('cities', data.length === 0 ? -1 : JSON.stringify(data));
}

async function fetchWeather() {
    let woeid = localStorage.getItem('woeid');
    let data = await fetchData(`https://immense-lake-21479.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`);
    localStorage.setItem("data", JSON.stringify(data));
}

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function preloadImages(...imgUrl) {
    for (var i = 0; i < imgUrl.length; i++) {
        images[i] = new Image();
        images[i].src = imgUrl[i];
    }
}