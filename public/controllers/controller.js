var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
        
    var refresh = function() {
        $http.get('http://localhost:3000/get_category').success(function(response) {
            $scope.categories = response;
            $scope.categorie = "";
        });
        $http.get('http://localhost:3000/get_sub_category').success(function(response) {
            $scope.subCategories = response;
            $scope.subCategorie = "";
        });
        $http.get('http://localhost:3000/get_item_category').success(function(response) {
            $scope.itemCategories = response;
            $scope.itemCategorie = "";
        });
    }
    refresh();
    
   $scope.addCat = function(name) {
       $http.post('http://localhost:3000/new_category/' + name).success(function(response) {
            UIkit.notify('Doned');
       });
   }
    
}]);