(function() {
	var app = angular.module('models');
	app.factory('LoadingModel',function() {
		var loading = false;
		function getLoading() {
			return loading;
		}
		function setLoading(value) {
			loading = value;
		}
		return {
			getLoading:getLoading,
			setLoading:setLoading
		};
	});
})();