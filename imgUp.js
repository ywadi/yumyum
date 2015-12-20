//UPLOAD IMAGE SERVER 
var express = require('express'),
	cors = require('cors'),
    morgan = require('morgan');

var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/')
  },
  filename: function (req, file, cb) {
  	console.log(file);
  	var newFileName = Date.now()+'-'+ file.originalname;
    cb(null, newFileName);
    req.newFileName = newFileName;
  }
})

var upload = multer({ storage: storage , fileFilter: fileFilter}).single('avatar');

function fileFilter(req, file, cb){
	if(file.mimetype == "image/gif" || file.mimetype == "image/jpeg" || file.mimetype == "image/png")
	{
		cb(null, true);
	}
	else
	{
		cb(null, false);
	}
}

var app = express();
app.use(morgan('dev'));

//CORS enabled
app.use(cors());

app.post('/image', function (req, res, next) {
	upload(req, res, function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).send("500 Internal Server Error");
      return
    }
  	res.status(200).send("../images/"+(req.newFileName));
  })
})

var server = app.listen(3001, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log(" _ _____ _           __ ")
	console.log("(_)  __ \ |         / _|");
	console.log(" _| /  \/ |__   ___| |_ ");
	console.log("| | |   | '_ \ / _ \  _|");
	console.log("| | \__/\ | | |  __/ |  ");
	console.log("|_|\____/_| |_|\___|_|  ");         
	console.log('Image Upload Server listening at http://%s:%s', host, port);
});