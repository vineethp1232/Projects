const express= require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req , res){
var num1 = Number(req.body.n1);
var num2 = Number(req.body.n2);
var output = num1 + num2;
res.send("output is " + output);
});
app.get("/bmicalculator",function(req, res){
  res.sendFile(__dirname + "/bmicalculator.html");
});

app.post("/bmicalculator",function(req,res){

  var n1 = parseFloat(req.body.m1);
  var n2 = parseFloat(req.body.m2);
  var m3 = n1/(n2*n2);
  res.send("output is " + m3 );
});

app.listen(3000, function(){
  console.log("server responde at host 3000");
});
