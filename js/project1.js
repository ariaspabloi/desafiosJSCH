main();

function main() {
    let searchBtn = document.getElementById('searchBtn');
    searchBtn.onclick = search;
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
    localStorage.setItem("day", day);
    let weatherBox = document.querySelector(".weather__body");

    //Create DOM elements
    let titles = document.createElement("div");
    let date = document.createElement("p");
    let country = document.createElement("h2");
    let city = document.createElement("h3");
    let info = document.createElement("div");
    let weatherIcon = document.createElement("img");
    let weatherState = document.createElement("h3");
    let actualTemperature = document.createElement("h4");
    let temperatures = document.createElement("div");
    let minTemperature = document.createElement("p");
    let maxTemperature = document.createElement("p");
    let buttons = document.createElement("div");

    //Set info and classes on elements
    titles.className = "weather__titles";
    info.className = "weather__info";
    temperatures.className = "weather__temperatures";
    buttons.className = "weather__buttons";
    date.innerText = `Dia: ${data.consolidated_weather[day].applicable_date}`;
    country.innerText = data.parent.title;
    city.innerText = data.title;
    weatherIcon.src = `https://www.metaweather.com/static/img/weather/${data.consolidated_weather[day].weather_state_abbr}.svg`;
    weatherIcon.width = 32;
    weatherState.innerText = data.consolidated_weather[day].weather_state_name;
    actualTemperature.innerText = `${data.consolidated_weather[day].the_temp.toFixed(2)}°C`;
    minTemperature.innerText = `Temperatura minima: ${data.consolidated_weather[day].min_temp.toFixed(2)}°C`;
    weatherState.innerText = data.consolidated_weather[day].weather_state_name  ;
    maxTemperature.innerText = `Temperatura maxima: ${data.consolidated_weather[day].max_temp.toFixed(2)}°C`;
    weatherBox.innerHTML = "";

    //Append elements 
    titles.appendChild(country);
    titles.appendChild(city);
    titles.appendChild(date);
    info.appendChild(weatherIcon);
    info.appendChild(weatherState);
    info.appendChild(actualTemperature);
    temperatures.appendChild(minTemperature);
    temperatures.appendChild(maxTemperature);
    setDaysButtons(buttons);
    weatherBox.appendChild(titles);
    weatherBox.appendChild(info);
    weatherBox.appendChild(temperatures);
    weatherBox.appendChild(buttons);
}

//Set previus and next buttons on DOM
function setDaysButtons(weatherBox) {
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
    weatherBox.appendChild(previousBtn);
    weatherBox.appendChild(nextBtn);
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
    let data = await fetchData(`https://www.metaweather.com/api/location/search/?query=${searchText}`);
    localStorage.setItem('woeid', data.length===0 ? -1 : data[0].woeid);
}

async function weatherInfoSearch() {
    let woeid = localStorage.getItem('woeid');
    localStorage.setItem("data", JSON.stringify(await fetchData(`https://www.metaweather.com/api/location/${woeid}/`)));
}

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}