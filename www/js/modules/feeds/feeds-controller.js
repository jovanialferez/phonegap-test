var module = angular.module('FeedsModule');

module.controller('FeedsController', ['$scope', 'Feeds', function($scope, Feeds) {
	$scope.feeds = {};

	Feeds.get().then(function(data) {
		$scope.feeds = data;
	});
}]);