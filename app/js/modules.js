'use strict';

angular.module('lcDocs.controllers', [])
  .controller('DocsCtrl', ['$scope', '$http', '$resource', '$location', '$anchorScroll',
    function($scope, $http, $resource, $location, $anchorScroll) {

    $http.get('http://next.leadconduit.com/modules').
      success(function(data, status) {
        $scope.modules = data;
        _.each($scope.modules, function(module){
          console.log(module);
        });

      }).
      error(function(data, status) {
        console.log('data:' + data);
        console.log('status:' + status);
    });

    $scope.goToSection = function(moduleLink){
      $location.hash(moduleLink);
      $anchorScroll();
    };
  }]);