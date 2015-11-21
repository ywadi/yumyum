var express = require('express');
var AdminModels = require("../models/models.js");
var AppModels = require("../models/models.js");
var Contoller = require ("../controllers/controllers.js");

//Admin Routes /////////////////////////////////////////////////////////
var adminRouter = express.Router();

var AdminChef = AdminModels.Chef;
AdminChef.methods(['get','put','post', 'delete']);
AdminChef.register(adminRouter, "/chef");

var AdminOrder = AdminModels.Order;
AdminOrder.methods(['get','put','post', 'delete']);
AdminOrder.register(adminRouter, "/order");

var AdminDish = AdminModels.Dish;
AdminDish.methods(['get','put','post', 'delete']);
AdminDish.register(adminRouter, "/dish");

var AdminUser = AdminModels.User;
AdminUser.methods(['get','put','post', 'delete']);
AdminUser.register(adminRouter, "/user");
/////////////////////////////////////////////////////////


//User Routes /////////////////////////////////////////////////////////
var appRouter = express.Router();

var AppChef = AppModels.Chef;
AppChef.methods(['get']);
AppChef.register(appRouter, "/chef");

//TODO: Handle a token to make sure user is logged in when creating an order 
var AppOrder = AppModels.Order;
AppOrder.methods(['get','put','post']);
AppOrder.before('post', Contoller.isLoggedInUser).before('get', Contoller.isLoggedInUser).before('put', Contoller.isLoggedInUser);
AppOrder.register(appRouter, "/order");


var AppDish = AppModels.Dish;
AppDish.methods(['get']);
AppDish.before('get', Contoller.isLoggedInUser);
AppDish.register(appRouter, "/dish");

var AppUser = AppModels.User;  //TODO: Just allow the user to do operations to his only
AppUser.methods(['get','put','post']);
AppUser.before('post', Contoller.isLoggedInUser).before('get', Contoller.isLoggedInUser).before('put', Contoller.isLoggedInUser);
AppUser.route('login.post', Contoller.login); // Register login here 
//TODO: Registration route for users 
//TODO: Verification route for users


AppUser.register(appRouter, "/user");
/////////////////////////////////////////////////////////


//TODO: Upload images route for different types of data 
//TODO: Draw initial flow and handle it 


//Test route for uptime
adminRouter.get('/isOnline', function (req, res) {
  res.send("Online");
});

module.exports.Admin = adminRouter;
module.exports.App = appRouter;

