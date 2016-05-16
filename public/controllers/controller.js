var path = 'http://localhost:3000/';
var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    var counter = 0;
    //date sort function
    
    $('.na-menu li.item').click(function() {
    $('.na-menu li').removeClass('uk-active');
        this.className = 'uk-active'; 
    });
    
    Date.prototype.addDays = function(days) {
        var dat = new Date(this.valueOf())
        dat.setDate(dat.getDate() + days);
        return dat;
    }
    
    function dateView(today) {
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 
        return yyyy+'-'+mm+'-'+dd;
    }
    
    $scope.setDate = function() {
        document.getElementById("date").value = dateView(new Date());
    }
    
    // sorting array of objects
    function unique(arr) {
        var result = [];
        
        nextInput:
        for (var i = 0; i < arr.length; i++) {
            var str = arr[i];
            for (var j = 0; j < result.length; j++) { 
                if (result[j].category_id == str.category_id) {
                    result.splice(j, 1, {
                        color: randomColor(),
                        category_id: str.category_id,
                        categoryName: result[j].categoryName,
                        priceDollars: result[j].priceDollars + str.priceDollars,
                        priceCents: result[j].priceCents + str.priceCents
                    });
                    continue nextInput; 
                }
            }
            result.push({
                        color : randomColor(),
                        category_id: str.category_id,
                        categoryName: str.categoryName,
                        priceDollars: str.priceDollars,
                        priceCents: str.priceCents
                    });
        }
        $scope.period = result;
        $scope.loadChart();
    }
    
    $scope.datePeriod = function(per) {
        var endDate = new Date();
        var startDate = endDate.addDays(-per);
        var array = [];
        angular.forEach($scope.expenses, function(val) {
            if(new Date(val.date) < endDate && new Date(val.date) > startDate) {
                array.push(val);
            }
        });
        unique(array);
    }
    
    // refresh category scopes and build html template of categories
        var refresh = function() {
            $http.get(path + 'get_category').success(function(response) {
                $scope.categories = response;
                $http.get(path + 'get_sub_category').success(function(response) {
                    $scope.subCategories = response;
                        $http.get(path + 'get_item_category').success(function(response) {
                            $scope.itemCategories = response;
                            //===============================
                            //    generate template
                            //===============================
                            $scope.menuBuild = buildCategories($scope.categories, $scope.subCategories, $scope.itemCategories);
                        });
                });
            });
        }
        refresh();
    
    $scope.scopeCats = function() {
        $scope.cats = $scope.categories;
    }
    
    // fnc of html template buids
    var buildCategories = function(arr1, arr2, arr3) {
        var res = '';
        angular.forEach(arr1, function(value, key) {
            res += '<li data-category="true" data-category_id="'+ value._id +'"><a>' + value.categorieName + '</a>';
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
                res += '<li data-subCategory="true" data-category_id="'+ value.category_id +'" data-subCategory_id="'+ value._id +'"><a>' + value.subCategorieName + '</a>';
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
                res += '<li data-itemCategory="true" data-category_id="'+ value.category_id +'" data-subCategory_id="'+ value.subCategorie_id +'" data-itemCategory_id="'+ value._id +'"><a>' + value.itemCategorieName + '</a></li>';
            }
        });
        if(rule === false) {
            res += '</ul>';
        }
        return res;
    }  

    var viewExp = function(callback) {
        $http.get(path + 'view-expenses').success(function(response) {
            $scope.expenses = response;
            callback();
        });
    }
    viewExp(function(){});
    
    $scope.deleteExp = function(id) {
        $('#' + id).remove();
        $http.delete(path + 'delete-expense/' + id).success(function(response) {
            if(response.status) {
                UIkit(response.status, {status: 'danger', timeout: 450});
            }
           $scope.expenses = response; 
        });
    }
    
    $scope.newExpense = function() {
        $('#refresh').toggleClass('uk-icon-refresh uk-icon-spin');
        $http.post(path + 'new_expense', {
            params: {
                date: angular.element('#date').val(),
                what: angular.element('#what').val(),
                priceDollars: angular.element('#dollar').val(),
                priceCents: angular.element('#cent').val(),
                categoryName: angular.element('#categoryName').val(),
                category_id: angular.element('#category_id').val(),
                subCategory_id: angular.element('#subCategory_id').val(),
                itemCategory_id: angular.element('#itemCategory_id').val()
            }
        }).success(function(response) {
            if(response.status) {UIkit.notify(response.status, {timeout: 500})}else {
                $scope.expenses = response;
                UIkit.notify('All fine', {status: 'success', timeout: 450});
                $('#refresh').toggleClass('uk-icon-refresh uk-icon-spin');
                document.getElementById('categoryName').value = '';
                document.getElementById('category_id').value = '';
                document.getElementById('subCategory_id').value = '';
                document.getElementById('itemCategory_id').value = '';
                document.getElementById('dollar').value = '';
                document.getElementById('cent').value = '';
                document.getElementById('what').value = '';
            }
        });
    }
    
    //===============================
    //    Load Template
    //===============================

    $scope.loadTemplate = function(path) {
        $scope.templateURL = '../ajax/' + path + '.html';
    };
    
    //===============================
    //    ng-init
    //===============================

        $scope.loadChart = function() {
        var ctx = document.getElementById("myChart");
        var price = [];
        var name = [];
        var color = [];
        angular.forEach($scope.period, function(val) {
            price.push(val.priceDollars);
            color.push(val.color);
            for(var index in $scope.categories) {
                if($scope.categories[index]._id === val.category_id) {
                    name.push($scope.categories[index].categorieName);
                }
            }
        });
        var data = {
            datasets: [{
                data: price,
                backgroundColor: color,
                label: 'My dataset' // for legend
            }],
            labels: name
        };
        new Chart(ctx, {
            data: data,
            type: 'pie',
            options: {
                elements: {
                    arc: {
                        borderColor: "rgba(88, 83, 83, 0.63)"
                    }
                }
            }
        });
    }
    
    $scope.loadCategories = function() {
        document.getElementById('menu-content').innerHTML = $scope.menuBuild;
        jQuery( '#dl-menu' ).dlmenu();
    }
    
    //===============================
    //    breadcrumbs
    //===============================

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
    
    //===============================
    //    navigation categories
    //===============================
    
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
                            $scope.categories = response;
                            refresh();
                        UIkit.notify("Category created succesfully!", {status:'success', timeout : 450});
                    }
                });
            }if(sub && !item){
                $http.post(path + 'new_sub_category/' + val +'/' + sub.id).success(function(response){
                    console.log(sub);
                    if(response.error){
                        UIkit.notify(response.error);
                    }else{
                            $scope.cats = response;
                            $scope.subCategories = response;
                            refresh();
                        UIkit.notify("Category created succesfully!", {status:'success', timeout : 450});
                    }
                });
            }if(item && sub){
                $http.post(path +'new_item_category/'+ val +'/'+ sub.id +'/'+ item.id).success(function(response){
                    if(response.error){
                        UIkit.notify(response.error);
                    }else{
                            $scope.cats = response;
                            $scope.itemCategories = response;
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
    
    //===============================
    //    sort expenses
    //===============================
    
  $scope.order = function(item, vector) {
    $scope.reverse = vector;
    $scope.predicate = item;
  };
    
}]);