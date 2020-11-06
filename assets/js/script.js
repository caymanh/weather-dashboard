$(document).ready(function () {
  $(".btn").on("click", function () {
    event.preventDefault();
    var domain = "https://api.openweathermap.org/data/2.5/forecast?q=";
    var city = $(".form-control").val();
    var api = "&units=imperial&appid=97ab95b8a3348a1a4882ff9739694e9c";
    var requestUrl = domain + city + api;
    function getCoord() {
      fetch(requestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          document.getElementById("city").innerHTML = data.city.name;

          var lat = (data.city.coord.lat);
          var lon = (data.city.coord.lon);
          var requestForecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts" + api;

          function getForecast(){
            fetch(requestForecastUrl)
              .then(function (response) {
                return response.json();
              })
              .then(function(data) {
                console.log(data);
              })
          }
          getForecast();
        });
        
    }
    getCoord();
   
  });
});


          // document.getElementById("todayDate").innerHTML = "(" + data.list[1].dt_txt.substring(0, 10) + ")";
          // document.getElementById("todayTemp").innerHTML = "Temperature: " + data.list[0].main.temp + " &#8457";
          // document.getElementById("todayHumidity").innerHTML = "Humidity: " + data.list[0].main.humidity + "%";
          // document.getElementById("todayWind").innerHTML = "Wind Speed: " + data.list[0].wind.speed + " MPH";
          // document.getElementById("todayUV").innerHTML = "UV Index: " + data.list[0].wind.speed;