angular.module('myApp', [])
    .controller('HelloController', function ($scope) {
        $scope.greeting = {message: "Hello"};
    });