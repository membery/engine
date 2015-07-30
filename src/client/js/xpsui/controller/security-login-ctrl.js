(function(angular) {
	'use strict';
	angular
			.module('xpsui:controllers')
			.controller(
					'xpsui:SecurityLoginCtrl',
					[
							'$scope',
							'xpsui:SecurityService',
							'$rootScope',
							'$location',
							'xpsui:NotificationFactory',
							'xpsui:NavigationService',
							'$localStorage',

							function($scope, SecurityService, $rootScope,
									$location, notificationFactory,
									navigationService, $localStorage) {
								// FIXME remove this in production
								// $scope.user = 'johndoe';
								// $scope.password = 'johndoe';
								$scope.user = '';
								$scope.password = '';
								var rem = false;

								if (!$localStorage.rememberMe) {
									$scope.$storage = $localStorage.$default({
										rememberMe : false,
										profile : ''
									});
									rem = false;
								} else {
									$scope.$storage = $localStorage;
								}
								$scope.$storage = $localStorage;
								$scope.checkboxModel = {
									value : false
								};

								$scope.$storage.rememberMe = $localStorage.rememberMe;
								var remembermeElement = document
										.getElementById('x-rememberme-chk');
								if ($scope.$storage.rememberMe) {
									console.log('rememberMe: '+$scope.$storage.rememberMe);
									$scope.checkboxModel.value = true;
									remembermeElement.setAttribute('checked',
											'checked');
									rem = true;
									SecurityService
											.getLogin($scope.user,
													$scope.password, $scope.$storage.rememberMe)
											.success(
													function(user) {
														if ($scope.checkboxModel.value) {
															$scope.$storage.rememberMe = true;
															$scope.$storage.profile = user.systemCredentials.profiles[0].id;
														} else {
															//delete $localStorage.profile;
															//delete $localStorage.rememberMe;
															$scope.$storage.rememberMe = false;
															$scope.$storage.profile = user.systemCredentials.profiles[0].id;
														}
														if (user.systemCredentials.profiles.length > 1) {
															$scope.profiles = user.systemCredentials.profiles;
														} else {
															SecurityService
																	.selectProfile(
																			user.systemCredentials.profiles[0].id)
																	.success(
																			function() {
																				SecurityService
																						.getCurrentUser()
																						.success(
																								function(
																										data) {
																									$rootScope.security.currentUser = data;
																									if (!navigationService
																											.back()) {
																										$location
																												.path('/personal-page');
																									}
																								});
																			});
														}
													})
											.error(
													function(err) {
														if (err) {
															console.log(err);
														}
														delete $rootScope.security.currentUser;
														var mes = {
															translationCode : 'login.authentication.failed',
															time : 5000
														};
														notificationFactory
																.error(mes);
													});
								} else {
									$scope.checkboxModel.value = false;
									//delete $localStorage.profile;
									//delete $localStorage.rememberMe;
									$scope.$storage.rememberMe = false;
									remembermeElement.setAttribute('checked',
											'unchecked');
									rem = 'false';
								}

								/**
								 * Login button click
								 */
								$scope.login = function() {
									SecurityService
											.getLogin($scope.user,
													$scope.password, rem)
											.success(
													function(user) {
														if ($scope.checkboxModel.value) {
															$scope.$storage.rememberMe = true;
															$scope.$storage.profile = user.systemCredentials.profiles[0].id;
														} else {
															//delete $localStorage.profile;
															//delete $localStorage.rememberMe;
															$scope.$storage.rememberMe = false;
															$scope.$storage.profile = user.systemCredentials.profiles[0].id;
														}
														if (user.systemCredentials.profiles.length > 1) {
															$scope.profiles = user.systemCredentials.profiles;
														} else {
															SecurityService
																	.selectProfile(
																			user.systemCredentials.profiles[0].id)
																	.success(
																			function() {
																				SecurityService
																						.getCurrentUser()
																						.success(
																								function(
																										data) {
																									$rootScope.security.currentUser = data;
																									if (!navigationService
																											.back()) {
																										$location
																												.path('/personal-page');
																									}
																								});
																			});
														}
													})
											.error(
													function(err) {
														if (err) {
															console.log(err);
														}
														delete $rootScope.security.currentUser;
														var mes = {
															translationCode : 'login.authentication.failed',
															time : 5000
														};
														notificationFactory
																.error(mes);
													});
								};

								$scope.selectProfile = function() {
									if (!$scope.selectedProfile) {
										return;
									}
									SecurityService
											.selectProfile(
													$scope.selectedProfile.id)
											.success(
													function() {
														SecurityService
																.getCurrentUser()
																.success(
																		function(
																				data) {
																			$rootScope.security.currentUser = data;
																			if (!navigationService
																					.back()) {
																				$location
																						.path('/personal-page');
																			}
																		});
													});
								};

								$scope.resetPassword = function() {
									SecurityService
											.getResetPassword($scope.user);
								};
							} ]);

}(window.angular));
