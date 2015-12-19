//TODO: List of countries and cities to come from DB to avoid complications
angular.module('Menu', ["ngRoute", "ngResource"]);  
angular.module('Menu').controller('MenuCTRL',MenuCTRL);

function MenuCTRL($scope, $resource){
	//TODO: Chef ID is missing or return is 0 to exit page ! somehow !
	$scope.chefId = getUrlParameter("chefId");

	$scope.getCategories = function(){
		$scope.categoryRes = $resource("http://localhost:3000/admin/v1/:action",{action:"category"});	
		$scope.categories = $scope.categoryRes.query();
	}
	$scope.getCategories();

	//Get Chef Information 
	$scope.chefItem = $resource("http://localhost:3000/admin/v1/:action/:id",{action:"chef", id:$scope.chefId});	
	$scope.currentChef = $scope.chefItem.get();

	$scope.showAdd = false;


	//Resources to get from DB
	$scope.getDishes = function(){
		$scope.dishesResource = $resource("http://localhost:3000/admin/v1/:action/:id",{action:"dish",  _chefID:$scope.chefId, sort:"-_id"});	
		$scope.dishesResult= $scope.dishesResource.query();
	}
	$scope.getDishes();


	//Delete a Dish
	$scope.deleteRecord = function(item){
		if(confirm("Are you sure you want to delete "+item.shopNameEN))
		{
			var deleter =  $resource("http://localhost:3000/admin/v1/:action/:id",{action:"dish", id:item._id});
			deleter.delete(item, function(){
				console.log("BYE BYE...");
				$scope.getDishes();
			});
		}
	}

	//Resource to Update to DB
	$scope.showUpdateErr = false;
	$scope.updateSuccessMsg = false;
	$scope.updateChanges = function(item){
		var updater =  $resource("http://localhost:3000/admin/v1/:action/:id",{action:"dish", id:item._id}, {update: { method: 'PUT' }});
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

	//Resources to save to DB
	$scope.triggerShowOk = function(){
		$scope.showOK = true;
		setTimeout(function(){
			 $scope.$apply(function() //On callbacks functions need to be assigend to scope to be able to fire them
		     {
		       $scope.showOK = false;
		       $scope.showAdd = false;
		       $scope.newDish={};

		     });
		}, 3000)
	}

	$scope.showSaveErr = false;
	$scope.newDish = {}; //Init
	$scope.saveToDB = function(){
		var saver =  $resource("http://localhost:3000/admin/v1/:action",{action:"dish"}); // Save to REST AP
		$scope.newDish._chefID = $scope.chefId;
		$scope.newDish.creation = {dateCreated: new Date(), platform: "WebAdmin"}; //Stamp the creation time
		console.log($scope.newDish); 
		saver.save($scope.newDish,
		function(data){
			console.log(data);
			$scope.triggerShowOk();
			$scope.getDishes();
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




//UTIL to get QUERYSTRING
function getUrlParameter(param, dummyPath) {
        var sPageURL = dummyPath || window.location.search.substring(1),
            sURLVariables = sPageURL.split(/[&||?]/),
            res;

        for (var i = 0; i < sURLVariables.length; i += 1) {
            var paramName = sURLVariables[i],
                sParameterName = (paramName || '').split('=');

            if (sParameterName[0] === param) {
                res = sParameterName[1];
            }
        }

        return res;
}