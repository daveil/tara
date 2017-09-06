define(['app','jquery-bridget','flickity'],function(app,jqueryBridget ,flickity){
	jqueryBridget('flickity',flickity);
	app.directive('jdeGrid', function ($timeout) {
		return {
			replace: true,
			restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
			scope: {
				jdeGridConfig: '='
			},
			templateUrl: 'js/app/templates/jde-grid.php',
			link: function ($scope, elem, attrs) { 
				var config =  $scope.jdeGridConfig;
				
				$scope.jdeGridType = config.uiClass;
				$scope.jdeGridItems = config.items;
				
				$timeout(function(){
					$(elem).addClass($scope.jdeGridType);
					$(elem).find('.grid-container').flickity(config.uiOptions);
				});
			} 
		}
	});
});