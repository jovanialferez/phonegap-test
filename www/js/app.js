(function(){
	'use strict';
	angular
		.module('myApp', ['onsen.directives', 'CommonModule', 'LoginModule', 'FeedsModule'])
		.constant('BASE_URL', 'http://api.klooma.com')

	angular.module('myApp')
		.factory('Authorization', ['$cookieStore', function($cookieStore) {
			return {
				request: function(config) {
					if ($cookieStore.get('accesstoken') && $cookieStore.get('refreshtoken') && config.url.search('oauth/token') === -1) {
						config.headers['Authorization'] = 'Bearer ' + $cookieStore.get('accesstoken');
					}

					return config;
				}
			}
		}])
		.config(['$httpProvider', function($httpProvider) {
			$httpProvider.interceptors.push('Authorization');
		}])
})();
