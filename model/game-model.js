(function() {
	var app = angular.module('models');
	app.factory('GameModel',['GameApiModel',function(GameApiModel){
		var category = {};
		var images = [];
		function getCategory() {
			return category;
		}
		function setCategory(value) {
			category = value;
		}
		function getImages() {
			return images;
		}
		function setImages(value) {
			images = value;
		}
		function send(callback) {
			var gameObj = {};
			gameObj['category'] = category;
			gameObj['images'] = images;
			gameObj['wins'] = 0;
			gameObj['losses'] = 0;
			GameApiModel.postGame(gameObj).then(function(data) {
				callback(data);
			});
		}
		return {
			getCategory:getCategory,
			setCategory:setCategory,
			getImages:getImages,
			setImages:setImages,
			send:send
		};
	}]);
})();