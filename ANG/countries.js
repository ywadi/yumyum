angular.module('Countries', ["ngRoute", "ngResource"]);  
angular.module('Countries').controller('CountryCTRL',CountryCTRL);

function CountryCTRL ($scope, $resource, $location)
{
	console.log("Running....");

	$scope.getCountries = function(){
		$scope.countriesList = $resource("http://localhost:3000/admin/v1/:action/",{action:"country"});	
		$scope.countries = $scope.countriesList.query();
	};
	$scope.getCountries();

	
}
