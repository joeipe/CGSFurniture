CGSFurnitureApp.factory("authService",
    function ($http, $q, localStorageService, adminUsers) {
        var _authentication = {
            isAuth: false,
            userName: ""
        };

        var _saveRegistration = function (registration) {
            _logOut();

            return $http.post('api/account/register', registration).then(function (response) {
                return response;
            });
        };

        var _login = function (loginData) {
            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

            var deferred = $q.defer();

            $http.post('/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .then(function (response) {
                    localStorageService.set('authorizationData', { token: response.data.access_token, userName: loginData.userName });

                    _authentication.isAuth = true;
                    _authentication.userName = loginData.userName;

                    deferred.resolve(response.data);
                }, function (response) {
                    _logOut();
                    deferred.reject(response.data);
                });

            return deferred.promise;
        };

        var _logOut = function () {
            localStorageService.remove('authorizationData');

            _authentication.isAuth = false;
            _authentication.userName = "";
        };

        var _fillAuthData = function () {
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                _authentication.isAuth = true;
                _authentication.userName = authData.userName;
            }
        };

        var _isAdmin = function () {
            var adminUsersArr = adminUsers.split(',');
            var isAdminUser = adminUsersArr.includes(_authentication.userName);
            return _authentication.isAuth && isAdminUser;
        };

        return {
            saveRegistration: _saveRegistration,
            login: _login,
            logOut: _logOut,
            fillAuthData: _fillAuthData,
            authentication: _authentication,
            isAdmin: _isAdmin
        };
    });