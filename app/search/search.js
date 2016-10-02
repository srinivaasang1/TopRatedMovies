'use strict';

angular.module('search', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: 'search/search.html',
    controller: 'SearchCtrl',
    resolve: {
      movieLoaded: function(MovieProvider) {
        return MovieProvider.dataLoaded;}
      }
  });
}])

.controller('SearchCtrl',['$scope', 'MovieProvider',function($scope, MovieProvider) {
  $scope.movieData = MovieProvider.getAllMovies;
  $scope.movieData.operation.init();
}]);
