CGSFurnitureApp.controller("lfIndexCtrl",
    function ($scope, $location, $anchorScroll, authService, cfpLoadingBar) {
        var onError = function (err) {
            $scope.message = err.error_description;
            $scope.errorOnPage = true;
        };
        
        $location.hash('loginBlock');
        $anchorScroll();

        $scope.loginData = {
            userName: "",
            password: "",
        };

        $scope.login = function () {
            $scope.submitted = true;
            if ($scope.loginForm.$invalid) return false;

            cfpLoadingBar.start();
            authService.login($scope.loginData).then(function (response) {
                $location.path('/home');
            }, onError)
            .finally(function () {
                cfpLoadingBar.complete();
            });
        };
    });