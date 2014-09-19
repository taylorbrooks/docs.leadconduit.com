'use strict';

// Declare app level module which depends on filters, and services
angular.module('lcDocs', [
  'ngRoute',
  'ngResource',
  'lcDocs.controllers'
]).
config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);