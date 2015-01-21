(function(){
	var app = angular.module('models');

	app.controller('ScoreboardController',['$scope','SentGamesModel','GameApiModel',function($scope,SentGamesModel,GameApiModel){
		var getGames = function(IDs,retArray) {
			if(IDs.length>0) {
				GameApiModel.getGame(IDs.pop()).then(function(game) {
					retArray.push(game);
					getGames(IDs,retArray);
				});
			} else {
				$scope.games = retArray;
			}
		}
		getGames(SentGamesModel.getSentGames(),[]);
	}]);

})();