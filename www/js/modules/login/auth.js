var module = angular.module('LoginModule');

// @see http://wemadeyoulook.at/en/blog/implementing-basic-http-authentication-http-requests-angular/
module.factory('Auth',  ['Base64', '$cookieStore', '$http', 'BASE_URL', function (Base64, $cookieStore, $http, BASE_URL) {
    // initialize to whatever is in the cookie, if anything
    $http.defaults.headers.common['Authorization'] = 'Basic ' + $cookieStore.get('authdata');

    return {
        setCredentials: function (clientId, clientSecret) {
            var encoded = Base64.encode(clientId + ':' + clientSecret);
            $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
            $cookieStore.put('authdata', encoded);
        },
        clearCredentials: function () {
            document.execCommand("ClearAuthenticationCache");
            $cookieStore.remove('authdata');
            $http.defaults.headers.common.Authorization = 'Basic ';
        },
        login: function(username, password) {
        	var promise = $http.post(BASE_URL + '/oauth/token', { grant_type: 'password', username: username, password: password });

        	return promise.then(function(response) {
                $cookieStore.put('accesstoken', response.data.access_token);
                $cookieStore.put('refreshtoken', response.data.refresh_token);

                return true;
    		});
        }
    };
}]);