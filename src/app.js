const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const viewPath = path.join(__dirname, "../templates/views");
const publicDirectoryPath = path.join(__dirname, "../public/");
const partialsPath = path.join(__dirname, "../templates/partials")

//Setup handlebars engine and views + partials location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req,res)=>{
    res.render("index", {
        title: "Weather App",
        name: "Rocky"
    });
});

app.get("/about", (req,res)=>{
    res.render("about", {
        title:"About Me",
        name: "Rocky"
    });
});

app.get("/help", (req,res)=>{
    res.render("help",{
        title: "Help Page",
        name: "Rocky",
        message: "Welcome to the help page"
    })
});
//app.com/weather
app.get("/weather", (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }
    
    geocode(req.query.address, (err, {latitude, longitude, location} = {}) => {
        if(err){
            return res.send({error:err})
        }

        forecast(latitude, longitude, (err, forecastData, time, windSpeed, humidity)=>{
            if(err){
                return res.send({error: err})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
                time,
                windSpeed,
                humidity,
            })
        })
    })
})

app.get("/product", (req,res)=>{
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        product:[]
    })
})
app.get("/help/*", (req,res)=>{
    res.render("error", {
        title: "404",
        errorMessage: "Help Page Not Found",
        name: "Rocky"
    })
})
app.get("*", (req,res)=>{
    res.render("error", {
        title: "404",
        errorMessage: "Page Not Found",
        name: "Rocky"
    })
})

//Listener
app.listen(port, () => {
    console.log("[Server] Running on port: " + port)
});