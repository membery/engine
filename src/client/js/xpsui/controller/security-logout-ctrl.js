(function(angular) {
	'use strict';

	angular.module('xpsui:controllers')
	.controller(
		'xpsui:SecurityLogoutCtrl',
		[ '$scope', 'xpsui:SecurityService', '$location', '$localStorage',
				function($scope, SecurityService, $location, $localStorage) {
					$scope.logout = function() {
						SecurityService.getLogout().then(function() {
							$scope.security.currentUser = undefined;
							$localStorage.$reset();
							$location.path('/login');
						});
					};
				}
	]);
	
}(window.angular));