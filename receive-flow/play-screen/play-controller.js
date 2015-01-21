var revealCheat = {};
(function() {
	var app = angular.module('controllers');

	app.controller('PlayController',['$scope','$http','GameApiModel','ScoredGameModel','CreditsModel','LoadingModel',function($scope,$http,GameApiModel,ScoredGameModel,CreditsModel,LoadingModel) {
		LoadingModel.setLoading(true);
		var me = this;
		me.ScoredGameModel = ScoredGameModel;
		me.usedHint = false;
		localStorage["hasPlayed"] = 'true';
		GameApiModel.getRandomGame().then(function(data){
			me.gameId = data._id;
			$scope.targetWord = data.category.categoryname.toUpperCase();
			revealCheat = $scope.targetWord;
			$scope.images = data.images;
			$scope.wordArray = [];
			$scope.selectedImage = 0;

			for(var i = 0; i<$scope.targetWord.length; i++) {
				$scope.wordArray.push("-");
			}	

			$scope.letters = populateLetters($scope.targetWord);
		}).finally(function() {
			LoadingModel.setLoading(false);
		});

		$scope.letterClicked = function(index) {
			if(!$scope.letters[index].selected && $scope.wordArray.indexOf("-")!=-1) {
				$scope.letters[index].spaceIndex = $scope.wordArray.indexOf("-");
				$scope.wordArray[$scope.wordArray.indexOf("-")] = $scope.letters[index].letter;
				$scope.letters[index].selected = true;
			}
			var guessedWord = $scope.wordArray.join("");
			if(guessedWord===$scope.targetWord) {
				winGame();
			}
		}

		function winGame() {
			clearLetters();
			writeToScoredGameModel(me.gameId,true);
			moveToNextScreenAfterTimeout();
		}

		function clearLetters() {
			for(var i = 0; i<$scope.letters.length; i++) {
				$scope.letters[i].selected = true;
			}
		}

		function writeToScoredGameModel(gameId,playerWon) {
			me.ScoredGameModel.setGameId(gameId);
			me.ScoredGameModel.setPlayerWon(playerWon);
		}

		function moveToNextScreenAfterTimeout() {
			setTimeout(function() {
				window.location.href="/#/play-finished";
			},2000);
		}

		$scope.spaceClicked = function(index) {
			if($scope.wordArray[index]!="-") {
				$scope.wordArray[index] = "-";
				for(var i = 0; i<$scope.letters.length; i++) {
					if($scope.letters[i].spaceIndex===index) {
						$scope.letters[i].selected = false;
					}
				}
			}
		}

		$scope.imageClicked = function(index) {
			$scope.selectedImage = index;
		}

		$scope.hintClicked = function() {
			if($scope.canUseHint()) {
				decrementCredits();
				revealLetter();
				me.usedHint = true;
			}
		}

		$scope.canUseHint = function() {
			return (!me.usedHint&&CreditsModel.getCredits()>0);
		}

		function decrementCredits() {
			CreditsModel.incrementCredits(-1);
		}

		function revealLetter() {
			revealedLetterIndex = getLetterIndex(getNextCorrectLetter());
			console.log(revealedLetterIndex);
			$scope.letterClicked(revealedLetterIndex);
		}

		function getLetterIndex(letter) {
			for(var i = 0; i<$scope.letters.length;i++) {
				if($scope.letters[i].letter===letter && !$scope.letters[i].selected) {
					return i;
				}
			}
		}

		function getNextCorrectLetter() {
			for(var i = 0; i<$scope.wordArray.length;i++) {
				if($scope.wordArray[i]!=$scope.targetWord[i]) {
					console.log($scope.targetWord[i]);
					return $scope.targetWord[i];
				}
			}
		}

		$scope.giveUpClicked = function() {
			writeToScoredGameModel(me.gameId,false);
			location = '/#/play-finished';
		}
	}]);

	function populateLetters(targetWord) {
		var letters = targetWord.split("");
		for(var i = 0; i<7; i++) {
			letters.push(freqAdjustedLetter());
		}
		shuffle(letters);
		var ret = [];
		for(i = 0; i<letters.length; i++) {
			var letterObj = {
				"letter":letters[i],
				"selected":false,
				"spaceIndex":-1
			};
			ret.push(letterObj);
		}
		return ret;
	}

	function shuffle(o) {
    	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    	return o;
	}

	function freqAdjustedLetter() {
		var letterProbs = [
			{"letter":"A",
			"freq":8.17},
			{"letter":"B",
			"freq":1.49},
			{"letter":"C",
			"freq":2.78},
			{"letter":"D",
			"freq":4.25},
			{"letter":"E",
			"freq":12.7},
			{"letter":"F",
			"freq":2.3},
			{"letter":"G",
			"freq":2.02},
			{"letter":"H",
			"freq":6.09},
			{"letter":"I",
			"freq":6.97},
			{"letter":"J",
			"freq":0.15},
			{"letter":"K",
			"freq":0.77},
			{"letter":"L",
			"freq":4.03},
			{"letter":"M",
			"freq":2.40},
			{"letter":"N",
			"freq":6.75},
			{"letter":"O",
			"freq":7.51},
			{"letter":"P",
			"freq":1.93},
			{"letter":"Q",
			"freq":0.01},
			{"letter":"R",
			"freq":5.99},
			{"letter":"S",
			"freq":6.33},
			{"letter":"T",
			"freq":9.06},
			{"letter":"U",
			"freq":2.76},
			{"letter":"V",
			"freq":0.99},
			{"letter":"W",
			"freq":2.36},
			{"letter":"X",
			"freq":0.15},
			{"letter":"Y",
			"freq":1.97},
			{"letter":"Z",
			"freq":0.07}
		];

		var randNum = Math.random()*100;
		var runningTotal = 0;
		var i = 0;
		var returnLetter = "";

		while(returnLetter===""&&i<letterProbs.length) {	
			runningTotal+=letterProbs[i].freq;
			if(randNum<=runningTotal) {
				returnLetter = letterProbs[i].letter;
			}
			i++;
		}

		return returnLetter;
	}

})();