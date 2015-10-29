(function(angular) {
	'use strict';
	
	angular.module('xpsui:directives')
	.directive('xpsuiPortalMenuEditor', ['$compile', function($compile) {
		return {
			restrict: 'A',
			scope: {
				index: '=xpsuiPortalMenuEditor',
				elementIdx: '=portalMenuIndex'
			},
			controller: ['$scope', function($scope) {
				this.remove = function(idx) {
					if ($scope.index && $scope.index.subElements) {
					$scope.index.subElements.splice(idx, 1);
					}
				};
				this.removeParent = function(idx) {
					$scope.$parent.removeFn(idx);
				};
				this.upInParent = function(idx) {
					var curr = $scope.$parent.index.subElements[idx];
					if (idx > 0) {
					$scope.$parent.index.subElements.splice(idx, 1);
					$scope.$parent.index.subElements.splice(idx-1, 0, curr);
					}
				};
				this.downInParent = function(idx) {
					var curr = $scope.$parent.index.subElements[idx];
					if (idx < $scope.$parent.index.subElements.length-1) {
					$scope.$parent.index.subElements.splice(idx, 1);
					$scope.$parent.index.subElements.splice(idx+1, 0, curr);
					}
				};
			}],
			require: ["^?xpsuiPortalMenuEditor"],
			link: function(scope, elm, attrs, ctrls) {
				scope.mode = 'view';
				scope.opened = false;

				elm.addClass('portal-menu-editor');

				var header = angular.element('<div class="portal-menu-header"></div>');
				var openIcon = angular.element('<i class="fa fa-minus" style="padding-right:10px;"></i>');
				var children = angular.element('<div style="padding-left: 20px;"><div ng-repeat="c in index.subElements"><div xpsui-portal-menu-editor="c" portal-menu-index="$index"></div></div></div>');
				var actionButtons = angular.element('<span style="padding-left: 10px;" class="x-hidden"></span>');
				var editButton = angular.element('<i class="action-button fa fa-pencil"></i>');
				var addButton = angular.element('<i class="action-button fa fa-plus"></i>');
				var removeButton = angular.element('<i class="action-button fa fa-minus" ng-click="removeParent()"></i>');
				var downButton = angular.element('<i class="action-button fa fa-chevron-down" ng-click="downFn()"></i>');
				var upButton = angular.element('<i class="action-button fa fa-chevron-up" ng-click="upFn()"></i>');

				var editPanel = angular.element('<table class="x-hidden portal-menu-editor-edit-panel">' +
					'<tr><td>Meno:</td><td><input ng-model="index.name"</td></tr>' +
					'<tr><td>Tagy:</td><td><span xpsui-portal-multistring-edit ng-model="index.tags"></span></td></tr>' +
					'<tr><td>Hash tag (#):</td><td><input ng-model="index.hash"</td></tr>' +
					'</table>');


				editButton.on('click', function(evt) {
					editPanel.toggleClass('x-hidden');
					scope.opened = !scope.opened;
					evt.stopPropagation();
				});

				addButton.on('click', function(evt) {
					scope.$apply(function () {
						scope.addNew();
					});
					evt.stopPropagation();
				});

				scope.removeParent = function() {
					if (ctrls[0]) {
						ctrls[0].removeParent(scope.elementIdx);
					}
				}

				scope.removeFn = function(idx) {
					console.log(idx);
					if (ctrls[0]) {
						ctrls[0].remove(idx);
					}
				};

				scope.upFn = function() {
					editPanel.removeClass('x-hidden');
					editPanel.addClass('x-hidden');
					children.removeClass('x-hidden');
					children.addClass('x-hidden');
					if (ctrls[0]) {
						ctrls[0].upInParent(scope.elementIdx);
					}
				}

				scope.downFn = function() {
					editPanel.removeClass('x-hidden');
					editPanel.addClass('x-hidden');
					children.removeClass('x-hidden');
					children.addClass('x-hidden');
					if (ctrls[0]) {
						ctrls[0].downInParent(scope.elementIdx);
					}
				}

				if (ctrls[0]) {
					actionButtons.append(editButton);
				}

				actionButtons.append(addButton);
				if (ctrls[0]) {
					actionButtons.append(removeButton);
					actionButtons.append(downButton);
					actionButtons.append(upButton);
				}

				header.on('click', function(evt) {
					if (scope.index && scope.index.subElements && scope.index.subElements.length > 0) {
						openIcon.toggleClass('fa fa-plus');
						openIcon.toggleClass('fa fa-minus');

						children.toggleClass('x-hidden');
					}

					evt.stopPropagation();
				});

				header.on('mouseover', function() {
					actionButtons.removeClass('x-hidden');
				});
				header.on('mouseleave', function() {
					actionButtons.addClass('x-hidden');
				});
				var name = angular.element('<span>{{index.name}}</span>');

				header.append(openIcon);
				header.append(name);
				header.append(actionButtons);

				if (scope.index.name != 'ROOT' && scope.index && scope.index.subElements && scope.index.subElements.length < 1) {
					openIcon.removeClass('fa fa-minus');
					openIcon.removeClass('fa fa-plus');
					openIcon.addClass('fa fa-circle-o');
					console.log('name: ' + scope.index.subElements);
				}

				elm.append(header);
				elm.append(editPanel);
				elm.append(children);
				$compile(editPanel)(scope);
				$compile(children)(scope);
				$compile(header)(scope);

				scope.addNew = function addNew() {
					scope.index.subElements.push({
						name: '...Nový...',
						transCode: null,
						tags: [],
						subElements: []
					});
					openIcon.addClass('fa fa-minus');
					openIcon.removeClass('fa fa-circle-o');
					openIcon.removeClass('fa fa-plus');
					children.removeClass('x-hidden');
				};

			}
		};
	}]);
}(window.angular));