app.controller("loginCtrl", ['$scope', 'loginService', '$location', function ($scope, loginService, $location) {

    let vm = this;
    vm.isErrorMessageShown = false;

    vm.login = function () {
        loginService.login(vm.userName, vm.password).then(function (response) {
            vm.isErrorMessageShown = false;
            if (response.error) {
                vm.isErrorMessageShown = true;
            } else {
                $location.path("/");
            }
        });
    }

    vm.forgotPassword = function () {
        $location.path("/forgotPassword");
    }

}]);

app.factory('loginService', ['$http', function ($http) {
    let service = {};

    service.currentUser = "guest";
    service.isloggedIn = false;

    service.login = function (userName, password) {

        let url = 'http://localhost:4000/Users/login?UserName=' + userName + '&UserPassword=' + password;
        console.log(url);
        return $http.get(url)
            .then(function (response) {
                service.isloggedIn = true;
                service.currentUser = userName;
                return response;
            }).catch(function (error) {
                return {error: true};
            });
    };

    return service;
}]);