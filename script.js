$(document).ready(function() {
  // Main Function
  $("#city-search").on("click", function() {
    const city = $("#city-input").val();
    const apiKey = "43e9875704879b878d2c1bcd3be1a605";
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + $.trim(city) + "&appid=" + apiKey;
    const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + $.trim(city) + "&appid=" + apiKey;
    $(".hide").show();
    $("#city-input").val("");
    
    // Weather API call
    $.ajax({
      url: queryURL,
      method: "GET"
      }).then(function(response) {
          console.log(queryURL);
          console.log(response);
          // Transfer content to HTML
          $(".city").html("<h1>" + response.name + " Weather Details</h1>");
          $(".wind").text("Wind Speed: " + response.wind.speed);
          $(".humidity").text("Humidity: " + response.main.humidity);
          // Convert the temp to fahrenheit
          var tempF = (response.main.temp - 273.15) * 1.80 + 32;
          // add temp content to html
          $(".tempF").text("Temperature (F) " + tempF.toFixed(2));
          // Log the data in the console as well
          console.log("Wind Speed: " + response.wind.speed);
          console.log("Humidity: " + response.main.humidity);
          console.log("Temperature (F): " + tempF);
        })
  

    //Forecast API Call
    $.ajax({
      url: forecastURL,
      method: "GET"
      }).then(function(response) {
        const forecast = response.list;
        console.log(forecastURL);
        console.log(response);
        // Loop to pull weather forecast for up to 4 days ahead
        for (let i = 1; i <= 5; i++) {
          var day = (i * 8) - 1;
          console.log(forecast[day]);
  
            $("#day" + i).text("Date: " + (new Date(forecast[day].dt_txt).toLocaleDateString()));
            $("#wind" + i).text("Wind Speed: " + forecast[day].wind.speed);
            $("#temp" + i).text("Temp: " + Math.floor((forecast[day].main.temp - 273.15) * 1.80 + 32) + "F");
            $("#humid" + i).text("Humidity: " + forecast[day].main.humidity);

            // var column = $("<div>").addClass("col-2");
            // var card = $("<div>").addClass("card").css("width: 15rem");
            // var cardBody = $("<div>").addClass("card-body");
            // var date = $("<div>").addClass("date").text(new Date(forecast[day].dt_txt).toLocaleDateString());
            // var wind = $("<div>").addClass("wind").text("Wind: " + forecast[day].wind.speed);
            // var humidity = $("<div>").addClass("humidity").text("Humidity: " + forecast[day].main.humidity);
            // var tempF = $("<div>").addClass("tempF").text("Temperature (F): " + foreTemp);
            // building forecast card
       
            // $("#forecast .row").append(card);
        }
      })


  })

})