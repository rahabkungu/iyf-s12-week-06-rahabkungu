const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
const MAX_RECENT = 5;

const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherDisplay = document.getElementById("weather-display");
const historyList = document.getElementById("search-history");

const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");

async function fetchWeather(city) {
    const url =`${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    try {
        showLoading();
        hideError();

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) throw new Error("City not found");
            if (response.status === 401) throw new Error("API key not valid yet - new keys can take an hour to activate");
            throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        displayWeather(data);
        saveToHistory(data.name); 
    } catch (err) {
        // fetch itself rejects (typeError) only when there is no network at all
        showError(err.name === "TypeError" ? "Network error - check your connection" : err.message);
    } finally {
        hideLoading();
    }

}

function displayWeather(data) {
    hideError();

    cityName.textContent = `${data.name}, ${data.sys.country}`;

    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    temperature.textContent = `${Math.round(data.main.temp)}℃`;
    description.textContent = data.weather[0].description;
    feelsLike.textContent = `Feels like: ${Math.round(data.main.feels_like)}℃`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind: ${data.wind.speed} m/s`;
    pressure.textContent = `Pressure: ${data.main.pressure} hPa`;

    weatherDisplay.classList.remove("hidden");
}

function showLoading() {
    loading.classList.remove("hidden");
    weatherDisplay.classList.add("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(message) {
    error.textContent = message;
    error.classList.remove("hidden");
}

function hideError() {
    error.textContent = "";
    error.classList.add("hidden");
}

function loadHistory() {
    try {
        return JSON.parse(localStorage.getItem("recent")) || [];
    } catch {
        return [];
    }
}

function saveToHistory(city) {
    const filtered = MAX_RECENT.filter(item => item.toLowerCase() !== city.toLowerCase());
    filtered.unshift(city);
    recent = filtered.slice(0, MAX_RECENT);

    try {
        localStorage.setItem("recent", JSON.stringify(recent));
    } catch (e) {
        console.error("could not save to localstorage", e);
    }

    renderHistory();
}

function renderHistory() {
    if (!historyList) return;
    historyList.innerHTML = "";
    recent.forEach(city => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "history-item";
        btn.textContent = city;
        li.appendChild(btn);
        historyList.appendChild(li);
        
    });
}
let recent = loadHistory();

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
        cityInput.value ="";
    }
});

if (historyList) {
    historyList.addEventListener("click", (e) => {
        const btn = e.target.closest(".history-item");
        if (btn) {
            getWeather(btn.textContent);
        }
    });
}

renderHistory();

