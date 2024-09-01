const loadWeatherAppButton = document.getElementById("load-weather-app");
const weatherAppContainer = document.getElementById(
    "weather-app-container"
);
const weatherSummary = document.getElementById("weather-summary");

const summaryLocation = document.getElementById("summary-location");
const summaryTemperature = document.getElementById("summary-temperature");
const summaryDescription = document.getElementById("summary-description");
const lastUpdatedElement = document.getElementById("last-updated");

loadWeatherAppButton.addEventListener("click", () => {
    loadWeatherAppButton.style.display = "none";
    weatherSummary.style.display = "none"
    loadReactApp();
});

function loadReactApp() {
    // Dynamically create a script tag to load the React app's JS bundle
    const script = document.createElement("script");
    const weatherScriptURL = "https://weather-app-c1a15.web.app/assets/index.js"
    script.src = weatherScriptURL;
    script.onload = () => {
        weatherAppContainer.style.display = "block";
    };
    document.body.appendChild(script);

    // Optionally load the CSS bundle as well
    const link = document.createElement("link");
    link.rel = "stylesheet";
    const weatherStyleURL = "https://weather-app-c1a15.web.app/assets/index.css"
    link.href = weatherStyleURL;
    document.head.appendChild(link);

    // Inject the root element for React to mount into
    const rootElement = document.createElement("div");
    rootElement.id = "root";
    weatherAppContainer.appendChild(rootElement);
}

// Listen for messages from the React app
window.addEventListener("message", (event) => {
    if (event.data && event.data.type === "weatherData") {
        // Update the landing page with the weather summary
        const { location, temperature, description, lastUpdated } =
            event.data.weather;

        summaryLocation.textContent = `Location: ${location}`;
        summaryTemperature.textContent = `Temperature: ${temperature}`;
        summaryDescription.textContent = `Weather: ${description}`;
        lastUpdatedElement.textContent = `Last Updated: ${lastUpdated}`;

        // Hide the weather app and show the summary
        weatherAppContainer.style.display = "none";
        loadWeatherAppButton.style.display = "block";

        weatherSummary.style.display = "block";
    }
});