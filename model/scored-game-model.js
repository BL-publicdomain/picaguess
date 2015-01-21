(function() {
	var app = angular.module('models');
	app.factory('ScoredGameModel',function() {
		var gameId = "";
		var playerWon = false;
		function getGameId() {
			return gameId;
		}
		function setGameId(value) {
			gameId = value;
		}
		function getPlayerWon() {
			return playerWon;
		}
		function setPlayerWon(value) {
			playerWon = value;
		}
		return {
			getGameId:getGameId,
			setGameId:setGameId,
			getPlayerWon:getPlayerWon,
			setPlayerWon:setPlayerWon
		};
	});
})();