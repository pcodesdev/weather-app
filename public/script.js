// WeatherAPI key
// const API_KEY = "9117722380ba4ab9976192245242509";

// DOM elements
const searchInput = document.querySelector(".navbar input");
const temperatureElement = document.querySelector(".temperature p");
const weatherIconElement = document.querySelector(".temperature img");
const placeElement = document.querySelector(".place");
const weatherStatusElement = document.querySelector(".weather-status");
const tempStatusElement = document.querySelector(".temp-status");
const weekForecastElements = document.querySelectorAll(".week-forecast > div");

// Weather icon mapping
const weatherIcons = {
  Sunny: "sun.png",
  Clear: "sun.png",
  "Partly cloudy": "sun-cloud.png",
  Cloudy: "cloudy.png",
  Overcast: "sun-cloud.png",
  Mist: "rainy.png",
  "Patchy rain possible": "rainy-day.png",
  "Patchy snow possible": "thurder-storms.png",
  // ... (rest of the weather icons remain the same)
};


// // Function to fetch weather data (forecast and historical)
// async function fetchWeatherData(city) {
//   try {
//     // Fetch 3-day forecast
//     const forecastResponse = await fetch(
//       `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`
//     );
//     const forecastData = await forecastResponse.json();

//     // Calculate date 4 days ago
//     const sevenDaysAgo = new Date();
//     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 4);
//     const formattedDate = sevenDaysAgo.toISOString().split("T")[0];

//     // Fetch historical data for the last 4 days
//     const historyResponse = await fetch(
//       `https://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${city}&dt=${formattedDate}&end_dt=${
//         new Date().toISOString().split("T")[0]
//       }`
//     );
//     const historyData = await historyResponse.json();

//     updateWeatherDisplay(forecastData, historyData);
//   } catch (error) {
//     console.error("Error fetching weather data:", error);
//   }
// }

/// Function to fetch weather data (forecast and historical)
async function fetchWeatherData(city) {
  try {
    const API_KEY = await getApiKey(); // Get the API key
    console.log("API Key:", API_KEY); // Log the API key

    // Fetch 3-day forecast
    const forecastResponse = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`
    );
    const forecastData = await forecastResponse.json();
    console.log("Forecast Data:", forecastData);

    // Calculate date 4 days ago
    const fourDaysAgo = new Date();
    fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);
    const formattedDate = fourDaysAgo.toISOString().split("T")[0];

    // Fetch historical data for the last 4 days
    const historyResponse = await fetch(
      `https://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${city}&dt=${formattedDate}&end_dt=${
        new Date().toISOString().split("T")[0]
      }`
    );
    const historyData = await historyResponse.json();
    console.log("History Data:", historyData);

    // Sort historical data in ascending order
    historyData.forecast.forecastday.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    updateWeatherDisplay(forecastData, historyData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    console.error("Error details:", error.message);
  }
}

// Function to get API key
async function getApiKey() {
  try {
    const response = await fetch('http://localhost:3000/apikey');
    console.log("API Key Request Response:", response.status);
    const data = await response.json();
    console.log("API Key Data:", data);
    return data.apiKey;
  } catch (error) {
    console.error("Error getting API key:", error);
    throw error;
  }
}

// Function to update weather display
function updateWeatherDisplay(forecastData, historyData) {
  // Update current weather (using forecast data)
  temperatureElement.textContent = `${Math.round(
    forecastData.current.temp_c
  )}℃`;
  weatherIconElement.src = `assets/${
    weatherIcons[forecastData.current.condition.text] || "sun.png"
  }`;
  weatherIconElement.alt = forecastData.current.condition.text;
  placeElement.textContent = `${forecastData.location.name}, ${forecastData.location.country}`;
  weatherStatusElement.textContent = forecastData.current.condition.text;
  tempStatusElement.textContent = `${Math.round(
    forecastData.forecast.forecastday[0].day.maxtemp_c
  )}℃ | ${Math.round(forecastData.forecast.forecastday[0].day.mintemp_c)}℃`;

  // Combine forecast and historical data
    const combinedData = [
      ...forecastData.forecast.forecastday, // 3 days of forecast
      ...historyData.forecast.forecastday.slice(0, 4), // Last 4 days of historical data
    ];

  // Update weekly display (4 days historical + 3 days forecast)
  weekForecastElements.forEach((element, index) => {
    const dayData = combinedData[index];
    const date = new Date(dayData.date);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const monthName = date.toLocaleDateString("en-US", { month: "short" });
    const dayOfMonth = date.getDate();

    element.querySelector(
      "p:first-child"
    ).textContent = `${dayName}, ${monthName} ${dayOfMonth}`;
    element.querySelector("p:nth-child(2)").textContent = `${Math.round(
      dayData.day.maxtemp_c
    )}℃ | ${Math.round(dayData.day.mintemp_c)}℃`;
    element.querySelector("img").src = `assets/${
      weatherIcons[dayData.day.condition.text] || "sun.png"
    }`;
    element.querySelector("img").alt = dayData.day.condition.text;
  });
}

// Event listener for search input
searchInput.addEventListener("search", () => {
  fetchWeatherData(searchInput.value);
});

// Initial weather fetch
fetchWeatherData("Nairobi");
