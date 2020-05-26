
const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const message1 = document.querySelector("#message-1")
const message2 = document.querySelector("#message-2")
const message3 = document.querySelector("#message-3")
const message4 = document.querySelector("#message-4")
const message5 = document.querySelector("#message-5")

weatherForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    message1.textContent = "Loading...";
    message2.textContent = "";
    const location = search.value

    //self reference.
    fetch("/weather?address="+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                message1.textContent = data.error;
                message2.textContent = "";
            }else{
                message1.textContent = "Location: " + data.location;
                message2.textContent = "Time: " + data.time;
                message3.textContent = "Forecast: " + data.forecast;
                message4.textContent = "Wind Speeds: " + data.windSpeed;
                message5.textContent = "Humidity: " + data.humidity;
            }
        })
    })
})