var module = angular.module('LoginModule');

// @see http://wemadeyoulook.at/en/blog/implementing-basic-http-authentication-http-requests-angular/
module.factory('Auth',  ['Base64', '$cookieStore', '$http', function (Base64, $cookieStore, $http) {
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
        	var promise = $http.post('http://api.klooma.com/oauth/token', { grant_type: 'password', username: username, password: password });

        	return promise.then(function(response) {
                $cookieStore.put('accesstoken', response.access_token);
                $cookieStore.put('refreshtoken', response.refresh_token);
                $http.defaults.headers.common.Authorization = 'Bearer ' + response.access_token;

                return true;
    		});
        }
    };
}]);