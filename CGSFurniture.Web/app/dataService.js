 CGSFurnitureApp.factory("dataService",
    function ($http) {
        var getCategories = function (query = {}) {
            return $http.get("api/Categories", { params: query });
        };
        var getCategory = function (categoryId) {
            return $http.get("api/Categories/" + categoryId);
        };
        var addCategory = function (category) {
            return $http.post("api/Categories", category)
        };
        var editCategory = function (category) {
            return $http.put("api/Categories/" + category.categoryID, category)
        };
        var deleteCategory = function (categoryId) {
            return $http.delete("api/Categories/" + categoryId)
        };
        var getCategoryProductsCount = function () {
            return $http.get("api/Categories/GetCategoryProductsCount")
        };

        var getProducts = function (query = {}) {
            return $http.get("api/Products", { params: query });
        };
        var getProduct = function (productId) {
            return $http.get("api/Products/" + productId);
        };
        var addProduct = function (product) {
            return $http.post("api/Products", product)
        };
        var editProduct = function (product) {
            return $http.put("api/Products/" + product.productID, product)
        };
        var deleteProduct = function (productId) {
            return $http.delete("api/Products/" + productId)
        };

        var getProductImages = function (query = {}) {
            return $http.get("api/ProductImages", { params: query });
        };
        var getProductImage = function (productImagesId) {
            return $http.get("api/ProductImages/" + productImagesId);
        };
        var addProductImage = function (productImage) {
            return $http.post("api/ProductImages", productImage)
        };
        var editProductImage = function (productImage) {
            return $http.put("api/ProductImages/" + productImage.productImagesID, productImage)
        };
        var deleteProductImage = function (productImagesId) {
            return $http.delete("api/ProductImages/" + productImagesId)
        };

        return {
            getCategories: getCategories,
            getCategory: getCategory,
            addCategory: addCategory,
            editCategory: editCategory,
            deleteCategory: deleteCategory,
            getCategoryProductsCount: getCategoryProductsCount,

            getProducts: getProducts,
            getProduct: getProduct,
            addProduct: addProduct,
            editProduct: editProduct,
            deleteProduct: deleteProduct,

            getProductImages: getProductImages,
            getProductImage: getProductImage,
            addProductImage: addProductImage,
            editProductImage: editProductImage,
            deleteProductImage: deleteProductImage
        };
    });