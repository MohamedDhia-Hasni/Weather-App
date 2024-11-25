
document.getElementById("toggle-mode").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    const weatherContainer = document.querySelector(".weather-container");
    weatherContainer.classList.toggle("dark-mode");

    
    if (document.body.classList.contains("dark-mode")) {
        this.textContent = "Switch to Light Mode";
    } else {
        this.textContent = "Switch to Dark Mode";
    }
});

function getCoordsByCity(city) {
    const apiKey = '31aa4f9bd35ca973de39e5489823c778'; 
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                document.getElementById('weather-info').classList.remove('active');
                document.getElementById('weather-info').innerHTML = `<p>City not found!</p>`;
            } else {
                const { lat, lon } = data[0];
                getWeatherByCoords(lat, lon);
            }
        })
        .catch(error => {
            document.getElementById('weather-info').classList.remove('active');
            document.getElementById('weather-info').innerHTML = `<p>Error fetching location data: ${error.message}</p>`;
        });
}

function getWeatherByCoords(lat, lon) {
    const apiKey = '31aa4f9bd35ca973de39e5489823c778'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const city = data.name;
            const country = data.sys.country;

            document.getElementById('weather-info').innerHTML = `
                <h3>${city}, ${country}</h3>
                <p>${weatherDescription}</p>
                <p>Temperature: ${temperature}°C</p>
            `;
            document.getElementById('weather-info').classList.add('active');
        })
        .catch(error => {
            document.getElementById('weather-info').classList.remove('active');
            document.getElementById('weather-info').innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
        });
}
