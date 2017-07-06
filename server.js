var express = require("express");
// var main = require("./main.js");
var path = require("path");
var app = express();

var HTTP_PORT = process.env.PORT || 8080;

app.listen(HTTP_PORT, function onHttpStart(){
  console.log("Express http server listening on :"+ HTTP_PORT);
});



app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.use(express.static('js'));
// app.use(function(req, res) {
//   res.status(404).send("Sorry!!!!!!!>>>Page Not Found! <<<:(");
// });
