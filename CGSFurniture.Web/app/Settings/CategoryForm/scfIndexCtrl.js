CGSFurnitureApp.controller("scfIndexCtrl",
    function ($scope, $location, dataService, cfpLoadingBar) {
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

        var getCategories = function () {
            cfpLoadingBar.start();
            dataService.getCategories()
                .then(function (response) {
                    $scope.categories = response.data;
                    $scope.errorOnPage = false;
                }, onError)
                .finally(function () {
                    cfpLoadingBar.complete();
                });
        };

        $scope.showAddCategoryForm = function () {
            $location.path("/settings/addCategory");
        }

        $scope.showEditCategoryForm = function (categoryId) {
            $location.path("/settings/editCategory/" + categoryId);
        }

        $scope.deleteCategory = function (categoryId) {
            var wantToDel = confirm("Are you sure you want to delete?");
            if (wantToDel) {
                dataService.deleteCategory(categoryId)
                    .then(function (reponse) {
                        getCategories();
                        $scope.errorOnPage = false;
                    }, onError);
            }
        }

        getCategories();
    });