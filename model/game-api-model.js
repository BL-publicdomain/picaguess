(function() {
	var app = angular.module('models');
	app.factory('GameApiModel',['$http','GameApiConfig',function($http,GameApiConfig) {
		//Returns three random categories from the Game API to be displayed & selected during category selection
		function getCategories() {
			return $http.get(GameApiConfig.baseUrl+'/categories').then(function(result) {
				return result.data;
			});
		}
		//Returns a random game from the Game API to be displayed & guessed in in the play screen
		function getRandomGame() {
			return $http.get(GameApiConfig.baseUrl+'/game/random').then(function(result) {
				return result.data;
			});
		}
		function getGame(id) {
			return $http.get(GameApiConfig.baseUrl+'/game/'+id).then(function(result) {
				return result.data;
			});
		}
		function postGame(game) {
			return $http.post(GameApiConfig.baseUrl+'/game',game).then(function(result) {
				return result.data;
			});
		}
		function patchGame(id,field) {
			console.log(id);
			var fieldObj = {};
			fieldObj['field'] = field;
			return $http.patch('https://pinktastic.herokuapp.com/game/'+id,fieldObj).then(function(result) {
				return result.data;
			});
		}
		return {
			getCategories:getCategories,
			getRandomGame:getRandomGame,
			getGame:getGame,
			postGame:postGame,
			patchGame:patchGame
		};
	}]);
})();