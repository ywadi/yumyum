//Data Models 
var restful = require('node-restful');
var mongoose = restful.mongoose;
var Schema = mongoose.Schema;


//TODO: Default working hours of the chef 
var chefSchema = new Schema({
	firstNameAR: {type: String, minlength: 2, trim: true, maxlength: 20, required:true},
	lastNameAR: {type: String, minlength: 2, trim: true, maxlength: 20, required:true},
	firstNameEN: {type: String, minlength: 2, trim: true, maxlength: 20, required:true},
	lastNameEN: {type: String, minlength: 2, trim: true, maxlength: 20, required:true},
	shopNameAR:{type: String, minlength:2, trim: true, maxlength:20, required:true},
	shopNameEN:{type: String, minlength:2, trim: true, maxlength:20, required:true},
	photoFileName: {type: String}, 
	address: {
		email: {type: String, lowercase:true, match: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i},
		country: {type: String, minlength: 3, trim: true, maxlength: 20, required: true, lowercase: true },
		city: {type: String, minlength: 3, trim: true, maxlength: 20, required: true, lowercase: true },
		area: {type: String, minlength: 3, trim: true, maxlength: 20, required: true, lowercase: true },
		street: {type: String, minlength: 3, trim: true, maxlength: 20, required: true, lowercase: true },
		building: {type: String, trim: true, maxlength: 20, required: true, lowercase: true },
		lat: {type: Number},
		lng: {type: Number}
	}, 
	phoneNumber: {type: String, required:true, match: /\+[0-9]{3}\s[0-9]{4,}/, index: { unique: true }}, 
	rating: {type: Number}, 
	points: {type: Number}, 
	descEN: {type: String}, 
	descAR: {type: String},
	auth: {
		username: {type: String, required: true, minlength: 3, maxlength:20, index: { unique: true }}, 
		password: {type: String, required: true, minlength: 3, maxlength:20},
		blocked: {type: Boolean, default: false}
	},
	creation:{
		dateCreated: {type: Date, required:true}, 
		platform: {type: String, required:true}
	}
});


var dishSchema = new Schema({
	nameEN: { type: String, minlength:3, maxlength:50}, 
	nameAR: { type: String, minlength:3, maxlength:50}, 
	photoFileName: {type: String}, 
	descAR: {type: String},
	descEN: {type: String},
	_chefID: {type: Schema.Types.ObjectId, required: true},
	unitEN: {type: String}, 
	unitAR: {type: String},
	hoursPerUnit: {type: Number, required:true}, //How long a dish will take 
	defaultUnit:{ type: Number, required:true}, //The default count for the dish (1Manasaf dish)
	isDishOfDay: {type: Boolean, required: true, default: false},
	active: {type: Boolean, required:true, default: true},
	subcategory: [
		{
			nameEN: {type: String},
			nameAR: {type: String},
			comment: {type: String}
		}
	],
	creation:{
		dateCreated: {type: Date, required:true}, 
		platform: {type: String, required:true}
	}
});

var userSchema = new Schema({
	firstNameAR: {type: String, minlength: 2, trim: true, maxlength: 20},
	lastNameAR: {type: String, minlength: 2, trim: true, maxlength: 20},
	firstNameEN: {type: String, minlength: 2, trim: true, maxlength: 20},
	lastNameEN: {type: String, minlength: 2, trim: true, maxlength: 20},
	photoFileName: {type:String}, 
	auth: {
		username: {type: String, required: true, minlength: 3, maxlength:20, index: { unique: true }}, 
		password: {type: String, required: true, minlength: 3, maxlength:20}, //Should be MD5 
		blocked: {type: Boolean, default: false},
		verified: {type: Boolean, default: false},
		verificationCode: {type: Number, required: true, default: -1}
	},
	phoneNumber: {type: String, required:true, match: /\+[0-9]{3}\s[0-9]{4,}/, index: { unique: true }}, 
	address: {
		email: {type: String, lowercase:true, match: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i},
		country: {type: String, minlength: 3, trim: true, maxlength: 20, required: true, lowercase: true },
		city: {type: String, minlength: 3, trim: true, maxlength: 20, required: true, lowercase: true },
		area: {type: String, minlength: 3, trim: true, maxlength: 20, required: true, lowercase: true },
		street: {type: String, minlength: 3, trim: true, maxlength: 20, required: true, lowercase: true },
		building: {type: String, minlength: 3, trim: true, maxlength: 20, required: true, lowercase: true },
		lat: {type: Number},
		lng: {type: Number}
	},
	points: {type: Number}, 
	creation:{
		dateCreated: {type: Date, required:true}, 
		platform: {type: String, required:true}
	}
});


var orderSchema = new Schema({
	_userId: {type: Schema.Types.ObjectId, required:true},
	items: [
		{
			dish: {type: Schema.Types.ObjectId, required:true},
			quantity: {type: Number, min: 1}, 
			comments: {type: String}
		}
	],
	comments: {type: String}, 
	deliverToUserAddress: {type: Boolean}, 
	altAddress : {
		country: {type: String, minlength: 3, trim: true, maxlength: 20, required: false, lowercase: true },
		city: {type: String, minlength: 3, trim: true, maxlength: 20, required: false, lowercase: true },
		area: {type: String, minlength: 3, trim: true, maxlength: 20, required: false, lowercase: true },
		street: {type: String, minlength: 3, trim: true, maxlength: 20, required: false, lowercase: true },
		building: {type: String, minlength: 3, trim: true, maxlength: 20, required: false, lowercase: true },
		lat: {type: Number},
		lng: {type: Number}
	},
	acceptedByChef: {type: Boolean},
	reproposedTimeByChef: {type: Boolean},
	rejectedByChef: {type:Boolean}, 
	timeOfOrder: {type: Date, required: true}, 
	timeOfDevlivery: {type: Date, required: true}, 
	delivered: {type: Boolean, default: false},
	reschedualeTime: {type: Date},
	creation:{
		dateCreated: {type: Date, required:true}, 
		platform: {type: String, required:true}
	}
});

// COUNTRIES 
var countrySchema = ({
	nameEN: {type: String, required: true},
	nameAR: {type: String, required: true},
	isoCode: {type: String, required:true , minlength:2, maxlenght:2, index: { unique: true }}
});

// Cities 
var citySchema = ({
	countryCode:{type: Schema.Types.ObjectId, required: true},
	nameEN: {type: String, required: true},
	nameAR: {type: String, required: true},
	cityCode: {type: Number, required:true , index: { unique: true }}
});

//ADD TAGS for Dishes 



//Declarations for Model Module
var Chef = restful.model("Chef", chefSchema);
module.exports.Chef = Chef;

var Dish = restful.model("Dish", dishSchema);
module.exports.Dish = Dish;

var User = restful.model("User", userSchema);
module.exports.User = User;

var Order = restful.model("Order", orderSchema);
module.exports.Order = Order;

var Country = restful.model("Country", countrySchema);
module.exports.Country = Country;

var City = restful.model("City", citySchema);
module.exports.City = City;