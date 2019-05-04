CGSFurnitureApp.controller("pfIndexCtrl",
    function ($scope, $routeParams, $location, $anchorScroll, dataService, cfpLoadingBar) {
        var onError = function (response) {
            $location.hash('errorAlert');
            $anchorScroll();
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

        if ($routeParams.productId) {
            cfpLoadingBar.start();
            dataService.getProduct($routeParams.productId)
                .then(function (response) {
                    $location.hash('productInfo');
                    $anchorScroll();
                    $scope.product = response.data;
                    $scope.errorOnPage = false;
                    getProductImages();
                }, onError)
                .finally(function () {
                    cfpLoadingBar.complete();
                });
        }

        var getProductImages = function () {
            cfpLoadingBar.start();
            var query = {
                $filter: 'ProductID eq ' + $scope.product.productID
            };
            dataService.getProductImages(query)
                .then(function (response) {
                    if (response.data.length != 0) {
                        $scope.productImages = response.data;
                    } else {
                        $scope.productImages = null;
                    }
                    $scope.errorOnPage = false;
                }, onError)
                .finally(function () {
                    cfpLoadingBar.complete();
                });
        };
    });