'use strict';

angular.module('details', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/gallery/:imdbID', {
    templateUrl: 'details/details.html',
    controller: 'DetailsCtrl',
    resolve: {
      movieLoaded: function(MovieProvider) {
        return MovieProvider.dataLoaded;}
      }
  });
}])

.controller('DetailsCtrl',['$scope', '$routeParams', '$location', 'MovieProvider',
    function ($scope, $routeParams, $location, MovieProvider) {
        $scope.movieData = MovieProvider.getAllMovies;
        if (!$scope.movieData.movieDic) $scope.movieData.operation.createDic();

        $scope.movie = $scope.movieData.movieDic[$routeParams.imdbID];
        $scope.movieNumber = $scope.movieData.filteredMovies.length;
        // find the current movie in filtered movie list
        $scope.currentIndex = $scope.movieData.filteredMovies.indexOf($scope.movie);

        $scope.prevMovie = function() {
            var relativeIndex = ($scope.currentIndex+$scope.movieNumber-1) % $scope.movieNumber;
            var imdbID = $scope.movieData.filteredMovies[relativeIndex].imdbID;
            $location.path('/gallery/'+imdbID);
        };
        $scope.nextMovie = function() {
            var relativeIndex = ($scope.currentIndex+1) % $scope.movieNumber;
            var imdbID = $scope.movieData.filteredMovies[relativeIndex].imdbID;
            $location.path('/gallery/'+imdbID);
        };
    }
]);
