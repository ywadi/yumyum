var express = require('express'),
	bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    restful = require('node-restful'),
    mongoose = restful.mongoose;

var app = express();
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/iChef");

app.use('/api/v1', require("./routes/routes.js"));


var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log(" _ _____ _           __ ")
	console.log("(_)  __ \ |         / _|");
	console.log(" _| /  \/ |__   ___| |_ ");
	console.log("| | |   | '_ \ / _ \  _|");
	console.log("| | \__/\ | | |  __/ |  ");
	console.log("|_|\____/_| |_|\___|_|  ");         
	console.log('iChef Server listening at http://%s:%s', host, port);
});
