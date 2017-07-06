var express = require("express");
// var main = require("./main.js");
var data_service = ("./data_service.js");
var path = require("path");
var app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

var HTTP_PORT = process.env.PORT || 8080;

app.listen(HTTP_PORT, function onHttpStart(){
  console.log("Express http server listening on :"+ HTTP_PORT);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.engine(".hbs", exphbs({
    extname: ".hbs",
    defaultLayout: 'layout',
    helpers: {
        equal: (lvalue, rvalue, options) => {
            if (arguments.length < 3)
                throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue) {
                return options.inverse(this);
            } else {
                return options.fn(this);
            }
        }
    }
}));
app.set("view engine", ".hbs");

app.get("/",(req,res)=>{
    res.render("index");
    // res.sendFile(path.join(__dirname + "/index.html"));
});

app.use(express.static('js'));
// app.use(function(req, res) {
//   res.status(404).send("Sorry!!!!!!!>>>Page Not Found! <<<:(");
// });
