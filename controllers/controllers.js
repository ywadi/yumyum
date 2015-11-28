function isLoggedInUser(req, res ,next){
	console.log("TODO: Check Login");
	//TODO: Store username, token to redis and check the token is there or not 
	//Request should contain a authKey: parameter to check 
	//Check if the sent key is in Redis, if so the user gets his ID back 
	//Else error happens and user is not autherized 
	next();
}

function login(req, res, next){
	//TODO: Implement login
	//Use Redis for sessions
	//When user logs in a key is create, the key is mapped to user ID 
	res.send("LOG IN SUCCESS?!");
}

module.exports.isLoggedInUser = isLoggedInUser;
module.exports.login = login;