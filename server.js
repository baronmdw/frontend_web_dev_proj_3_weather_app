// global variables
const projectData = [];

// setup express environment
const express = require("express");
const app = express();

// dependencies and middleware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// cross origin
const cors = require('cors');
app.use(cors());

// initialize main project folder
app.use(express.static('website'));

const port = 8080;

// start server
const server = app.listen(port,listening);

function listening(){
    console.log("Server started\n Active Port: ",port);
}

app.get("/salve",(req,res)=>{res.send("Hello World-again")});

// POST handler to add data to app
app.post("/addDay",addDay);
function addDay (req,res) {
    const addedData = {date: req.body.date, weather: req.body.weather.weather[0].main, temperature: req.body.weather.main.temp, unitStyle: req.body.unit, place: req.body.weather.name, mood: req.body.mood};
    projectData.push(addedData);
    console.log(addedData);
    res.send('');
}

app.get("/getData",getData);
function getData (req,res) {
    res.send(projectData.at(-1));
}