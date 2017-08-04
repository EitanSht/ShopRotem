var app = angular.module("myApp", ["ngRoute", "ngMessages"]);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl: "pages/home.html"
        })
        .when("/login", {
            templateUrl: "pages/login.html"
        })
        .when("/register", {
            templateUrl: "pages/register.html"
        })
        .when("/about", {
            templateUrl: "pages/about.html"
        })
        .otherwise({
            redirect : "/"
        });
}]);

app.controller("mainCtrl", ["loginService", function(loginService){
    let vm = this;
    vm.loginService = loginService;
}]);