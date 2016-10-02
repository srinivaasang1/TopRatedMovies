'use strict';

angular.module('gallery', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/gallery', {
    templateUrl: 'gallery/gallery.html',
    controller: 'GalleryCtrl',
    resolve: {
      movieLoaded: function(MovieProvider) {
        return MovieProvider.dataLoaded;}
      }
  });
}])

.controller('GalleryCtrl', ['$scope', 'MovieProvider',function($scope, MovieProvider) {
  $scope.movieData = MovieProvider.getAllMovies;
  //chunk(myData, 3);
  function chunk(arr, size) {
  var newArr = [];
  for (var i=0; i<arr.length; i+=size) {
    newArr.push(arr.slice(i, i+size));
  }
  return newArr;
}
  $scope.movieData.operation.init();
  $scope.movieData.filteredMovies = chunk($scope.movieData.filteredMovies, 4);

  console.log($scope.movieData.filteredMovies[0]);



}]);
