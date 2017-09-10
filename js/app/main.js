define(['jquery-bridget','flickity','f-ldr','bootstrap','angular'],function (jqueryBridget,flickity,fldr) {
	var app = angular.module("JDe",[]); 
	
	app.init = function (modules) {
		console.log('app.init called');
		angular.bootstrap(document, ['JDe']);
		jqueryBridget('flickity',flickity);
		
		setTimeout(function(){
			jQuery('body').addClass('loaded');
		},250);
	};
	
	return app;
});