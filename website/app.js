const baseURL = "http://localhost:8080/"
const apiKey = "&appid=ea53dd34102b8c99830e720e490422ba"
const weatherURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

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
        console.log(retreivedData);
    } catch(error) {
        console.log("Oops, that didn't quite go well. Error: ",error);
    };
};

function getWeather() {
    console.log("Kuckuck");
    getData(weatherURL+"81241,DE"+apiKey);
}

postData(baseURL+"addDay",{name: "Marc"});
getData(baseURL+"getData");
document.getElementById("hitMe").addEventListener("click",getWeather);