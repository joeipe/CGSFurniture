CGSFurnitureApp.controller("hfListIndexCtrl",
    function ($scope, $routeParams, $location, $anchorScroll, dataService, pagerService, cfpLoadingBar) {
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

        var categoryObj = {};
        $scope.pageLimit = 5;
        $scope.page = 1;
        $scope.pager = {};
        $scope.UnitPriceSrtOdrTxt = "Price low to high";
        $scope.query = {
            $filter: 'Discontinued eq false',
            $orderby: "UnitPrice",
        };
        if ($routeParams.categoryId) {
            $scope.query.$filter += ' and CategoryID eq ' + $routeParams.categoryId;
        }

        var getProducts = function () {
            cfpLoadingBar.start();
            dataService.getProducts($scope.query)
                .then(function (response) {
                    $scope.products = response.data;
                    $scope.errorOnPage = false;
                }, onError)
                .finally(function () {
                    cfpLoadingBar.complete();
                });
        };

        var getCategories = function () {
            dataService.getCategoryProductsCount()
                .then(function (response) {
                    $scope.categories = response.data;
                    if ($routeParams.categoryId) {
                        categoryObj = _.find($scope.categories, function (categoryObj) { return categoryObj.categoryID == $routeParams.categoryId })
                    } else {
                        categoryObj = _.find($scope.categories, function (categoryObj) { return categoryObj.categoryID === 0 })
                    }
                    $scope.setPage($scope.page);
                })
        };

        $scope.setPage = function (page) {
            if (page < 1 || page > $scope.pager.totalPages) {
                return;
            }

            // get pager object from service
            $scope.pager = pagerService.GetPager(categoryObj.count, page, $scope.pageLimit);

            // get current page of items
            $scope.query.$skip = $scope.pager.startIndex;
            $scope.query.$top = $scope.pager.endIndex + 1;
            getProducts();
        };

        $scope.sortProducts = function (sortby) {
            if (sortby == 'UnitPriceAsc') {
                $scope.UnitPriceSrtOdrTxt = "Price low to high";
                $scope.query.$orderby = "UnitPrice";
            } else {
                $scope.UnitPriceSrtOdrTxt = "Price high to low";
                $scope.query.$orderby = "UnitPrice desc";
            }
            getProducts();
        };

        $scope.setPageLimit = function (pageLimit) {
            $scope.pageLimit = pageLimit;
            $scope.setPage(1);
        };

        //getProducts();
        getCategories();
    });