angular.module('Category', ["ngRoute", "ngResource"]);  
angular.module('Category').controller('categoryCTRL',categoryCTRL);

function categoryCTRL($scope, $resource, $location){

	$scope.getCategories = function(){
		$scope.categoryRes = $resource("http://localhost:3000/admin/v1/:action",{sort:'-_id' ,action:"category"});
		$scope.categories = $scope.categoryRes.query();
	};
	$scope.getCategories();

	$scope.updateCategory= function(item){
		var updater =  $resource("http://localhost:3000/admin/v1/:action/:id",{action:"category", id:item._id}, {update: { method: 'PUT' }});
		updater.update(item, function(){
			$scope.updateSuccessMsg = true;
			alert("All Good !");
		},
		function(err){
			alert("Something Went Wrong! Contact the responsible.")
			console.log("ERROR-Updating: ", err);
		});
	}

	$scope.deleteCategory= function(item){
		if(confirm("Are you sure you want to drop "+item.shopNameEN+ "into a black hole never to come back ?"))
		{
			var deleter =  $resource("http://localhost:3000/admin/v1/:action/:id",{action:"category", id:item._id});
			deleter.delete(item, function(){
				$scope.getCategories();
			});
		}
	}


	$scope.triggerShowOk = function(){
		$scope.showOK = true;
		setTimeout(function(){
			 $scope.$apply(function() //On callbacks functions need to be assigend to scope to be able to fire them
		     {
		       	$scope.showOK = false;
		       	$scope.showAdd = false;
				$scope.newCategory={};
		     });
		}, 2000)
	}

	$scope.saveToDB = function(){
		var saver =  $resource("http://localhost:3000/admin/v1/:action",{action:"category"}); // Save to REST API
		saver.save($scope.newCategory,
		function(data){
			console.log(data);
			$scope.triggerShowOk();
			$scope.getCategories();
			//$scope.chefsResult.push(data);
			$scope.newForm.setUntouched();
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