main();

function main() {
    let searchBtn = document.getElementById('searchBtn');
    searchBtn.onclick = search;
}

async function search() {
    await locationSearch();
    await weatherInfoSearch();
    setInfo(0);
}

function setDaysButtons(weatherBox) {
    let nextBtn = document.createElement("button");
    let previousBtn = document.createElement("button");
    nextBtn.id = "nextBtn";
    previousBtn.id = "previousBtn";
    nextBtn.innerText = ">";
    previousBtn.innerText = "<";
    nextBtn.onclick = () => {
        let day = parseInt(localStorage.getItem("day"));
        if (day < 5) setInfo(day + 1);
    };
    previousBtn.onclick = () => {
        let day = parseInt(localStorage.getItem("day"));
        if (day > 0) setInfo(day - 1);
    };
    weatherBox.appendChild(previousBtn);
    weatherBox.appendChild(nextBtn);
}

function setInfo(day) {
    const data = JSON.parse(localStorage.getItem("data"));
    localStorage.setItem("day", day);
    let weatherBox = document.querySelector("#weatherInfo");

    let date = document.createElement("p");
    let country = document.createElement("h2");
    let city = document.createElement("h3");
    let weatherIcon = document.createElement("img");
    let weatherState = document.createElement("h3");
    let actualTemperature = document.createElement("h4");
    let minTemperature = document.createElement("p");
    let maxTemperature = document.createElement("p");

    date.innerText = `Dia: ${data.consolidated_weather[day].applicable_date}`;
    country.innerText = data.parent.title;
    city.innerText = data.title;
    weatherIcon.src = `https://www.metaweather.com/static/img/weather/${data.consolidated_weather[day].weather_state_abbr}.svg`;
    weatherIcon.width = 32;
    weatherState.innerText = data.consolidated_weather[day].weather_state_name;
    actualTemperature.innerText = `${data.consolidated_weather[day].the_temp}°C`;
    minTemperature.innerText = `Temperatura minima: ${data.consolidated_weather[day].min_temp}°C`;
    weatherState.innerText = data.consolidated_weather[day].weather_state_name;
    maxTemperature.innerText = `Temperatura maxima: ${data.consolidated_weather[day].max_temp}°C`;
    weatherBox.innerHTML = "";

    weatherBox.appendChild(date);
    setDaysButtons(weatherBox);
    weatherBox.appendChild(country);
    weatherBox.appendChild(city);
    weatherBox.appendChild(weatherIcon);
    weatherBox.appendChild(weatherState);
    weatherBox.appendChild(actualTemperature);
    weatherBox.appendChild(minTemperature);
    weatherBox.appendChild(maxTemperature);
    console.log();
    //data.consolidated_weather[0]
}

async function locationSearch() {
    let searchText = document.getElementById('searchTxt').value;
    let data = await fetchData(`https://www.metaweather.com/api/location/search/?query=${searchText}`);
    localStorage.setItem('woeid', data[0].woeid);
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