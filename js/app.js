(function(){
	var app = angular.module('fsf', ['ui.router', 'fsf.NearbyController']);
	app.controller('MainController', function($scope, $state){
		this.data = mainViewData;

		/*$('.main-block').hammer( {
		    recognizers: [
		        // RecognizerClass, [options], [recognizeWith, ...], [requireFailure, ...]
		        [Hammer.Tap],
		        [Hammer.Pinch, { enable: true }],
	        	[Hammer.Swipe,{ direction: Hammer.DIRECTION_HORIZONTAL }],
		        // [Hammer.Pinch, { enable: true }, ['rotate']],
		        // [Hammer.Swipe,{ direction: Hammer.DIRECTION_HORIZONTAL }],
		    ]
		}).on("pinch", function(e){
			e.preventDefault();
	        // console.log(e.gesture.scale);
		    if(e.gesture.scale > 1){
			    $('body').addClass('detail-page');
				$('.main-block').removeClass('active');
			    $(this).addClass('active');
		    } else if(e.gesture.scale < 1){
			    $('body').removeClass('detail-page');
			    $(this).removeClass('active');
		    } 
		}).on("tap", function(e){
			e.preventDefault();
	        // console.log(e.gesture.scale);
		    $('body').addClass('detail-page');
			$('.main-block').removeClass('active');
		    $(this).addClass('active');
		    //Go to exclusive gifts test
		    $state.go('exclusiveGifts');
		    //console.log($state);
		}).on("swipe", function(e){
			e.preventDefault();
			console.log(e);
		    $('body').addClass('detail-page');
			$('.main-block').removeClass('active');
		    if(!$(this).is(':last-child')) {
			    $(this).next('.main-block').addClass('active');
		    } else {
			    $('.main-block:first-child').addClass('active');
		    }
		});*/

		$scope.setPage = function (page) {
		    $state.transitionTo(page);
		};

		setTimeout(function(){
			// Hide the address bar!
			window.scrollTo(0, 1);
		}, 0);
	});
	
	app.controller('ViewController', function($scope, $state){
		this.menuActive = 0;
	});

	
	var mainViewData = {
		exclusiveGifts: 1,
		myRecycles: 2,
		nearbyGifts: 24
	}

	app.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider

			.state('main', {
				url: '/main',
				templateUrl: 'templates/main.html',
				controller: 'MainController',
				controllerAs: 'main'
			})

			.state('view', {
				views: {
		            '': { 
						templateUrl: 'templates/view.html',
						controller: 'ViewController',
						controllerAs: 'view'
		            },
		            'menu@view': { 
		                templateUrl: 'templates/menu.html',
		                // controller: 'menuController'
		            }
		        }
			})

			.state('view.exclusive', {
				url: '/exclusive-gifts',
				templateUrl: 'templates/exclusive-gifts.html'
			})
			.state('view.mine', {
				url: '/my-recycles',
				templateUrl: 'templates/my-recycles.html',
			})
			.state('view.nearby', {
				url: '/nearby-gifts',
				templateUrl: 'templates/nearby-gifts.html',
				controller: 'NearbyController',
				// controllerAs: 'nearby'
			})
			.state('view.new', {
				url: '/new-recycle',
				templateUrl: 'templates/new-recycle.html'
			});

		$urlRouterProvider.otherwise('/main');
	})


})()
