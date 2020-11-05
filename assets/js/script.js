$(document).ready(function () {
  $(".btn").on("click", function () {
    event.preventDefault();
    var domain = "https://api.openweathermap.org/data/2.5/forecast?q=";
    var city = $(".form-control").val();
    var api = "&units=imperial&appid=97ab95b8a3348a1a4882ff9739694e9c";
    var requestUrl = domain + city + api;
    function getForecast() {
      fetch(requestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
        });
    }
    getForecast();
  });
});
