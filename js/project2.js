let images = [];
main();

function main() {
    let searchBtn = document.getElementById('searchBtn');
    searchBtn.onclick = search;
    //Preload images
    preload(
        "../assets/img/clear-background.jpg",
        "../assets/img/cloud-background.jpg",
        "../assets/img/default-background.jpg",
        "../assets/img/rain-background.jpg",
        "../assets/img/snow-background.jpg",
        "../assets/img/thunderstorm-background.jpg"
    )
}

function preload(...imgUrl) {
    for (var i = 0; i < imgUrl.length; i++) {
        images[i] = new Image();
        images[i].src = imgUrl[i];
    }
}


//Search a city
async function search() {
    //Search the city
    await locationSearch();
    //City found?
    if (localStorage.getItem("woeid") == -1) return;
    //Search weather info
    await weatherInfoSearch();
    //Set info on HTML
    setInfo(0);
    setBackground();
}

function setInfo(day) {
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
    let weatherBox = document.querySelector(".weather");

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
    dateElement.innerText = `Dia: ${date}`;
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
    setSourcesText(...data.sources);
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
        setInfo(day + 1);
        setBackground();
    };
    previousBtn.onclick = () => {
        let day = parseInt(localStorage.getItem("day"));
        if (day <= 0) return;
        setInfo(day - 1);
        setBackground();
    };
    parentElement.appendChild(previousBtn);
    parentElement.appendChild(nextBtn);
}

function setSourcesText(...sources) {
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
async function locationSearch() {
    let searchText = document.getElementById('searchTxt').value;
    let data = await fetchData(`https://immense-lake-21479.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${searchText}`);
    localStorage.setItem('woeid', data.length === 0 ? -1 : data[0].woeid);
}

async function weatherInfoSearch() {
    let woeid = localStorage.getItem('woeid');
    localStorage.setItem("data", JSON.stringify(await fetchData(`https://immense-lake-21479.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`)));
}

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}