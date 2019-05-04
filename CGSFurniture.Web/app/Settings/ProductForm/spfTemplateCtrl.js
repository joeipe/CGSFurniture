CGSFurnitureApp.controller("spfTemplateCtrl",
    function ($scope, $routeParams, $location, dataService, fileService, cfpLoadingBar, Upload) {
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

        var deletePhoto = function (fileId, isPrimary) {
            fileService.deletePhoto(fileId)
                .then(function (response) {
                    if (isPrimary) {
                        $scope.product.defaultPictureID = null;
                        $scope.productCopy.defaultPictureID = null;
                    }
                });
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

        getCategories();

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

        if ($routeParams.productId) {
            $scope.actionTxt = "Edit";
            cfpLoadingBar.start();
            dataService.getProduct($routeParams.productId)
                .then(function (response) {
                    $scope.product = response.data;
                    $scope.productCopy = angular.copy($scope.product);
                    getProductImages();
                    $scope.errorOnPage = false;
                }, onError)
                .finally(function () {
                    cfpLoadingBar.complete();
                });
        } else {
            $scope.actionTxt = "Add";
            $scope.product = {};
        }

        $scope.btnSubmitClick = function () {
            $scope.submitted = true;
            if ($scope.productForm.$invalid) return false;

            if ($scope.product.productID) {
                dataService.editProduct($scope.product)
                    .then(function (response) {
                        GoBack();
                    }, onError);
            } else {
                dataService.addProduct($scope.product)
                    .then(function (response) {
                        GoBack();
                    }, onError);
            }
        };

        var GoBack = function () {
            $location.path('/settings/product');
        };

        $scope.deleteMainPhoto = function (ProductImagesID, pictureID) {
            deletePhoto(pictureID, false);
            dataService.deleteProductImage(ProductImagesID)
                .then(function (response) {
                    getProductImages();
                });
        };

        $scope.uploadFile = function (file, isPrimary) {
            if (file) {
                cfpLoadingBar.start();

                if (isPrimary && $scope.product.defaultPictureID) {
                    deletePhoto($scope.product.defaultPictureID, isPrimary);
                }

                Upload.upload({
                    url: "/api/files/upload", // webapi url
                    method: "POST",
                    //data: { fileUploadObj: $scope.fileUploadObj },
                    file: file
                }).progress(function (evt) {
                    // get upload percentage
                    //console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                }).success(function (data, status, headers, config) {
                    if (isPrimary) {
                        $scope.product.defaultPictureID = data.returnData;
                        if ($scope.productCopy) {
                            $scope.productCopy.defaultPictureID = data.returnData;
                            dataService.editProduct($scope.productCopy)
                                .then(function (response) {
                                }, onError);
                        }
                    } else {
                        var productImage = { productID: $scope.product.productID, pictureID: data.returnData };
                        dataService.addProductImage(productImage)
                            .then(function (response) {
                                getProductImages();
                            }, onError);
                    }
                    cfpLoadingBar.complete();
                }).error(function (data, status, headers, config) {
                    $scope.message = status + "\r\n";
                    $scope.errorOnPage = true;
                    cfpLoadingBar.complete();
                });
            } else {
                $scope.product.defaultPictureID = null;
            }
        };
    });