define(['jquery-bridget','flickity','f-ldr','angular'],function () {
	var app = angular.module("JDe",[]); 
	
	app.init = function (modules) {
		console.log('app.init called');
		angular.bootstrap(document, ['JDe']);
		setTimeout(function(){
			jQuery('body').addClass('loaded');
		},150);
	};
	
	return app;
});