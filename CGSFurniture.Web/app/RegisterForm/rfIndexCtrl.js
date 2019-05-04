CGSFurnitureApp.controller("rfIndexCtrl",
    function ($scope, $location, $anchorScroll, $timeout, authService, cfpLoadingBar) {
        var onError = function (response) {
            var errors = [];
            for (var key in response.data.modelState) {
                for (var i = 0; i < response.data.modelState[key].length; i++) {
                    errors.push(response.data.modelState[key][i]);
                }
            }
            $scope.message = "Failed to register user due to:" + errors.join(' ');
            if (response.data.exceptionMessage) {
                $scope.message += response.data.exceptionMessage;
            }
            $scope.errorOnPage = true;
        };

        $location.hash('registerBlock');
        $anchorScroll();

        $scope.savedSuccessfully = false;
        $scope.message = "";

        $scope.registrationData = {
            email: "",
            password: "",
            confirmPassword: ""
        };

        $scope.signUp = function () {
            $scope.submitted = true;
            if ($scope.registerForm.$invalid || !$scope.hasAcceptedTerms) return false;

            cfpLoadingBar.start();
            $scope.errorOnPage = false;
            authService.saveRegistration($scope.registrationData).then(function (response) {
                $scope.savedSuccessfully = true;
                $scope.messageSuccessfull = "User has been registered successfully, you will be redirected to login page in 2 seconds.";
                startTimer();
            }, onError)
            .finally(function () {
                cfpLoadingBar.complete();
            });
        };

        var startTimer = function () {
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                $location.path('/login');
            }, 2000);
        }
    });