const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const city = req.body.cityName;
    //console.log(city);
    const unit = "metric";
    const apiKey = "6d795d618bfa794ed21b58c469bccab2";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+unit+"&appid="+apiKey;
    https.get(url,function(response){
        response.on("data",function(data){
            //console.log(data);
            const weatherData = JSON.parse(data);
            const place = weatherData.name+","+weatherData.sys.country;
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            //console.log(place);
            const imageURL = "https://openweathermap.org/img/wn/" + icon+ "@2x.png";
            res.write("<h1>"+ place+"</h1>");
            res.write("<p>Weather Condition <br>"+ desc+"</p>");
            res.write("<p>Current Temperature "+ temp+" degree celcius</p>");
            res.write("<img src="+imageURL+">");
            res.send();
        })
    })
    //res.send("Thanks");
});


app.listen(3000,function(){
    console.log("Server is connected using port 3000");
});