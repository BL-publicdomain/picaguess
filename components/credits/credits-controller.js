(function(){
	var app = angular.module('controllers');
	app.controller('CreditsController',['$scope','CreditsModel',function($scope,CreditsModel) {
		$scope.credits = CreditsModel.getCredits();
		$scope.$watch(CreditsModel.getCredits, function(credits) {
			$scope.credits = credits;
		});
	}]);
})();