var CGSFurnitureApp = angular.module("CGSFurnitureApp", ["ngRoute", "angular-loading-bar", "ngFileUpload", "slickCarousel", "LocalStorageModule"]);

CGSFurnitureApp.constant('adminUsers', 'dingan@dingan.com');

CGSFurnitureApp.config(function ($routeProvider, $httpProvider, $locationProvider) {
    $httpProvider.interceptors.push('authInterceptorService');

    $routeProvider
        .when("/home/:categoryId?", {
            templateUrl: "app/HomeForm/hfGridIndex.html",
            controller: "hfGridIndexCtrl"
        })
        .when("/homelist/:categoryId?", {
            templateUrl: "app/HomeForm/hfListIndex.html",
            controller: "hfListIndexCtrl"
        })
        .when("/login", {
            templateUrl: "app/LoginForm/lfIndex.html",
            controller: "lfIndexCtrl"
        })
        .when("/register", {
            templateUrl: "app/RegisterForm/rfIndex.html",
            controller: "rfIndexCtrl"
        })
        .when("/product/:productId", {
            templateUrl: "app/ProductForm/pfIndex.html",
            controller: "pfIndexCtrl"
        })
        .when("/settings/category", {
            templateUrl: "app/Settings/CategoryForm/scfIndex.html",
            controller: "scfIndexCtrl"
        })
        .when("/settings/addCategory", {
            templateUrl: "app/Settings/CategoryForm/scfTemplate.html",
            controller: "scfTemplateCtrl"
        })
        .when("/settings/editCategory/:categoryId", {
            templateUrl: "app/Settings/CategoryForm/scfTemplate.html",
            controller: "scfTemplateCtrl"
        })
        .when("/settings/product", {
            templateUrl: "app/Settings/ProductForm/spfIndex.html",
            controller: "spfIndexCtrl"
        })
        .when("/settings/addProduct", {
            templateUrl: "app/Settings/ProductForm/spfTemplate.html",
            controller: "spfTemplateCtrl"
        })
        .when("/settings/editProduct/:productId", {
            templateUrl: "app/Settings/ProductForm/spfTemplate.html",
            controller: "spfTemplateCtrl"
        })
        .when("/terms", {
            templateUrl: "app/TermsForm/tfIndex.html",
        })
        .otherwise({ redirectTo: "/home" });
});

CGSFurnitureApp.run(['authService', function (authService) {
    authService.fillAuthData();
}]);
