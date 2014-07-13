var module = angular.module('LoginModule');

module.controller('LoginController', ['$scope', 'Auth', '$cookieStore', function($scope, Auth, $cookieStore) {
	$scope.login = function() {
		Auth.setCredentials('dGVzdF9jbGllbnQ=', '4b622b59fae5e0df7db744cfeead120a86d752ce');
		var promise = Auth.login($scope.username, $scope.password);

		promise.then(function(result) {
			$scope.ons.screen.presentPage('main.html');
		})
	}
}]);