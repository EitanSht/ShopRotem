app.controller("loginCtrl",['$scope','loginService', '$location', function ($scope, loginService, $location) {

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
}]);

app.factory('loginService',['$http' ,function($http){
    let service = {};

    service.currentUser = "guest";
    service.isloggedIn = false;

    service.login = function(userName, password){

        let url = 'http://localhost:4000/Users/login?UserName=' + userName + '&UserPassword=' + password;
        console.log(url);
        return $http.get(url)
            .then(function(response){
                if(response.data != "Username Or Password Incorrect"){
                    service.isloggedIn = true;
                    service.currentUser = userName;
                    return response;
                } else {
                    return {error: true};
                }
            });
    };

    return service;
}]);