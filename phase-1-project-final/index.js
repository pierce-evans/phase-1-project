
function mouseOver() {
    const infoLabelElement = document.getElementById("infoLabel")
    infoLabelElement.innerHTML = "Get hourly forecast, humidity and wind speed"
}
function mouseOut() {
    const infoLabelElement = document.getElementById("infoLabel")
    infoLabelElement.innerHTML = ""
}

function getForecast() {
    var latitude = (39.77)
    var longitude = (-86.16)

    var url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&start_date=2023-03-10&end_date=2023-03-11`
    var forecastDiv = document.getElementById("forecast")


    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            /*console.log(data)

            //console.log(data.current_weather.temperature)
            console.log(data.hourly.time)*/

            forecastDiv.innerHTML = `<div class = "currentWeatherTemp"> Current Temp: ${data.current_weather.temperature * 1.8 + 32}<sup>o</sup> F </div>`

            for (let i = 0; i < data.hourly.time.length; i++) {
                if (
                    new Date() < new Date(data.hourly.time[i]) &&
                    new Date(data.hourly.time[i]) < new Date(new Date().setHours(new Date().getHours() + 12))
                ) {
                    const mainDiv = document.createElement("div")
                    var celciusTemp = Math.floor(data.hourly.temperature_2m[i] * 1.8 + 32)

                    var msgString = `<div class="temps">Hour ${i}:<br>
                              Temperature: ${celciusTemp}<sup>o</sup> F <br>

                              Relative Humidity: ${data.hourly.relativehumidity_2m[i]}%<br>
                              Wind Speed: ${data.hourly.windspeed_10m[i]}mph</div>
                            `

                    mainDiv.innerHTML = msgString
                    forecastDiv.appendChild(mainDiv);

                }


                /*console.log(data.hourly.time[i])
                console.log(data.hourly.temperature_2m[i])
                console.log(data.hourly.relativehumidity_2m[i])
                console.log(data.hourly.windspeed_10m[i])
                console.log("")*/

            }
        }).catch(e => alert(e));
}

const buttonElement = document.getElementById("buttonId")
buttonElement.addEventListener("mouseover", mouseOver)
buttonElement.addEventListener("mouseout", mouseOut)

//mouseOver()