document.addEventListener('DOMContentLoaded', function () {
    // Step 2: Create variables
    const cityInput = document.getElementById('cityInput');
    const btn = document.getElementById('btn');
    const weatherInfo = document.getElementById('weather-info');

    
    btn.addEventListener('click', function () {
        
        const cityName = cityInput.value.trim();

        if (cityName === '') {
            alert('Please enter a city name.');
            return;
        }

        const apiKey = 'c70c3d0329f258416311ca325432a5fa'; // Replace with your API key

        
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    // HTTP Status Code Error
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.cod !== 200) {
                    // API-Specific Error
                    throw new Error(data.message);
                }

                
                const description = data.weather[0].description;
                const temperature = data.main.temp;
                const windSpeed = data.wind.speed;

                const weatherDetails = `
                    <p>Weather Description: ${description}</p>
                    <p>Main Temperature: ${temperature}°C</p>
                    <p>Wind Speed: ${windSpeed} m/s</p>
                `;

                weatherInfo.innerHTML = weatherDetails;
            })
            .catch(error => {
                if (error instanceof TypeError) {
                    // Network Error
                    alert('Network error. Please check your internet connection.');
                } else {
                    alert('An error occurred: ' + error.message);
                }
            });
    });
});
