var express = require('express'),
	cors = require('cors'),
	bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    restful = require('node-restful'),
    mongoose = restful.mongoose;

var Routers = require("./routes/routes.js");

var app = express();
app.use(morgan('dev'));

//CORS enabled
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var mongoServer = "192.168.8.104";

mongoose.connect("mongodb://"+mongoServer+"/iChef");


app.get('/', function(req, res) {
  res.send('What is the beginning of eternity, the end of time and space, the beginning of every end and the end of every race?');
});

app.use('/admin/v1', Routers.Admin);
app.use('/api/v1', Routers.App);


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

