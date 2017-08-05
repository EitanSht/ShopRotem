app.controller('registerCtrl', ['$http', '$location', 'cookieService', function ($http, $location, cookieService) {
    var vm = this;

    vm.usernameMinChars = 3;
    vm.usernameMaxChars = 8;
    vm.passwordMinChars = 5;
    vm.passwordMaxChars = 10;

    vm.countries = [];
    vm.categories = [];
    vm.currencies = ["ILS", "USD"];
    vm.user = {
        UserName: '',
        UserPass: '',
        UserFirstName: '',
        UserLastName: '',
        UserEmail: '',
        UserQuest: '',
        UserAns: '',
        UserCountry: '',
        UserCurrency: '',
        UserFavoriteCategories: [],
        UserPermission: 0
    };

    vm.initCountriesByXML = function () {
        var Connect = new XMLHttpRequest();
        Connect.open("GET", "assets/countries.xml", false);
        Connect.setRequestHeader("Content-Type", "text/xml");
        Connect.send(null);
        var document = Connect.responseXML;
        var children = document.childNodes[0];
        for (var i = 0; i < children.children.length; i++) {
            var countryMeta = children.children[i];
            // Access each of the data values.
            var Name = countryMeta.getElementsByTagName("Name");
            var Id = countryMeta.getElementsByTagName("Id");
            vm.countries.push(Name[0].innerHTML);
        }
    }();

    vm.getCategories = function () {
        return $http.get("http://localhost:4000/items/getCategories")
            .then(function (response) {
                for (let i = 0; i < response.data.length; i++) {
                    vm.categories[i] = {};
                    vm.categories[i].CategoryName = response.data[i].CategoryName;
                    vm.categories[i].isFavorite = false;
                }
            })
            .catch(function (e) {
                return Promise.reject(e);
            });
    }();

    vm.submitForm = function () {

        for (let i = 0; i < vm.categories.length; i++) {
            if (vm.categories[i].isFavorite) {
                vm.user.UserFavoriteCategories.push(vm.categories[i].CategoryName);
            }
        }

        return $http.post('http://localhost:4000/Users/registeruser', vm.user)
            .then(function () {
                cookieService.setCookieUser({userName: vm.user.UserName, password: vm.user.UserPass, date: Date.now()});
                $location.path("/login");

            }).catch(function (e) {
                alert("An error occurred or the username is already exists, please try again");
            });
    }
}]);