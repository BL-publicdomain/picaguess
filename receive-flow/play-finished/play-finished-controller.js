(function() {
	var app = angular.module('controllers');

	app.controller('PlayFinishedController',['$scope','$http','GameApiModel','ScoredGameModel',function($scope,$http,GameApiModel,ScoredGameModel) {
		var field = "";
		if(ScoredGameModel.getPlayerWon()) {
			$scope.message = "Congratulations!";
			field = 'wins';
		} else {
			$scope.message = "Better luck next time";
			field = 'losses';
		}
		GameApiModel.patchGame(ScoredGameModel.getGameId(),field).then(function(data) {
			var categoryName = data.category.categoryname;
			var totalScore = data.wins+data.losses;
			var wins = data.wins;
			var confidence = 0;
			if(totalScore!=0) {
				confidence = wins/totalScore;
			}
			var images = data.images;
			for(var i = 0; i<images.length; i++) {
				var imageId = images[i]._id;
				$http.put('https://bldata.herokuapp.com/images/'+imageId+'/crowd-tags/'+categoryName+'/'+confidence);
			}
		});
	}]);
})();