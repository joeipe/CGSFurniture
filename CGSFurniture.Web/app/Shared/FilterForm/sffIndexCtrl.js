CGSFurnitureApp.controller("sffIndexCtrl",
    function ($scope, $location, dataService) {
        var getCategories = function () {
            dataService.getCategoryProductsCount()
                .then(function (response) {
                    $scope.categories = response.data;
                })
        };

        $scope.showHomePage = function (categoryId) {
            if (categoryId === 0) {
                $location.path("/" + $scope.path);
            } else {
                $location.path("/" + $scope.path + "/" + categoryId);
            }
        };

        $scope.resetHomepage = function () {
            $location.path("/" + $scope.path);
        };

        getCategories();
    });