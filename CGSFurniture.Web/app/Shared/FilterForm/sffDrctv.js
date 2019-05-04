CGSFurnitureApp.directive("productFilter",
    function () {
        return {
            restrict: 'AE',
            scope: {
                path: '@'
            },
            templateUrl: 'app/Shared/FilterForm/sffIndex.html'
        }
    });