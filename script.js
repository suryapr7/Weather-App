





let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");

// Function to fetch weather details from the API and display them
let getWeather = () => {
  let cityValue = cityRef.value;
  // If input field is empty
  if (cityValue.length == 0) {
    result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
  }
  // If input field is NOT empty
  else {
    let apiKey = "37c016152fa8a9440f6eee142dce28c9"; // Replace with your OpenWeatherMap API key
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;

    // Clear the input field
    cityRef.value = "";

    fetch(url)
      .then((resp) => resp.json())
      // If city name is valid
      .then((data) => {
        console.log(data);

        // Extract humidity and wind speed from the API response
        let humidity = data.main.humidity;
        let windSpeed = data.wind.speed;

        result.innerHTML = `
        <h2>${data.name}</h2>
        <h4 class="weather">${data.weather[0].main}</h4>
        <h4 class="desc">${data.weather[0].description}</h4>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <h1>${data.main.temp} &#176;</h1>
        <div class="temp-container">
            <div>
                <h4 class="title">Min</h4>
                <h4 class="temp">${data.main.temp_min}&#176;</h4>
            </div>
            <div>
                <h4 class="title">Max</h4>
                <h4 class="temp">${data.main.temp_max}&#176;</h4>
            </div>
            <div>
                <h4 class="title">Humidity</h4>
                <h4 class="temp">${humidity}%</h4>
            </div>
            <div>
                <h4 class="title">Wind Speed</h4>
                <h4 class="temp">${windSpeed} m/s</h4>
            </div>
        </div>
        `;

        // Check the weather condition and set the background image accordingly
        let weatherCondition = data.weather[0].main;
        let body = document.body;

        // Define background images for different weather conditions
        const backgroundImages = {
          "Clouds": "./assets/cloudy.gif",
          "Thunderstorm": "./assets/thunder.gif",
          "Rain": "./assets/rain.gif",
          "Haze": "./assets/haze.gif",
          "Mist": "./assets/mist.gif",
          "Sunny": "./assets/sunny.gif",
           
           
          // Add more conditions and corresponding image URLs as needed
        };

        // Set the background image based on the weather condition
        if (backgroundImages[weatherCondition]) {
          body.style.backgroundImage = `url(${backgroundImages[weatherCondition]})`;
          body.style.backgroundSize = 'cover';

        }
      })

      

      
      // If city name is NOT valid
      .catch(() => {
        result.innerHTML = `<h3 class="msg">City not found</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);


 

 
