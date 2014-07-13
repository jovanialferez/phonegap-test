var module = angular.module('FeedsModule');

module.factory('Feeds', ['$http', 'BASE_URL', function($http, BASE_URL) {
	return {
		get: function() {
			var promise = $http.get(BASE_URL + '/feeds');

			return promise.then(function(response) {
				return response.data.data;
			})
		}
	}
}])