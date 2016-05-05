var path = 'http://localhost:3000/';
var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
    var counter = 0;
    var refresh = function() {
        $http.get(path + 'get_category').success(function(response) {
            $scope.categories = response;
            $scope.categorie = "";
            $scope.cats = $scope.categories;
            $http.get(path + 'get_sub_category').success(function(response) {
                $scope.subCategories = response;
                $scope.subCategorie = "";
                    $http.get(path + 'get_item_category').success(function(response) {
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
    
    $scope.refreshSimple = function() {
        $http.get(path + 'get_category').success(function(response) {
            $scope.categories = response;
            $scope.categorie = "";
            $http.get(path + 'get_sub_category').success(function(response) {
                $scope.subCategories = response;
                $scope.subCategorie = "";
                    $http.get(path + 'get_item_category').success(function(response) {
                        $scope.itemCategories = response;
                        $scope.itemCategorie = "";
                    });
            });
        });
    }
    
    $scope.refreshSimple();
    
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
    
    var viewExp = function() {
        $http.get(path + 'view-expenses').success(function(response) {
            $scope.expenses = response;
        });
    }
    viewExp();
    // templates
    
    $scope.deleteExp = function(id) {
        $http.delete(path + 'delete-expense/' + id).success(function(response) {
            if(response.status) {
                UIkit(response.status, {status: 'danger', timeout: 450});
            }
           $scope.expenses = response; 
        });
    }
    
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
            jQuery( '#dl-menu' ).dlmenu();
        },300);
    }
    
    $scope.Dashboard = function($scope) {
        loadTemplate('../ajax/main_content.html');
    }
    
    $scope.MannageCategories = function($scope) {
        loadTemplate('../ajax/mannage_categories.html');
    }
    
    $scope.ListExpenses = function($scope) {
        viewExp();
        loadTemplate('../ajax/list_expenses.html');
    }

    $scope.breadcrumbsCtrl = function() {
        counter = 0;
        $scope.id = 999;
        $scope.cats = $scope.categories;
        $scope.levelOne = undefined;
        $scope.levelTwo = undefined;
    }
    
    $scope.breadcrumbsCtrlLvl2 = function(id, name) {
        counter = 1;
        $scope.levelTwo = undefined;
        $scope.cats = $scope.subCategories;
        $scope.id = id;
    }
    
    $scope.showSubCategory = function(id, name, subName) {
        if(counter < 3) {
            counter++;
        }
        switch(counter) {
            case 0: 
                $scope.cats = $scope.categories;
                $scope.id = id;
                break;
            case 1:
                $scope.levelOne = {
                        name: name,
                        id: id,
                        icon: 'uk-icon-caret-right',
                        active: 'activeBreadcrumb'
                };
                $scope.cats = $scope.subCategories;
                $scope.id = id;
                break;
            case 2:
                 $scope.levelTwo = {
                        name: subName,
                        id: id,
                        icon: 'uk-icon-caret-right',
                        active: 'activeBreadcrumb'
                };
                $scope.cats = $scope.itemCategories;
                $scope.id = id;
                break;
            case 3:
                counter--;
            default: 
                break;
        }
    }
    
    $scope.deleteCategory = function(obj) {
        $('.' + obj._id).remove();
        if(obj.categorieName) {
            $http.delete(path + 'category/' + obj._id).success(function(response) {
                $scope.cats = response;
                refresh();
                UIkit.notify('Deleted', {status:'danger', timeout: 450});
            });
        }if(obj.subCategorieName) {
            $http.delete(path + 'sub_category/' + obj._id).success(function(response) {
                $scope.cats = response;
                refresh();
                UIkit.notify('Deleted', {status:'danger', timeout: 450});
            });
        }if(obj.itemCategorieName){
            $http.delete(path + 'item_category/' + obj._id).success(function(response) {
                $scope.cats = response;
                refresh();
                UIkit.notify('Deleted', {status:'danger', timeout: 450});
            });
        }
    }
    
    $scope.addCategory = function(sub, item) {
        UIkit.modal.prompt('Name:', '', function(val){ 
            if(!sub && !item) {
                $http.post(path + 'new_category/' + val).success(function(response){
                    if(response.error){
                        UIkit.notify(response.error);
                    }else{
                            $scope.cats = response;
                            refresh();
                        UIkit.notify("Category created succesfully!", {status:'success', timeout : 450});
                    }
                });
            }if(sub && !item){
                $http.post(path + 'new_sub_category/' + val +'/' + sub.id).success(function(response){
                    if(response.error){
                        UIkit.notify(response.error);
                    }else{
                            $scope.cats = response;
                            refresh();
                        UIkit.notify("Category created succesfully!", {status:'success', timeout : 450});
                    }
                });
            }if(item && sub){
                $http.post(path + 'new_item_category/' + val +'/' + item.id).success(function(response){
                    if(response.error){
                        UIkit.notify(response.error);
                    }else{
                            $scope.cats = response;
                            refresh();
                        UIkit.notify("Category created succesfully!", {status:'success', timeout : 450});
                    }
                });
            }
        });
    }
    
    $scope.rename = function(obj) {
        UIkit.modal.prompt('New name:', '', function(val){
            if(obj.categorieName) {
                $http.post(path + 'rename_category/' + obj._id + '/' + val).success(function(response) {
                    if(response.error){
                        UIkit.notify(response.error);
                    }else{
                        $scope.cats = response;
                        refresh();
                        UIkit.notify("Ranamed", {status:'success', timeout : 450});
                    }
                });    
            }if(obj.subCategorieName) {
                $http.post(path + 'rename_sub_category/' + obj._id + '/' + val).success(function(response) {
                    if(response.error){
                        UIkit.notify(response.error);
                    }else{
                        $scope.cats = response;
                        refresh();
                        UIkit.notify("Ranamed", {status:'success', timeout : 450});
                    }
                });    
            }if(obj.itemCategorieName){
                $http.post(path + 'rename_item_category/' + obj._id + '/' + val).success(function(response) {
                    if(response.error){
                        UIkit.notify(response.error);
                    }else{
                        $scope.cats = response;
                        refresh();
                        UIkit.notify("Ranamed", {status:'success', timeout : 450});
                    }
                });    
            }
        });
    }
    
  $scope.order = function(item, vector) {
    $scope.reverse = vector;
    $scope.predicate = item;
  };
    
}]);