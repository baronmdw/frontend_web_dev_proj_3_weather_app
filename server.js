// global variables

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