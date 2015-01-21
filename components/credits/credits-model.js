(function(){
	var app = angular.module('models');
	app.factory('CreditsModel',function() {
		if(isNaN(localStorage['credits'])) {
			localStorage['credits'] = 3;
		}
		function getCredits() {
			return localStorage['credits'];
		}
		function setCredits(value) {
			localStorage['credits'] = value;
		}
		function incrementCredits(value) {
			setCredits(parseInt(getCredits())+parseInt(value));
		}
		return {
			getCredits:getCredits,
			setCredits:setCredits,
			incrementCredits:incrementCredits,
		}
	});
})();