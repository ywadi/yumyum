//Data Models 
var restful = require('node-restful');
var mongoose = restful.mongoose;
var Schema = mongoose.Schema;

var chefSchema = new Schema({
	firstNameAR: {type: String, minlength: 2, trim: true, maxlength: 20},
	lastNameAR: {type: String, minlength: 2, trim: true, maxlength: 20},
	firstNameEN: {type: String, minlength: 2, trim: true, maxlength: 20},
	lastNameEN: {type: String, minlength: 2, trim: true, maxlength: 20},
	photoFileName: {type:String}, 
	address: {
		email: {lowercase:true, match: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i},
		country: {type: String, minlength: 3, trim: true, maxlength: 20, required: true, lowercase: true },
		city: {type: String, minlength: 3, trim: true, maxlength: 20, required: true, lowercase: true },
		area: {type: String, minlength: 3, trim: true, maxlength: 20, required: true, lowercase: true },
		street: {type: String, minlength: 3, trim: true, maxlength: 20, required: true, lowercase: true },
		building: {type: String, minlength: 3, trim: true, maxlength: 20, required: true, lowercase: true },
		lat: {type: Number},
		lng: {type: Number}
	}, 
	phoneNumber: {required:true, match: /\+[0-9]{3}\s[0-9]{4,}/}, //+DDD DDDD
	rating: {type: Number}, 
	points: {type: Number}, 
	descEN: {type: String}, 
	descAR: {type: String},
	auth: {
		username: {type: String, required: true, minlength: 3, maxlength:20}, 
		password: {type: String, required: true, minlength: 3, maxlength:20}, //Should be MD5 
		blocked: {type: Boolean, default: false}
	},
	creation:{
		dateCreated: {typ: Date, required:true}, 
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
	subcategory: [
		{
			nameEN: {type: String},
			nameAR: {type: String},
			comment: {type: String}
		}
	],
	creation:{
		dateCreated: {typ: Date, required:true}, 
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
		username: {type: String, required: true, minlength: 3, maxlength:20}, 
		password: {type: String, required: true, minlength: 3, maxlength:20}, //Should be MD5 
		blocked: {type: Boolean, default: false}
	},
		phoneNumber: String, 
	address: {
		email: {lowercase:true, match: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i},
		country: {type: String, minlength: 3, trim: true, maxlength: 20, required: true, lowercase: true },
		city: {type: String, minlength: 3, trim: true, maxlength: 20, required: true, lowercase: true },
		area: {type: String, minlength: 3, trim: true, maxlength: 20, required: true, lowercase: true },
		street: {type: String, minlength: 3, trim: true, maxlength: 20, required: true, lowercase: true },
		building: {type: String, minlength: 3, trim: true, maxlength: 20, required: true, lowercase: true },
		lat: {type: Number},
		lng: {type: Number}
	},
	phoneNumber: {required:true, match: /\+[0-9]{3}\s[0-9]{4,}/}, //+DDD DDDD
	points: {type: Number}, 
	creation:{
		dateCreated: {typ: Date, required:true}, 
		platform: {type: String, required:true}
	}
});


var orderSchema = new Schema({
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
	reschedualeTime: {type: Date},
	creation:{
		dateCreated: {typ: Date, required:true}, 
		platform: {type: String, required:true}
	}
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
