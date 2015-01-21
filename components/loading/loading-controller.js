(function() {
	var app = angular.module('controllers');
	app.controller('LoadingController',['$scope','LoadingModel',function($scope,LoadingModel) {
		$scope.loading = LoadingModel.getLoading();
		$scope.$watch(LoadingModel.getLoading, function(loading) {
			$scope.loading = loading;
		});
	}]);
})();