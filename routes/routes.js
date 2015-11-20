var express = require('express');
var router = express.Router();
var Models = require("../models/models.js");

var Chef = Models.Chef;
Chef.methods(['get','put','post', 'delete']);
Chef.register(router, "/chef");

var Order = Models.Order;
Order.methods(['get','put','post', 'delete']);
Order.register(router, "/order");



//Test route for uptime
router.get('/isOnline', function (req, res) {
  res.send("Online");
});

module.exports = router;