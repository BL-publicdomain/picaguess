(function(){
	var app = angular.module('models');
	app.factory('SentGamesModel',function() {
		if(typeof localStorage["sentGames"] === 'undefined') {
			localStorage["sentGames"] = JSON.stringify([]);
		}
		function getSentGames() {
			return JSON.parse(localStorage["sentGames"]);
		}
		function setSentGames(value) {
			localStorage["sentGames"] = JSON.stringify(value);
		}
		function addSentGame(gameID) {
			var sentGames = getSentGames();
			sentGames.push(gameID);
			setSentGames(sentGames);
		}
		return {
			getSentGames:getSentGames,
			addSentGame:addSentGame
		};
	});
})();