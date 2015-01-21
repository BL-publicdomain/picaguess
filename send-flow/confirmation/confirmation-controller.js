(function(){
	var app = angular.module('controllers');

	app.controller('ConfirmationController',['$scope','$http','GameModel','CreditsModel','SentGamesModel',function($scope,$http,GameModel,CreditsModel,SentGamesModel) {
		console.log(SentGamesModel);
		$scope.categoryName = GameModel.getCategory().categoryname;
		$scope.images = GameModel.getImages();
		$scope.sendClicked = function() {
			GameModel.send(function(game) {
				var gameID = game._id;
				SentGamesModel.addSentGame(gameID);
				CreditsModel.incrementCredits(1);
				location="/";
			});
		}
	}]);

})();