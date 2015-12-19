//TODO: List of countries and cities to come from DB to avoid complications
angular.module('Chef', ["ngRoute", "ngResource"]);  
angular.module('Chef').controller('ChefCTRL',ChefCTRL);

function ChefCTRL($scope, $resource, $location){

	$scope.getCountries = function(){
		$scope.countriesRes = $resource("http://localhost:3000/admin/v1/:action",{action:"country"});
		$scope.countries = $scope.countriesRes.query();
	}
	$scope.getCountries();

	$scope.getCities = function(countryId, cb){
		$scope.citiesRes = $resource("http://localhost:3000/admin/v1/:action",{action:"city", countryId:countryId });
		var res = $scope.citiesRes.query(cb);
		return res;
	}

	$scope.getAreas = function(cityId){
		console.log("A");
		$scope.areaRes = $resource("http://localhost:3000/admin/v1/:action",{action:"area", cityId:cityId });
		var res = $scope.areaRes.query();
		return res;
	}

	$scope.debug = function(item){
		console.log(item);
	}

	$scope.goMenu = function(chefId)
	{
		var path = window.location.href.substr(0, location.href.lastIndexOf("/") + 1)
		console.log(path);
		window.location.href = path+"menu.html?chefId="+chefId;
	}

	//$scope.countries = [{country:"jordan"},{country:"saudi arabia"}];
	$scope.getChefs = function(){
		$scope.chefsList = $resource("http://localhost:3000/admin/v1/:action",{select: 'shopNameEN shopNameAR firstNameEN firstNameAR lastNameEN lastNameAR', sort:'-_id' ,action:"chef"});
		$scope.chefsResult = $scope.chefsList.query();
	}
	$scope.getChefs();


	$scope.getInfo = function(item){
		if(!item.appear)
		{
			item.chefItem = $resource("http://localhost:3000/admin/v1/:action/:id",{action:"chef", id:"@id"});	
			item.chefInfo = item.chefItem.get({id:item._id}, function(){
				item.tmp = {};
				item.tmp.cities = $scope.getCities(item.chefInfo.address.country, function(){
					//Get Areas 
					item.tmp.areas = $scope.getAreas(item.chefInfo.address.city);
				});	
				item.appear = true;
			});
		}
		else
		{
			item.appear = false;
		}
	};

	//Updating chefs happen here
	$scope.showUpdateErr = false;
	$scope.updateSuccessMsg = false;
	$scope.updateChanges = function(item){
		var updater =  $resource("http://localhost:3000/admin/v1/:action/:id",{action:"chef", id:item._id}, {update: { method: 'PUT' }});
		updater.update(item, function(){
			$scope.updateSuccessMsg = true;
			setTimeout(function(){
				 $scope.$apply(function() //On callbacks functions need to be assigend to scope to be able to fire them
			     {
			       $scope.updateSuccessMsg = false;
			     });
			}, 3000)
		},
		function(err){
			$scope.showUpdateErr = true;
			console.log("ERROR-Updating: ", err);
			setTimeout(function(){
			 $scope.$apply(function() //On callbacks functions need to be assigend to scope to be able to fire them
		     {
				$scope.showUpdateErr = false;
		     });
			}, 3000)
		});
	}
	$scope.test="OK";

	//Delete a Chef
	$scope.deleteRecord = function(item){
		if(confirm("Are you sure you want to delete "+item.shopNameEN))
		{
			var deleter =  $resource("http://localhost:3000/admin/v1/:action/:id",{action:"chef", id:item._id});
			deleter.delete(item, function(){
				console.log("BYE BYE");
				$scope.getChefs();
			});
		}
	}

	//Saving New Chefs Section Starts Here
	var saver =  $resource("http://localhost:3000/admin/v1/:action",{action:"chef"}); // Save to REST API
	$scope.showAdd = false;

	$scope.triggerShowOk = function(){
		$scope.showOK = true;
		setTimeout(function(){
			 $scope.$apply(function() //On callbacks functions need to be assigend to scope to be able to fire them
		     {
		       $scope.showOK = false;
		       $scope.showAdd = false;
				$scope.newChef={};
		     });
		}, 3000)
	}

	$scope.showSaveErr = false;
	$scope.newChef = {}; //Init
	$scope.saveToDB = function(){
		$scope.newChef.creation = {dateCreated: new Date(), platform: "WebAdmin"}; //Stamp the creation time
		console.log($scope.newChef); 
		saver.save($scope.newChef,
		function(data){
			console.log(data);
			$scope.triggerShowOk();
			$scope.getChefs();
			//$scope.chefsResult.push(data);
		},
		function (err)
		{
			$scope.showSaveErr = true;
			console.log("ERROR-Saving: ", err);
			setTimeout(function(){
			 $scope.$apply(function() //On callbacks functions need to be assigend to scope to be able to fire them
		     {
		       $scope.showSaveErr = false;
		     });
			}, 3000)
		});
	}


}