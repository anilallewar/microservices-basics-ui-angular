'use strict';

angular.module('oauthApp', ['ngRoute', 'ngAnimate', 'satellizer', 'toaster'])
    .config(function ($routeProvider, $httpProvider, $authProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/home.html',
            controller: 'homeCtrl'
        }).when('/user', {
            templateUrl: 'views/user.html',
            controller: 'userCtrl',
            controllerAs: 'userController'
        }).when('/task', {
            templateUrl: 'views/task.html',
            controller: 'taskCtrl',
            controllerAs: 'taskController'
        }).when('/login', {
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'
            //controllerAs: 'loginController'
        }).otherwise('/');

        //Custom header is needed starting angular 1.3; else Spring security might pop authentication dialog
        // by sending the WWW-Authenticate header field in the 401 Unauhorized HTTP response
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

        // satellizer Oauth2 configuration
        $authProvider.oauth2({
          name: 'testOAuth2',
          url: 'http://localhost:8899/userauth/oauth/token',
          clientId: 'acme',
          responseType: 'token',
          requiredUrlParams: ['scope'],
          scope: ['openid'],
          oauthType: '2.0',
          redirectUri: window.location.origin,
          authorizationEndpoint: 'http://localhost:8899/userauth/oauth/authorize',
        });

        $authProvider.github({
              clientId: 'b9c10dcd6c521214b092'
            });
        // Setup interceptor so that bearer token is added
        // $authProvider.httpInterceptor = true;
    })
    .directive("taskComments", function () {
        return {
            restrict: 'E',
            scope: {
                taskComments: '=comments'
            },
            templateUrl: "views/task-comments.html"
        };
    })
    .directive("taskDetails", function () {
        return {
            restrict: 'E',
            templateUrl: "views/task-details.html"
        };
    });
