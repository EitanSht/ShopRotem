app.controller('registerCtrl', ['$http', function ($http) {
    var vm = this;

    vm.usernameMinChars = 3;
    vm.usernameMaxChars = 8;
    vm.passwordMinChars = 5;
    vm.passwordMaxChars = 10;

    vm.countries = [];
    vm.categories = [];
    vm.currencies = ["ILS", "USD"];
    vm.user = {
        username: '',
        password: '',
        email: '',
        sQuestion: '',
        sAnswer: '',
        country: '',
        fav1: '',
        fav2: ''
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
                vm.categories = response.data;
            })
            .catch(function (e) {
                return Promise.reject(e);
            });
    }();

    vm.submitForm = function () {

        vm.user.country = vm.user.country.Name;
        return $http.post('/api/register', vm.user)
            .then(function (response) {
                console.log("user is registered = " + vm.user.username);
            })
            .catch(function (e) {
                return Promise.reject(e);
            });
    }
}]);