var express = require("express");
// var main = require("./main.js");
var data_service = require("./data_service.js");
var path = require("path");
var app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

var HTTP_PORT = process.env.PORT || 8080;

app.listen(HTTP_PORT, onHttpStart);

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
    return new Promise((res, req) => {
        data_service.initialize().then((data) => {
            // res.render(data);
             console.log(data);
        }).catch((err) => {
            console.log(err);
        });
    });
}

app.use(express.static('public'));

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

app.get("/", (req,res) => {
    data_service.getAllContaccts().then((data) => {
        data_service.sortContactLastName(data).then((LastNameData) => {
            res.render("index", {data: LastNameData});
        });
    }).catch((err) => {
        res.render("index", {data: {}});
    });
});

app.get("/Contact/add", (req, res) => {
    res.render("addContact");
});

app.get("/Contact/delete/:contactNum", (req, res) => {
    data_service.deleteContactByNum(req.params.contactNum).then((data) => {
        res.redirect("/");
    }).catch((err) => {
        res.status(500).send("Unable to Remove Employee / Employee not found");
    });
});

app.post("/Contact/add", (req, res) => {
    data_service.addContactF(req.body).then((data) => {
        res.redirect("/");
    }).catch((err) => {
        console.log(err);
    });
});

app.use(function(req, res) {
  res.status(404).send("Sorry!!!!!!!>>>Page Not Found! <<<:(");
});
