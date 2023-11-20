const WeatherApp = class {
    constructor(apiKey, resultsBlockSelector) {
        this.apiKey = apiKey;
        this.resultsBlock = document.querySelector(resultsBlockSelector);

        this.CurrentWeatherLink = `https://api.openweathermap.org/data/2.5/weather?q={query}&appid=${apiKey}&units=metric&lang=pl`;
        this.forecastLink = `https://api.openweathermap.org/data/2.5/forecast?q={query}&appid=${apiKey}&units=metric&lang=pl`;
        this.currentWeather = undefined;
        this.forecast = undefined;
    }

    getCurrentWeather(query) {
        let url = this.CurrentWeatherLink.replace("{query}", query);
        let req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.addEventListener("load", () => {
            this.currentWeather = JSON.parse(req.responseText);
            console.log(this.currentWeather);
            this.drawWeather();
        });
        req.send();
    }

    getForecast(query) {
        let url = this.forecastLink.replace("{query}", query);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.forecast = data.list;
                this.drawWeather();
            });
    }

    getWeather(query) {
        this.getCurrentWeather(query);
        this.getForecast(query);
    }

    drawWeather() {
        this.resultsBlock.innerHTML = '';

        if (this.currentWeather) {
            const date = new Date(this.currentWeather.dt * 1000);
            const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
            const weatherBlock = this.createWeatherBlock(
                `${date.toLocaleDateString("pl-PL")} <span class="separator">|</span> ${formattedTime}`,
                this.currentWeather.main.temp,
                this.currentWeather.main.feels_like,
                this.currentWeather.weather[0].icon,
                this.currentWeather.weather[0].description
            );
            this.resultsBlock.appendChild(weatherBlock);
        }

        if (this.forecast) {
            for (let i = 0; i < this.forecast.length; i++) {
                let weather = this.forecast[i];
                const date = new Date(weather.dt * 1000);
                const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
                const weatherBlock = this.createWeatherBlock(
                    `${date.toLocaleDateString("pl-PL")} <span class="separator">|</span>  ${formattedTime}`,
                    weather.main.temp,
                    weather.main.feels_like,
                    weather.weather[0].icon,
                    weather.weather[0].description
                );
                this.resultsBlock.appendChild(weatherBlock);
            }
        }
    }

    createWeatherBlock(dateString, temperature, feelsLikeTemperature, iconName, description) {
        const weatherBlock = document.createElement('div');
        weatherBlock.className = 'weather-block';

        const dateBlock = document.createElement('div');
        dateBlock.className = 'weather-date';
        dateBlock.innerHTML = dateString;
        weatherBlock.appendChild(dateBlock);

        const temperatureBlock = document.createElement('div');
        temperatureBlock.className = 'weather-temperature';
        temperatureBlock.innerHTML = `${temperature} &deg;C`;
        weatherBlock.appendChild(temperatureBlock);

        const feelsLikeTemperatureBlock = document.createElement('div');
        feelsLikeTemperatureBlock.className = 'weather-temperature-feels-like';
        feelsLikeTemperatureBlock.innerHTML = `Odczuwalna: ${feelsLikeTemperature} &deg;C`;
        weatherBlock.appendChild(feelsLikeTemperatureBlock);

        const iconBlock = document.createElement('img');
        iconBlock.className = 'weather-icon';
        iconBlock.src = `https://openweathermap.org/img/wn/${iconName}@2x.png`;
        weatherBlock.appendChild(iconBlock);

        const descriptionBlock = document.createElement('div');
        descriptionBlock.className = 'weather-description';
        descriptionBlock.innerHTML = description;
        weatherBlock.appendChild(descriptionBlock);

        return weatherBlock;
    }
}

document.weatherApp = new WeatherApp("aa410c853e3e70eef47f4783bc4a8bfa", "#weather-results-container");

document.querySelector("#searchButton").addEventListener("click", function () {
    const query = document.querySelector('#searchInput').value;
    document.weatherApp.getForecast(query);
});
