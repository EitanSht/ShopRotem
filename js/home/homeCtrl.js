app.controller("homeCtrl", ['$http', 'loginService', function ($http, loginService) {
    let vm = this;

    vm.msg = "RTS Herb Shop";
    vm.content = "Welcome dear customer, Here you can buy vitamins, herbs, supplements and many more";

    vm.loginService = loginService;
    //
    // vm.item = {
    //     ITEMNAME: "Something",
    //     ITEMDESCRIPTION: "bla bla bla bla bla",
    //     ITEMPRICE: 50,
    //     ITEMPICTUREPATH: ""
    // };
    //
    // vm.item1 = {
    //     ITEMNAME: "Something1",
    //     ITEMDESCRIPTION: "bla bla bla bla bla1",
    //     ITEMPRICE: 502,
    //     ITEMPICTUREPATH: "1"
    // };
    // vm.top5Items = [vm.item, vm.item1];

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
        }, 700);
    };

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
        templateUrl: 'pages/templates/item-template.html',
        scope: {
            item: '='
        }
    };

});