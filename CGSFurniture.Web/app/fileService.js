CGSFurnitureApp.factory("fileService",
    function ($http) {
        function getPhoto(fileId) {
            return $http.get("api/files/" + fileId);
        }

        function deletePhoto(fileId) {
            return $http.delete("api/files/", { params: { id: fileId } });
        }

        return {
            getPhoto: getPhoto,
            deletePhoto: deletePhoto
        };
    });