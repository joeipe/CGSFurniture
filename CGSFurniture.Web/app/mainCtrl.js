CGSFurnitureApp.controller("mainCtrl",
    function ($scope, $location, authService) {
        $scope.authentication = authService.authentication;
        $scope.isAdminUser = authService.isAdmin;

        $scope.logOut = function () {
            authService.logOut();
            $location.path('/home');
        };
    });