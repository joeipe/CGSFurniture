CGSFurnitureApp.controller("spfIndexCtrl",
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

        var getProducts = function () {
            cfpLoadingBar.start();
            dataService.getProducts()
                .then(function (response) {
                    $scope.products = response.data;
                    $scope.errorOnPage = false;
                }, onError)
                .finally(function () {
                    cfpLoadingBar.complete();
                });
        };

        $scope.showAddProductForm = function () {
            $location.path("/settings/addProduct");
        }

        $scope.showEditProductForm = function (productId) {
            $location.path("/settings/editProduct/" + productId);
        }

        $scope.deleteProduct = function (productId) {
            var wantToDel = confirm("Are you sure you want to delete?");
            if (wantToDel) {
                dataService.deleteProduct(productId)
                    .then(function (reponse) {
                        getProducts();
                        $scope.errorOnPage = false;
                    }, onError);
            }
        }

        getProducts();
    });