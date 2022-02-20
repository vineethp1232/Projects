const express= require("express");
const https = require("https");
const bodyParser= require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req, res){
res.sendFile(__dirname+"/index.html");
  });

  app.post("/",function(req, res){

    const city=req.body.cityName;
     const unit = "metric";
     const apiKey="649af312ab73ce64a65fb7dea97b5792";
   const url= "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+unit+"&appid="+apiKey;
   https.get (url,function(response){
     console.log(response.statusCode);

     response.on("data",function(data){
       const weatherData = JSON.parse(data);
       console.log(weatherData);

       const object ={
         name:"vineeth",
         age:"25"
       };
       console.log(JSON.stringify(object));

       const temp = weatherData.main.temp;
       console.log(temp);
   const icon = weatherData.weather[0].icon;
   const imgUrl= " http://openweathermap.org/img/wn/"+icon+"@2x.png";
       const description = weatherData.weather[0].description;
       console.log(description);
   res.write("<p>the weather is currently "+ description+"</p>");
       res.write("<h1> temperature in "+city+" is " + temp + " degree celsius </h1>" );
       res.write("<img src="+ imgUrl +"></img>");
       res.send();
   }) ;


   });





  });
//






app.listen(3000,function(){

  console.log("running in port 3000");
});
