var appId = "675645ead57721be136750f9cfc0acca";
unit = "";
temperature = 0;

var changeUnit = function changeUnit() {
  if (unit === "C") {
    temperature = temperature * 1.8 + 32;
    unit = "F";
    document.getElementById("unitLink").innerHTML =
      temperature.toFixed(2) + "°F";
  } else if (unit === "F") {
    temperature = (temperature - 32) / 1.8;
    unit = "C";
    document.getElementById("unitLink").innerHTML =
      temperature.toFixed(2) + "°C";
  }
  return false;
};

var getWeatherData = function getWeatherData() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function showPosition(position) {
      var lat = String(position.coords.latitude);
      var lon = String(position.coords.longitude);
      $.ajax({
        type: "GET",
        url:
          "https://api.openweathermap.org/data/2.5/weather?lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=" +
          appId,
        success: function(json) {
          $(".spinner").css("visibility", "hidden");
          document.getElementById("headDetails").innerHTML =
            "Today's Weather Forecast in " + json.name + "," + json.sys.country;
          document.getElementById("icon").src =
            "https://openweathermap.org/img/w/" + json.weather[0].icon + ".png";
          document.getElementById("unitLink").innerHTML =
            (json.main.temp - 273.15).toFixed(2) + "°C";
          unit = "C";
          temperature = json.main.temp - 273.15;
          document.getElementById("mainWeather").innerHTML =
            json.weather[0].main + ",";
          document.getElementById("windText").innerHTML =
            json.wind.speed + "m/s";
          document.getElementById("pressureText").innerHTML =
            json.main.pressure + "hpa";
          document.getElementById("humidText").innerHTML =
            json.main.humidity + "%";
          document.getElementById("cloudText").innerHTML =
            json.clouds.all + "%";
        }
      });
    });
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
};
$(document).ready(function() {
  getWeatherData();
  $("#unitLink").click(function() {
    changeUnit();
  });
});