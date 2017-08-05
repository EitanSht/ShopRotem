app.controller("homeCtrl", ['$http', 'loginService', function ($http, loginService) {
    let vm = this;
    vm.loginService = loginService;
    // vm.item = {
    //     ITEMNAME: "Something",
    //     ITEMDESCRIPTION: "bla bla bla bla bla",
    //     ITEMPRICE: 50,
    //     ITEMPICTUREPATH: ""
    // };

    vm.items = [];

    vm.getTop5Trending = function () {
        $http.get('http://localhost:4000/items/gettrending').then(function (items) {
            vm.top5Items = items;
        }).catch(function (error) {
            vm.isNoPopularItemsMessageShow = true;
        });
    };

    // The set intervals are for the bad connection with the db
    vm.getTopNewItems = function () {
        setTimeout(function () {
            $http.get('http://localhost:4000/items/GetRecentItems').then(function (items) {
                vm.topNewItems = items;
            }).catch(function (error) {
                vm.isNoNewItemsMessageShow = true;
            });
        }, 650);
    }

    vm.loadItems = function () {
        setTimeout(function () {
            vm.getTop5Trending();
            if (vm.loginService.isloggedIn) {
                vm.getTopNewItems();
            }
        }, 650);
    }();
}]);

app.directive('product', function () {
    return {
        templateUrl: 'pages/templates/product-template.html',
        scope: {
            item: '='
        }
    };
});