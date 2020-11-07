//Run script when document is ready
$(document).ready(function () {
  //Click event listener to run function when "submit" button is hit"
  $(".btn").on("click", function () {
    //Prevent button from submitting
    event.preventDefault();
    //Open Weather API URL to fetch coordinates of city that user is searching for
    var domain = "https://api.openweathermap.org/data/2.5/forecast?q=";
    var city = $(".form-control").val();
    var api = "&units=imperial&appid=97ab95b8a3348a1a4882ff9739694e9c";
    var requestUrl = domain + city + api;
    //Function to fetch coordinate of city that user is searching for
    function getCoord() {
      fetch(requestUrl)
        .then(function (response1) {
          return response1.json();
        })
        .then(function (data1) {
          //Retrieve city coordinates and save them as variables
          var lat = data1.city.coord.lat;
          var lon = data1.city.coord.lon;
          //Pass the coordinates into the second API URL to fetch weather forecast of the city
          var requestForecastUrl =
            "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            lat +
            "&lon=" +
            lon +
            "&exclude=current,minutely,hourly,alerts" +
            api;
          //Function to fetch weather forecast for current day
          function getForecast() {
            fetch(requestForecastUrl)
              .then(function (response2) {
                return response2.json();
              })
              .then(function (data2) {
                //Create an element to hold weather icon
                var iconCode = data2.daily[0].weather[0].icon;
                var iconUrl =
                  "http://openweathermap.org/img/wn/" + iconCode + ".png";
                var icon = document.createElement("IMG");
                icon.setAttribute("src", iconUrl);
                console.log(data2);
                //Retrieve unix timestamp from API
                var todayUnixDate = data2.daily[0].dt;
                //Use moment.js to convert unix timestamp to date
                var todayDate = moment.unix(todayUnixDate).format("MM/DD/YYYY");
                //display city name, date, and weather icon on page
                document.getElementById("city").innerHTML =
                  data1.city.name + " (" + todayDate + ")";
                document.getElementById("city").appendChild(icon);
                //display current day temp, humidity, and windspeed
                document.getElementById("todayTemp").innerHTML =
                  "Temperature: " + data2.daily[0].temp.day + " &#8457";
                document.getElementById("todayHumidity").innerHTML =
                  "Humidity: " + data2.daily[0].humidity + "%";
                document.getElementById("todayWind").innerHTML =
                  "Wind Speed: " + data2.daily[0].wind_speed + " MPH";
                var indexUV = data2.daily[0].uvi;
                //display current day UV index and apply different classes depending on severity level of UV index
                document.getElementById("todayUV").innerHTML =
                  "UV Index: " + indexUV;
                if (indexUV < 3) {
                  console.log("btn-success");
                } else if (indexUV < 6) {
                  console.log("btn-warning");
                } else console.log("danger");

                //Display date for the 5-day forecast
                var date1 = moment.unix(data2.daily[1].dt).format("MM/DD/YYYY");
                document.getElementById("d1").innerHTML = date1;

                var date2 = moment.unix(data2.daily[2].dt).format("MM/DD/YYYY");
                document.getElementById("d2").innerHTML = date2;

                var date3 = moment.unix(data2.daily[3].dt).format("MM/DD/YYYY");
                document.getElementById("d3").innerHTML = date3;

                var date4 = moment.unix(data2.daily[4].dt).format("MM/DD/YYYY");
                document.getElementById("d4").innerHTML = date4;

                var date5 = moment.unix(data2.daily[5].dt).format("MM/DD/YYYY");
                document.getElementById("d5").innerHTML = date5;

                //Display icon for the 5-day forecast
                var iconCode1 = data2.daily[1].weather[0].icon;
                var iconUrl1 =
                  "http://openweathermap.org/img/wn/" + iconCode1 + ".png";
                var icon1 = document.createElement("IMG");
                icon1.setAttribute("src", iconUrl1);
                document.getElementById("i1").appendChild(icon1);

                var iconCode2 = data2.daily[2].weather[0].icon;
                var iconUrl2 =
                  "http://openweathermap.org/img/wn/" + iconCode2 + ".png";
                var icon2 = document.createElement("IMG");
                icon2.setAttribute("src", iconUrl2);
                document.getElementById("i2").appendChild(icon2);

                var iconCode3 = data2.daily[3].weather[0].icon;
                var iconUrl3 =
                  "http://openweathermap.org/img/wn/" + iconCode3 + ".png";
                var icon3 = document.createElement("IMG");
                icon3.setAttribute("src", iconUrl3);
                document.getElementById("i3").appendChild(icon3);

                var iconCode4 = data2.daily[4].weather[0].icon;
                var iconUrl4 =
                  "http://openweathermap.org/img/wn/" + iconCode4 + ".png";
                var icon4 = document.createElement("IMG");
                icon4.setAttribute("src", iconUrl4);
                document.getElementById("i4").appendChild(icon4);

                var iconCode5 = data2.daily[5].weather[0].icon;
                var iconUrl5 =
                  "http://openweathermap.org/img/wn/" + iconCode5 + ".png";
                var icon5 = document.createElement("IMG");
                icon5.setAttribute("src", iconUrl5);
                document.getElementById("i5").appendChild(icon5);

                //Display temperature for 5-day forecast
                document.getElementById("t1").innerHTML =
                "Temperature: " + data2.daily[1].temp.day + " &#8457";

                document.getElementById("t2").innerHTML =
                "Temperature: " + data2.daily[2].temp.day + " &#8457";

                document.getElementById("t3").innerHTML =
                "Temperature: " + data2.daily[3].temp.day + " &#8457";

                document.getElementById("t4").innerHTML =
                "Temperature: " + data2.daily[4].temp.day + " &#8457";

                document.getElementById("t5").innerHTML =
                "Temperature: " + data2.daily[5].temp.day + " &#8457";

                //Display humidity for 5-day forecast
                document.getElementById("h1").innerHTML =
                "Humidity: " + data2.daily[1].humidity + "%";

                document.getElementById("h2").innerHTML =
                "Humidity: " + data2.daily[2].humidity + "%";

                document.getElementById("h3").innerHTML =
                "Humidity: " + data2.daily[3].humidity + "%";

                document.getElementById("h4").innerHTML =
                "Humidity: " + data2.daily[4].humidity + "%";

                document.getElementById("h5").innerHTML =
                "Humidity: " + data2.daily[5].humidity + "%";

            
                document.getElementById("history").style.display = "block";
                document.getElementById("forecastContainer").style.display = "block";
            
    
              
              });
          }
          getForecast();
        });
    }
    getCoord();
  });
});

// document.getElementById("todayDate").innerHTML = "(" + data.list[1].dt_txt.substring(0, 10) + ")";
