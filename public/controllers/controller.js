var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http, $sce) {
    
    var refresh = function() {
        $http.get('http://localhost:3000/get_category').success(function(response) {
            $scope.categories = response;
            $scope.categorie = "";
            $http.get('http://localhost:3000/get_sub_category').success(function(response) {
                $scope.subCategories = response;
                $scope.subCategorie = "";
                    $http.get('http://localhost:3000/get_item_category').success(function(response) {
                        $scope.itemCategories = response;
                        $scope.itemCategorie = "";
                        //===============================
                        //    generate template
                        //===============================
                        $scope.menuBuild = buildCategories($scope.categories, $scope.subCategories, $scope.itemCategories);
                    });
            });
        });
    }
    refresh();
    
    var refreshSimple = function() {
        $http.get('http://localhost:3000/get_category').success(function(response) {
            $scope.categories = response;
            $scope.categorie = "";
            $http.get('http://localhost:3000/get_sub_category').success(function(response) {
                $scope.subCategories = response;
                $scope.subCategorie = "";
                    $http.get('http://localhost:3000/get_item_category').success(function(response) {
                        $scope.itemCategories = response;
                        $scope.itemCategorie = "";
                    });
            });
        });
    }
    
    var buildCategories = function(arr1, arr2, arr3) {
        var res = '';
        angular.forEach(arr1, function(value, key) {
            res += '<li><a>' + value.categorieName + '</a>';
            res = buildSubCategories(value._id, arr2, arr3,  res);
            res += '</li>';
        });
        return res;
    }
    
    var buildSubCategories = function(id, arr2, arr3, res) {
        var rule = true;
        angular.forEach(arr2, function(value, key) {
            if(value.category_id === id) {
                if(rule){
                    res += '<ul class="dl-submenu">';
                    rule = false;
                }
                res += '<li><a>' + value.subCategorieName + '</a>';
                res = buildItemCategories(value._id, arr3, res);
                res += '</li>';
            }
        });
        if(rule === false) {
            res += '</ul>';
        }
        return res;
    }
    
    var buildItemCategories = function(id, arr3, res) {
        var rule = true;
        angular.forEach(arr3, function(value, key) {
            if(value.subCategorie_id === id) {
                if(rule) {
                    res += '<ul class="dl-submenu">';
                    rule = false;
                }
                res += '<li><a>' + value.itemCategorieName + '</a></li>';
            }
        });
        if(rule === false) {
            res += '</ul>';
        }
        return res;
    }
    
    $scope.addCat = function(name) {
        $http.post('http://localhost:3000/new_category/' + name).success(function(response) {
            if(response.error) {
                UIkit.notify(response.error); 
            }else {
                UIkit.notify(response.status);
                document.getElementById('CN').value = '';
                    $http.get('http://localhost:3000/get_category').success(function(response) {
                        $scope.categories = response;
                        $scope.categorie = "";
                    });
            }
       });
   }
    
    $scope.addSubCat = function(name, id) {
        var category_id = document.querySelector('.menu__level--current').id;
        $http.post('http://localhost:3000/new_sub_category/' + name + '/' + category_id).success(function(response) {
            if(response.error) {
                UIkit.notify(response.error); 
            }else {
                UIkit.notify(response.status);
                document.getElementById('SCN').value = '';
                    $http.get('http://localhost:3000/get_sub_category').success(function(response) {
                        $scope.subCategories = response;
                        $scope.subCategorie = "";
                    });
            }
       });
   }    
    
    var viewCat = function() {
        $http.get('http://localhost:3000/view-expenses').success(function(response) {
            $scope.expenses = response;
        });
    }
    viewCat();
    
    $scope.newEx = function(date) {//if clicked twice, it's send's twice same info. pls fix
        $http.post('http://localhost:3000/new_expense').success(function(response) {
        });
    }
    
    // templates
    
    var loadTemplate = function(path) {
        $scope.templateURL = path;
    }
    
    //===============================
    //    module view controllers
    //===============================

    $scope.AddExpense = function() {
        loadTemplate('../ajax/add_expense.html');
        setTimeout(function() {
            document.getElementById('menu-content').innerHTML = $scope.menuBuild;
        }, 1000);
        
    }
    
    $scope.Dashboard = function($scope) {
        loadTemplate('../ajax/main_content.html');
    }
    
    $scope.MannageCategories = function($scope) {
        loadTemplate('../ajax/mannage_categories.html');
    }

}]);