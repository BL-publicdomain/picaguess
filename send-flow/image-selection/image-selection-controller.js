(function() {
	var app = angular.module('controllers');

	app.controller('ImageSelectionController', ['$scope','$http','GameModel','LoadingModel', function($scope, $http, GameModel,LoadingModel) {
		var me = this;
		$scope.categoryName = GameModel.getCategory().categoryname;
		$scope.canProgress = false;
		LoadingModel.setLoading(true);
		function getImage(count,dataArray) {
			if(count>0) {
				$http.get('https://bldata.herokuapp.com/images/random').success(function(data){
					dataArray.push(data)
					data.selected = false;
					data.slideIndex = -1;
					data.positionIndex = -1;
					getImage(count-1,dataArray);
				});
			} else {
				LoadingModel.setLoading(false);
			}
			return dataArray;
		}
		$scope.visibleImages = getImage(4,[]);
		$scope.hiddenImages  = getImage(4,[]);
		$scope.storeArray = [];
		$scope.storeArray[0] = $scope.visibleImages;
		var currentIndex = 0;

		$scope.targetimages = [];

		for(var i=0; i<4; i++){
			$scope.targetimages.push("-");
		}

		$scope.nextClicked = function() {
				var sizeofDiv = $('#firstslide').outerWidth(true);
				$('#firstslide').animate({right: sizeofDiv +'px'}, function() {

					if(currentIndex < $scope.storeArray.length-1) {
						currentIndex = currentIndex+1;
						$scope.visibleImages = $scope.storeArray[currentIndex]; 
						$scope.$apply();
					} else {
						$scope.storeArray[currentIndex]=$scope.visibleImages;
						$scope.$apply();
						currentIndex = currentIndex+1;
						//$scope.storeArray[currentIndex]=$scope.visibleImages;
						console.log($scope.storeArray);
						console.log(currentIndex); // 1 2 3	
						$scope.visibleImages = $scope.hiddenImages;
						$scope.storeArray[currentIndex]=$scope.visibleImages;
						$scope.$apply();
						$('#firstslide').css({right: 0});
						$scope.hiddenImages = getImage(4, []);
						$scope.$apply();
					}
				});
				$('#secondslide').animate({right: sizeofDiv +'px'},function() {
					$('#secondslide').css({right: 0});
				});	

				console.log(currentIndex); // 0 1 2
		}	


		$scope.previousClicked = function(){
			var sizeofDiv = $('#firstslide').outerWidth(true);
			console.log(currentIndex);
			if(currentIndex > 0){
				$('#firstslide').animate({left: sizeofDiv +'px'},function(){
					currentIndex = currentIndex-1;
					console.log(currentIndex);
					$scope.visibleImages = $scope.storeArray[currentIndex];
					$scope.$apply();
					$('#firstslide').css({left: 0});
				});
			
				 $('#secondslide').animate({left: sizeofDiv +'px'},function() {
					$('#secondslide').css({left: 0});
				 });	
			}
		}

		$scope.clickedImage = function(index){
			//var setLimit = $scope.visibleImages.length;
			//console.log(setLimit);
		if($scope.targetimages.indexOf("-") != -1){
			if(!$scope.visibleImages[index].selected){
			console.log($scope.visibleImages[index].spaceIndex);

			$scope.visibleImages[index].spaceIndex = $scope.targetimages.indexOf("-");
			var targetIndex = $scope.targetimages.indexOf("-");
			$scope.targetimages[targetIndex] = $scope.visibleImages[index];
			$scope.targetimages[targetIndex].slideIndex = currentIndex;
			$scope.targetimages[targetIndex].positionIndex = index;
			console.log($scope.targetimages.indexOf("-"));
			console.log($scope.visibleImages[index]);
			
			console.log($scope.visibleImages[index].spaceIndex);
			$scope.visibleImages[index].selected = true;
			//$scope.visibleImages[index].slideIndex = currentIndex;
			console.log(index); //this is the index of image selected from the image slider
			console.log($scope.targetimages); //undefined
			}
		}
		if($scope.targetimages.indexOf("-") == -1) {
			$scope.canProgress = true;
		} else {
			$scope.canProgress = false;
		}
	}

		$scope.spaceClicked = function(index){
			if($scope.targetimages[index] != "-"){
				console.log($scope.targetimages[index].slideIndex);
				// $scope.targetimages[index] = "-";
				// for(var i=0; i<$scope.visibleImages.length; i++){
				// 	if($scope.visibleImages[i].spaceIndex === index){
				// 		console.log($scope.visibleImages[i]);
				// 		$scope.visibleImages[i].selected = false;

				// 	}
				// }
				// $scope.tempArray = [];
				//$scope.apply();
				//$scope.tempArray.push($scope.storeArray[$scope.targetimages[index].slideIndex]);
				var slideIndex = $scope.targetimages[index].slideIndex;
				var positionIndex = $scope.targetimages[index].positionIndex;
				console.log(slideIndex);
				console.log(positionIndex);
				console.log($scope.storeArray);

				(($scope.storeArray[slideIndex])[positionIndex]).selected = false;
				$scope.targetimages[index] = "-";
				console.log(($scope.storeArray[slideIndex])[positionIndex]);
				console.log($scope.storeArray[slideIndex]);
						if($scope.targetimages.indexOf("-") == -1) {
			$scope.canProgress = true;
		} else {
			$scope.canProgress = false;
		}
			}

		}

		$scope.doneClicked = function() {
			if($scope.canProgress) {
				GameModel.setImages($scope.targetimages);
				location = '/#/confirmation';
			}
		}
		

	}]);
})();
