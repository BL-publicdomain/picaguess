(function() {
	var app = angular.module('app',['ngRoute','routeStyles','controllers','models']);

	//Modules
	angular.module('controllers',[]);
	angular.module('models',[]);
	document.addEventListener('deviceready', function() {
		angular.element(document).ready(function() {
            angular.bootstrap(document);
        });
	}, true);
	//Constants
	/*
		Added API URLs as constants so that they can be switched out easily.
		Usage:
			Grab a reference to the constant and make API calls to: <constant>.baseUrl+<rest of API signature>
	*/
	app.constant('GameApiConfig',{
		'baseUrl':'https://pinktastic.herokuapp.com'
	});

	app.constant('ImageApiConfig',{
		'baseUrl':'https://bldata.herokuapp.com'
	});

	//Routes
	app.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.
				when('/',{
					templateUrl: './main-menu/main-menu.html',
					css:'/main-menu/main-menu.css'
				}).
				when('/android',{
					templateUrl: './android/android.html'
				}).
				when('/about',{
					templateUrl: './about/about.html'
				}).
				when('/first-play',{
					templateUrl: './main-menu/first-play.html',
					css:'/main-menu/main-menu.css'
				}).
				when('/play',{
					templateUrl: './receive-flow/play-screen/play.html',
					controller: 'PlayController',
					css: '/receive-flow/play-screen/play-styles.css'
				}).
				when('/play-finished',{
					templateUrl: './receive-flow/play-finished/play-finished.html',
					controller: 'PlayFinishedController'
				}).
				when('/category-selection',{
					templateUrl: './send-flow/category-selection/category-selection.html',
					controller: 'CategorySelectionController'
				}).
				when('/image-selection',{
					templateUrl: './send-flow/image-selection/image-selection.html',
					controller: 'ImageSelectionController',
					css: '/send-flow/image-selection/image-selection.css'
				}).
				when('/confirmation',{
					templateUrl: './send-flow/confirmation/confirmation.html',
					controller: 'ConfirmationController',
					css: '/send-flow/confirmation/confirmation.css'
				}).
				when('/scoreboard',{
					templateUrl: './scoreboard/scoreboard.html',
					controller: 'ScoreboardController',
					css:'/scoreboard/scoreboard.css'
				}).
				otherwise({
					redirectTo:'/'
				});
		}]);

})();