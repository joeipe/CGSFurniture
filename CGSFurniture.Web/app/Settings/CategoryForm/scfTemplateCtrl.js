CGSFurnitureApp.controller("scfTemplateCtrl",
    function ($scope, $routeParams, $location, cfpLoadingBar, dataService) {
        var onError = function (response) {
            $scope.message = response.statusText + "\r\n";
            if (response.data.modelState) {
                for (var key in response.data.modelState) {
                    $scope.message += response.data.modelState[key] + "\r\n";
                }
            }
            if (response.data.exceptionMessage) {
                $scope.message += response.data.exceptionMessage;
            }
            $scope.errorOnPage = true;
        };

        if ($routeParams.categoryId) {
            $scope.actionTxt = "Edit";
            cfpLoadingBar.start();
            dataService.getCategory($routeParams.categoryId)
                .then(function (response) {
                    $scope.category = response.data;
                    $scope.errorOnPage = false;
                }, onError)
                .finally(function () {
                    cfpLoadingBar.complete();
                });
        } else {
            $scope.actionTxt = "Add";
            $scope.category = {};
        }

        $scope.btnSubmitClick = function () {
            $scope.submitted = true;
            if ($scope.categoryForm.$invalid) return false;

            if ($scope.category.categoryID) {
                dataService.editCategory($scope.category)
                    .then(function (response) {
                        GoBack();
                    }, onError);
            } else {
                dataService.addCategory($scope.category)
                    .then(function (response) {
                        GoBack();
                    }, onError);
            }
        };

        var GoBack = function () {
            $location.path('/settings/category');
        };
    });