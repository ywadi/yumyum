angular.module('Countries', ["ngRoute", "ngResource"]);  
angular.module('Countries').controller('CountryCTRL',CountryCTRL);

function CountryCTRL ($scope, $resource, $location)
{
	console.log("Running....");
	
}
