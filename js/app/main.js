define(['jquery-bridget','flickity','bootstrap','angular'],function (jqueryBridget,flickity) {
	var app = angular.module("JDe",[]); 
	
	app.init = function (modules) {
		console.log('app.init called');
		angular.bootstrap(document, ['JDe']);
		jqueryBridget('flickity',flickity);
		
	};
	
	return app;
});