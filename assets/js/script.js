$(document).ready(function () {
  $(".btn").on("click", function () {
    event.preventDefault();
    var domain = "https://api.openweathermap.org/data/2.5/forecast?q=";
    var city = $(".form-control").val();
    var api = "&units=imperial&appid=97ab95b8a3348a1a4882ff9739694e9c";
    var requestUrl = domain + city + api;
    function getCoord() {
      fetch(requestUrl)
        .then(function (response1) {
          return response1.json();
        })
        .then(function (data1) {
     

          var lat = (data1.city.coord.lat);
          var lon = (data1.city.coord.lon);
          var requestForecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts" + api;

          function getForecast(){
            fetch(requestForecastUrl)
              .then(function (response2) {
                return response2.json();
              })
              .then(function(data2) {
                var iconCode = data2.daily[0].weather[0].icon;
                var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
                var icon = document.createElement("IMG");
                icon.setAttribute("src", iconUrl);
                 console.log(data2);
  

                var todayUnixDate = data2.daily[0].dt;
                var todayDate = moment.unix(todayUnixDate).format("MM/DD/YYYY");

                document.getElementById("city").innerHTML = data1.city.name + " (" + todayDate + ")";
                document.getElementById("city").appendChild(icon);
            

                document.getElementById("todayTemp").innerHTML = "Temperature: " + data2.daily[0].temp.day + " &#8457";
                          document.getElementById("todayHumidity").innerHTML = "Humidity: " + data2.daily[0].humidity + "%";
                          document.getElementById("todayWind").innerHTML = "Wind Speed: " + data2.daily[0].wind_speed + " MPH";
                                document.getElementById("todayUV").innerHTML = "UV Index: " + data2.daily[0].uvi;
              })
          }
          getForecast();
        });
        
    }
    getCoord();
   
  });
});


          // document.getElementById("todayDate").innerHTML = "(" + data.list[1].dt_txt.substring(0, 10) + ")";



    