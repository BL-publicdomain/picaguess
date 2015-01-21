(function(){
	var app = angular.module('controllers');

	app.controller('CategorySelectionController',['$scope','$http','GameModel','GameApiModel','LoadingModel',function($scope,$http,GameModel,GameApiModel,LoadingModel) {
		LoadingModel.setLoading(true);
		//Get three random categories from the API
		GameApiModel.getCategories().then(function(categories) {
			$scope.categories = categories;
		}).finally(function() {
			LoadingModel.setLoading(false);
		});
		//When a category is clicked add it to the Game Model
		$scope.categorySelected = function(category) {
			GameModel.setCategory(category);
			location='/#/image-selection'
		}
	}]);
})();