var express = require('express');
var router = express.Router();
var Models = require("../models/models.js");

var Chef = Models.Chef;
Chef.methods(['get','put','post', 'delete']);
Chef.register(router, "/chef");

var Order = Models.Order;
Order.methods(['get','put','post', 'delete']);
Order.register(router, "/order");

var Dish = Models.Dish;
Dish.methods(['get','put','post', 'delete']);
Dish.register(router, "/dish");

var User = Models.User;
User.methods(['get','put','post', 'delete']);
User.register(router, "/dish");


//TODO: Handle a token to make sure user is logged in when creating an order 
//TODO: Upload images route for different types of data 
//TODO: Draw initial flow and handle it 


//Test route for uptime
router.get('/isOnline', function (req, res) {
  res.send("Online");
});

module.exports = router;