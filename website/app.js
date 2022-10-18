const baseURL = "http://localhost:8080/"
const apiKey = "&appid=ea53dd34102b8c99830e720e490422ba"
const weatherURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
let unitStyle = "imperial";
let country = "us";
let zipCode = "10015";

console.log("Hello World");
const postData = async (url="", data={}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
    
    try {
        const retreivedData = await response.json();
        return retreivedData;
    } catch(error) {
        console.log("There was an error, it was following: ", error);
    };
}

const getData = async (url="") => {
    const response = await fetch(url);

    try {
        const retreivedData = await response.json();
        return retreivedData;
    } catch(error) {
        console.log("Oops, that didn't quite go well. Error: ",error);
    };
};

function getWeather() {
    //TODO: Catch empty values
    const zipCode = document.getElementById("zipCode").value;
    const currentMood = document.getElementById("currentMood").value;
    let d = new Date();
    let newDate = d.getDate()+'.'+ d.getMonth()+'.'+ d.getFullYear();
    const weatherData = getData(weatherURL+zipCode+","+country+apiKey+"&units="+unitStyle)
    .then(function(weatherData){
        postData(baseURL+"addDay",{date:newDate,weather:weatherData,mood:currentMood})
    });
}

function adaptMetric() {
    unitStyle = document.getElementById("unitSelector").value;
    console.log(unitStyle);
}

function adaptCountry() {
    country = document.getElementById("countrySelector").value;
    console.log(country);
}

postData(baseURL+"addDay",{name: "Marc"});
getData(baseURL+"getData");
document.getElementById("submitMood").addEventListener("click",getWeather);
document.getElementById("unitSelector").addEventListener("change",adaptMetric);
document.getElementById("countrySelector").addEventListener("change",adaptCountry);