const express = require("express");

const bodyparser = require("body-parser");

const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyparser({
  extended: true
}));

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;


  const data = {
    members: [
      {
        email_address: email,
        status : "subscribed",
        merge_fields : {
          FNAME: firstName,
          LNAME: lastName
        }
      }

    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/13b40bfea8";

  const options = {
    method: "POST",
    auth: "vineeth:7567a88aa5cc623c2106d0cd6f4741c3-us14"
  }

const request =  https.request(url, options, function(response) {

  if(response.statusCode === 200){
    res.sendFile(__dirname +"/success.html");
  }
  else {
      res.sendFile(__dirname +"/failure.html");
  }
    response.on("data", function(data) {
      console.log(JSON.parse(data));

    })

  })

request.write(jsonData);
request.end();


});

app.post("/failure.html",function(req,res){
  res.redirect("/");
})
app.listen(process.env.PORT||3000, function(req, res) {
  console.log("server is running on port 3000");

});
// 7567a88aa5cc623c2106d0cd6f4741c3-us14

// au id
// 13b40bfea8
