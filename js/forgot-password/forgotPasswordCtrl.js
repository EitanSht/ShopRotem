app.controller("forgotPasswordCtrl", ["forgetPassService", "$location", function (forgetPassService, $location) {
    let vm = this;
    vm.userName = "";
    vm.service = forgetPassService;
    vm.user;
    vm.userAnswer = "";

    vm.getSecurityQuestion = function () {
        forgetPassService.getQuestion(vm.userName).then(function(response){
            vm.isErrorMessageShown = false;
            vm.isExists = false;
            if (response.error || response.data.length == 0) {
                vm.isErrorMessageShown = true;
            } else {
                vm.user = response.data[0];
                vm.isExists = true;
            }
        });
    }

    vm.checkAnswer = function() {
        if(vm.userAnswer == vm.user.UserAnswer){
            alert("Your password is: " + vm.user.UserPassword);
            $location.path("/login");
        } else {

        }
    }
}]);

app.factory('forgetPassService', ['$http', function ($http) {
    let service = {};

    service.getQuestion = function (userName) {

        let url = 'http://localhost:4000/Users/GetUserDetails?UserName=' + userName;
        console.log(url);
        return $http.get(url)
            .then(function (response) {
                return response;
            }).catch(function (error) {
                return {error: true};
            });
    };

    return service;
}]);