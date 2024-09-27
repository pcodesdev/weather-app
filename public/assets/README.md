# Weather Forecast and History App

This web application provides weather information for a user-specified location, including:

- The current weather.
- A 3-day weather forecast.
- A 4-day historical weather summary.

The app fetches weather data using the [WeatherAPI](https://www.weatherapi.com/) and displays it dynamically on the webpage. The user can search for the weather of any city by typing the city's name and pressing enter.

## Features

- **Current Weather Display**: Shows the current temperature, weather conditions, and location details (city, country).
- **3-Day Forecast**: Displays the weather forecast for the next three days, including temperature and condition (e.g., sunny, cloudy).
- **4-Day History**: Fetches and shows the weather for the past four days in chronological order.
- **Dynamic Icon Updates**: Weather conditions are represented visually using icons based on the weather status.

## Technologies Used

- **HTML**: For the basic structure of the application.
- **CSS**: For styling the app, including background images and layout.
- **JavaScript**: For dynamically fetching and displaying the weather data.
- **Node.js with Express**: Serves the static files (`HTML`, `CSS`, and `JavaScript`) and handles API key management for secure access to the WeatherAPI.
- **WeatherAPI**: Provides the weather data, including current weather, forecast, and historical weather information.

## Project Structure

```
/project-root
  ├── /public
  │     ├── index.html        # The main HTML page
  │     ├── style.css         # The stylesheet for the app
  │     ├── script.js         # The client-side JavaScript logic
  │     └── /images           # Folder for images (weather icons, background images, etc.)
  ├── .env                    # Stores the API key securely
  ├── server.js               # The Node.js server for serving static files
  └── README.md               # This file
```

### Example of API Key Storage

For security reasons, the API key is stored in a `.env` file and not hardcoded into the client-side JavaScript.

### How It Works

1. **Search Functionality**: Users enter a city name in the search bar. When they press enter, the app fetches weather data for that city using the WeatherAPI.
2. **Weather Display**: The app dynamically updates the DOM to display:
   - Current temperature and weather conditions.
   - 3-day weather forecast.
   - 4-day weather history (in ascending order).
3. **Icons**: The app uses weather icons (e.g., sunny, cloudy) based on the weather condition returned by the API.

## How to Run

### Prerequisites

- **Node.js**: Ensure that Node.js is installed on your machine.
- **WeatherAPI Key**: You will need an API key from [WeatherAPI](https://www.weatherapi.com/).

### Steps to Set Up and Run the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/weather-forecast-app.git
   cd weather-forecast-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project and add your WeatherAPI key:

   ## Environment Setup

4. Copy `.env.example` to `.env`
5. Fill in your actual API keys and other sensitive information in `.env`

   ```
   API_KEY=your_weatherapi_key_here
   ```

6. Start the server:

   ```bash
   node server.js
   ```

7. Open your browser and navigate to `http://localhost:3000`.

8. Enter a city name in the search bar and press "Enter" to get the weather forecast and history.

## Future Enhancements

- Add a loading spinner while fetching data.
- Improve error handling when the API request fails (e.g., invalid city input).
- Add more detailed weather data (humidity, wind speed, etc.).
- Make the UI more responsive for different screen sizes.

## License

This project is open-source and available under the MIT License.
