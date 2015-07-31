(function(angular) {
	'use strict';

	angular.module('xpsui:directives')
	.directive('xpsuiObjRequired', function() {
		return {
			restrict: 'A',
			require: ['?ngModel'],
			link: function(scope, element, attrs, controllers) {
				var ngModel = controllers[0];

				if(ngModel){
					ngModel.$validators.required = function(modelValue, viewValue){
						return !Object.keys(viewValue).length == 0;
					}
				}

			}
		};
	});
}(window.angular));
