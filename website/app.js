const baseURL = "http://localhost:8080/"
const apiKey = "&appid=ea53dd34102b8c99830e720e490422ba"
const weatherURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
let unitStyle = "imperial";
let country = "us";
let zipCode = "10015";

const postData = async (url="", data={}) => {
    // This Function sends a post request to the URL that was handed over including the data in the caller as JSON object
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
    
    try {
        const retreivedData = await response;
        return retreivedData;
    } catch(error) {
        console.log("There was an error, it was following: ", error);
    };
}

const getData = async (url="") => {
    // This Function sends a get request to the URL that was handed over and returns the response
    const response = await fetch(url);

    try {
        const retreivedData = await response.json();
        return retreivedData;
    } catch(error) {
        console.log("Oops, that didn't quite go well. Error: ",error);
    };
};

function getWeather() {
    // This function reads out the inputs on the page and retrieves the weather data from the openweathermap API
    // Get Zip Code and fill in with placeholder for Manhattan if no user entry was given
    let zipCode = document.getElementById("zipCode").value;
    if (!zipCode) {
      zipCode = document.getElementById("zipCode").placeholder;
    }
    // Get Mood and fill in with placeholder for awesome mood if no user entry was given
    let currentMood = document.getElementById("feelings").value;
    if (!currentMood) {
        currentMood = document.getElementById("feelings").placeholder;   
    }
    // Create Date variable in European Template
    let d = new Date();
    let newDate = d.getDate()+'.'+ d.getMonth()+'.'+ d.getFullYear();
    // Contact Weathermap API and retrieve Data
    const weatherData = getData(weatherURL+zipCode+","+country+apiKey+"&units="+unitStyle)
    .then(function(weatherData){
        // If weather was fetched successfully: Post to Database
        postData(baseURL+"addDay",{date:newDate,weather:weatherData,mood:currentMood,unit:unitStyle})
    })
    .then(()=>{
        // Update UI Elements with the received data
        const journalData = getData(baseURL+"getData")
        .then(function(journalData){console.log(journalData);
            document.getElementById("date").textContent = "Date of Entry:  "+journalData.date;
            document.getElementById("place").textContent = "The Place to be:  "+journalData.place.replaceAll("\x22","");
            document.getElementById("weather").textContent = "Weather present:  "+journalData.weather;
            document.getElementById("temp").textContent = "Temperature during Entry:  "+journalData.temperature;
            document.getElementById("content").textContent = "Mood of User:  "+journalData.mood;
            getTemperatureUnit(journalData.unitStyle);
    })
})
}

function adaptMetric() {
    // Adapt the Metric that will be called to the openweathermap API to what was selected by user
    unitStyle = document.getElementById("unitSelector").value;
    console.log(unitStyle);
}

function adaptCountry() {
    // Adapt the Country that is of interest which will be called to the openweathermap API
    country = document.getElementById("countrySelector").value;
}

function getTemperatureUnit(typeString =""){
    // This Function sets the unit in the temperature based on the unitType that was used (°C, °F or K)
    switch(typeString) {
        case 'imperial':
            unit=" °F";
            break;
        case 'metric':
            unit=" °C";
            break;
        case 'standard':
            unit=" K";
            break;
    }
    document.getElementById("temp").textContent = document.getElementById("temp").textContent+unit;
}

document.getElementById("submitMood").addEventListener("click",getWeather);
document.getElementById("unitSelector").addEventListener("change",adaptMetric);
document.getElementById("countrySelector").addEventListener("change",adaptCountry);