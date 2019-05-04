CGSFurnitureApp.controller("FooterCtrl",
    function ($scope, dataService, cfpLoadingBar) {
        var getProducts = function () {
            cfpLoadingBar.start();
            var query = {
                $filter: 'Discontinued eq false',
                $orderby: "UnitPrice",
                $top: 5
            };
            dataService.getProducts(query)
                .then(function (response) {
                    $scope.products = response.data;
                    $scope.errorOnPage = false;
                })
                .finally(function () {
                    cfpLoadingBar.complete();
                });
        };
        getProducts();
    });