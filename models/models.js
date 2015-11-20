//Data Models 
var restful = require('node-restful');
var mongoose = restful.mongoose;
var Schema = mongoose.Schema;

var chefSchema = new Schema({
	firstNameAR: String, 
	lastNameAR: String, 
	firstNameEN: String,
	lastNameEN: String, 
	photoFileName: String, 
	address: {
		email: String, 
		country: String, 
		city: String, 
		area: String, 
		street: String, 
		building: String,
		lat: Number,
		lng: Number
	},
	phoneNumber: String,
	rating: Number, 
	points: Number, 
	descEN: String, 
	descAR: String,
	auth: {
		username: String, 
		password: String,
		blocked: String
	}
});


var dishSchema = new Schema({
	nameEN: String, 
	nameAR: String, 
	photoFileName: String, 
	descAR: String,
	descEN: String,
	_chefID: Schema.Types.ObjectId,
	unitEN: String, 
	unitAR: String,
	subcategory: [
		{
			name: String,
			comment: String
		}
	]
});

var userSchema = new Schema({
	firstNameAR: String, 
	lastNameAR: String, 
	firstNameEN: String,
	lastNameEN: String, 
	photoFileName: String, 
	auth: {
		username: String, 
		password: String,
		blocked: String
	},
		phoneNumber: String, 
	address: {
		email: String, 
		country: String, 
		city: String, 
		area: String, 
		street: String, 
		building: String,
		lat: Number,
		lng: Number
	},
	phoneNumber: String,
	points: Number
});


var orderSchema = new Schema({
	items: [
		{
			dish: Schema.Types.ObjectId,
			quantity: Number, 
			comments: String
		}
	],
	comments: String, 
	deliverToUserAddress: Boolean, 
	altAddress : {
		country: String, 
		city: String, 
		area: String, 
		street: String, 
		building: String,
		lat: Number,
		lng: Number
	},
	acceptedByChef: Boolean,
	reproposedTimeByChef: Boolean,
	rejectedByChef: Boolean, 
	timeOfOrder: Date, 
	timeOfDevlivery: Date, 
	reschedualeTime: Date
});



//Declarations for Model Module
var Chef = restful.model("Chef", chefSchema);
module.exports.Chef = Chef;

var Dish = restful.model("Dish", dishSchema);
module.exports.Dish = Dish;

var User = restful.model("User", userSchema);
module.exports.User = User;

var Order = restful.model("Order", orderSchema);
module.exports.Order = Order;
