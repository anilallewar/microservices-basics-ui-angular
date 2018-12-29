'use strict';

/**
 * @ngdoc function
 * @name oauthApp.controller:loginCtrl
 * @description
 *
 * Controller for the login functionality
 */
 angular.module('oauthApp')
     .controller('loginCtrl', function ($scope, $location, $auth, toaster) {

/*
      $scope.login = function() {
        $auth.login($scope.user)
          .then(function() {
            toaster.success('You have successfully signed in!');
            $location.path('/');
          })
          .catch(function(error) {
            toaster.error(error.data.message, error.status);
          });
        };
*/
      $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
          .then(function() {
            toaster.success('You have successfully signed in with ' + provider + '!');
            $location.path('/');
          })
          .catch(function(error) {
            if (error.message) {
              // Satellizer promise reject error.
              toaster.error(error.message);
            } else if (error.data) {
              // HTTP response error from server
              toaster.error(error.data.message, error.status);
            } else {
              toaster.error(error);
            }
          });
        };

});
