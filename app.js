const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res)
{
    var query=req.body.cityName;
var units="metric";
var apikey="0e8ff6ba67571a6a8f4f7bd31dec1839";
var url="https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&units="+units+"&appid=" +apikey;
https.get(url,function(response){
console.log(response.statusCode);
response.on("data",function(data){
    const weatherData=JSON.parse(data);
    const temp=weatherData.main.temp;
    const weatherDes=weatherData.weather[0].description;
    const icon=weatherData.weather[0].icon;
    const imageurl=" http://openweathermap.org/img/wn/"+ icon+"@2x.png";
    res.write("<p>The weather is currently "+weatherDes+".</p>")
    res.write("<h1>The temperature in "+query+ " is " + temp+" degree Celcius.</h1>");
    res.write("<img src="+ imageurl+">");
    res.send();
})
});
})


app.listen(3000,function(){
    console.log("Server is running on port 3000");
});