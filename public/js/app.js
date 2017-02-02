angular
  .module('wingifyApp', ['ui.bootstrap', 'uuid4', 'ngRoute', 'ngCookies'])

  .config(function($routeProvider, $locationProvider) {

    $routeProvider

    // home page
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainController'
      });

    $locationProvider.html5Mode(true);

  })

  .run(function(socketService){
    socketService.init();
  });