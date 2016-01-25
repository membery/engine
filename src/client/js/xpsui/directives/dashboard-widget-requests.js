(function(angular) {
	'use strict';

	function createWidgetBlock(title, content) {
		var block = angular.element('<div class="dashboard-widget-block">'
				+ '<div class="dashboard-widget-block-title">' + title + '<div>'
				+ '</div>');
		var contentDiv = angular.element('<div class="dashboard-widget-block-content"><div>');
		contentDiv.append(content);	
		block.append(contentDiv);
		return block;
	}

	angular.module('xpsui:directives')
	.directive('xpsuiDashboardWidgetRequests', 
			['xpsui:logging', '$compile', '$translate', '$http', '$location', 'xpsui:SchemaUtil', 'xpsui:NotificationFactory',
			'xpsui:NavigationService',
			function(log, $compile, $translate, $http, $location, schemaUtilFactory, notificationFactory, navigationService) {
				return {
					controller: function($scope, $element, $attrs) {
					},
					link: function(scope, elm, attrs, ctrls) {
						scope.showRegistrations = function() {
							navigationService.navigateToPath(
									'/registry/search/uri~3A~2F~2Fregistries~2FregistrationRequests~23views~2FpeopleRegistrationApplicant~2Fsearch', 
									'search');
							$location.path('/registry/search/uri~3A~2F~2Fregistries~2FregistrationRequests~23views~2FpeopleRegistrationApplicant~2Fsearch');
						};

						scope.showDataChanges = function() {
							navigationService.navigateToPath(
									'/registry/search/uri~3A~2F~2Fregistries~2FdataChangeRequests~23views~2FdataChangeApplicant~2Fsearch',
									'search');
							$location.path('/registry/search/uri~3A~2F~2Fregistries~2FdataChangeRequests~23views~2FdataChangeApplicant~2Fsearch');
						};

						scope.showTransfers = function() {
							navigationService.navigateToPath(
									'/registry/search/uri~3A~2F~2Fregistries~2FtransferRequests~23views~2FtransferApplicant~2Fsearch',
									'search');
							$location.path('/registry/search/uri~3A~2F~2Fregistries~2FtransferRequests~23views~2FtransferApplicant~2Fsearch');
						};

						scope.showRegistrationsSolver = function() {
							navigationService.navigateToPath(
									'/registry/search/uri~3A~2F~2Fregistries~2FregistrationRequests~23views~2FpeopleRegistrationSolver~2Fsearch', 
									'search');
							$location.path('/registry/search/uri~3A~2F~2Fregistries~2FregistrationRequests~23views~2FpeopleRegistrationSolver~2Fsearch');
						};

						scope.showDataChangesSolver = function() {
							navigationService.navigateToPath(
									'/registry/search/uri~3A~2F~2Fregistries~2FdataChangeRequests~23views~2FdataChangeSolver~2Fsearch', 
									'search');
							$location.path('/registry/search/uri~3A~2F~2Fregistries~2FdataChangeRequests~23views~2FdataChangeSolver~2Fsearch');
						};

						scope.showTransfersSolver = function() {
							navigationService.navigateToPath(
									'/registry/search/uri~3A~2F~2Fregistries~2FtransferRequests~23views~2FtransferSolver~2Fsearch', 
									'search');
							$location.path('/registry/search/uri~3A~2F~2Fregistries~2FtransferRequests~23views~2FtransferSolver~2Fsearch');
						};

						scope.showTransfersSolverClubFrom = function() {
							navigationService.navigateToPath(
									'/registry/search/uri~3A~2F~2Fregistries~2FtransferRequests~23views~2FtransferSolverClubFrom~2Fsearch', 
									'search');
							$location.path('/registry/search/uri~3A~2F~2Fregistries~2FtransferRequests~23views~2FtransferSolverClubFrom~2Fsearch');
						};
						
						// Gets the number of results for a search query specified by the URI.
						var getCount = function (uri, block, onClick) {
							$http({ 
								method : 'POST',
								url : '/search/' + schemaUtilFactory.encodeUri(uri)
							}).success(function(data, status, headers, config) {
								if (uri.includes('registrationRequests') || uri.includes('dataChangeRequests') || uri.includes('transferRequests')) {
									$http({
										method : 'POST',
										url : '/search/' + schemaUtilFactory.encodeUri(uri),
										data : {
											crits :[{
												f : 'requestData.status',
												v : 'created',
												op : 'eq'
											}],
											sorts: [ { f:'requestData.status', o: 'asc'}]
										}
									}).success(function(dataCreated, status, headers, config) {
										block.empty();
										if (data) {
											block.html(
													'<span>' + dataCreated.length + '/' + data.length + '</span><br/>'
													+ ' <a ng-click=" ' + onClick + ' ">' + $translate.instant('generic.more') + '</a>');
											$compile(block)(scope);
											return;
										}
										var label_noOpenRequests = $translate.instant('dashboard.widget.members.noOpenRequests');
										block.text(label_noOpenRequests);
									}).error(function(err) {
										notificationFactory.error(err);
									});
								} else {
									block.empty();
									if (data) {
										block.html(
												'<span>' + data.length + '</span><br/>'
												+ ' <a ng-click=" ' + onClick + ' ">' + $translate.instant('generic.more') + '</a>');
										$compile(block)(scope);
										return;
									}
									var label_noOpenRequests = $translate.instant('dashboard.widget.members.noOpenRequests');
									block.text(label_noOpenRequests);
								}
							}).error(function(err) {
								notificationFactory.error(err);
							});
						};

						log.group('xpsui-dashboard-widget-requests Widget');

						elm.empty();

						elm.addClass('dashboard-widget-container');
						var title = $translate.instant('dashboard.widget.notifications.title');
						var titleBar = angular.element('<div class="dashboard-widget-title">' + title + '</div>');

						var content = angular.element(
							'<div class="dashboard-widget-content">'
							+ '</div>');
						var blocks = angular.element('<div class="dashboard-widget-blocks"></div>');

						var label_loading = $translate.instant('generic.loading');

						if (scope.hasPermissions(['Registry - read'])) {
							var titles=[
								'dashboard.widget.members.openRequests',
								'dashboard.widget.data.openRequests',
								'dashboard.widget.transfer.openRequests'
							];
							var uris=[
								'uri://registries/registrationRequests#views/peopleRegistrationSolver/search',
								'uri://registries/dataChangeRequests#views/dataChangeSolver/search',
								'uri://registries/transferRequests#views/transferSolver/search'
							];
							var fncs=[
								'showRegistrationsSolver()',
								'showDataChangesSolver()',
								'showTransfersSolver()'
							];
						} else if (scope.hasPermissions(['Registry Requests'])) {
							var titles=[
								'dashboard.widget.members.openRequests',
								'dashboard.widget.data.openRequests',
								'dashboard.widget.transfer.openRequests',
								'dashboard.widget.transferSolverKM.openRequests'
							];
							var uris=[
								'uri://registries/registrationRequests#views/peopleRegistrationApplicant/search',
								'uri://registries/dataChangeRequests#views/dataChangeApplicant/search',
								'uri://registries/transferRequests#views/transferApplicant/search',
								'uri://registries/transferRequests#views/transferSolverClubFrom/search'
							];
							var fncs=[
								'showRegistrations()',
								'showDataChanges()',
								'showTransfers()',
								'showTransfersSolverClubFrom()'
							];
						} else {
							var titles=[];
							var uris=[];
							var fncs=[];
						}

						for (var i=0;i<titles.length;++i) {
							var contentBlockTitle = $translate.instant(titles[i]);
							var contentBlockElm = angular.element('<div>' + label_loading + '</div>');
							getCount(uris[i], contentBlockElm, fncs[i]);
							var block = createWidgetBlock(contentBlockTitle, contentBlockElm);
							blocks.append(block);
						};

						content.append(blocks);
						elm.append(titleBar);
						elm.append(content);

						log.groupEnd();
					}
				};
			}]);
}(window.angular));