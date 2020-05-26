const request = require("request");

const forcast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=2245b67d4bb90aa2548ea127068346d8&query=" + latitude + "," + longitude + "&units=c";
    
    request({url, json:true}, (err,{body}) => {
        if(err){
            callback("Unable to connect to weather service");
        }else if (body.error){
            callback("Unable to find location");
        }else{
            callback(undefined, body.current.weather_descriptions[0] + " It is currently " + body.current.temperature + " degrees out. There is a " + body.current.precip + "% chance of rain");
        }
    });
}

module.exports = forcast;