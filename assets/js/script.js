var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=97ab95b8a3348a1a4882ff9739694e9c';

function getForecast() {
    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('Weather Data Here \n----------');
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].url);
        console.log(data[i].user.login);
      }
    });
}



$( ".btn" ).on( "click", function() {
    event.preventDefault();
    getForecast();
  });