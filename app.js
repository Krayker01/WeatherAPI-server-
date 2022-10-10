// express
const express = require('express');
const app = express();
const port = 3000;
// https
const https = require("https");
// bodyParser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = "6abc1a5b169ec8678a031eda8520cce2";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?appid="+apiKey+"&q="+query+"&units="+unit;
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(resp){
      const weatherData = JSON.parse(resp);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(temp, description);
      res.write("<h1>The temperature in " + query + " is " + temp + "</h1>");
      res.write("<p>The weather is currently " + description + "</p>");
      res.write("<img src=" + imageUrl +">");
      res.send();
    });
  });
});

app.listen(port, () => {
  console.log("Server was started on port: " + port);
});
