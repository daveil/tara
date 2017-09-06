//Set up config
requirejs.config({
    baseUrl: 'libs/bower_components/',
	urlArgs: (function(){ return 'v='+(new Date()).getTime()})(), // Dev purposes.
	waitSeconds: 60,
    paths: {
        'angular': 'angular/angular.min',
		'jquery': 'jquery/dist/jquery.min',
		'bootstrap': 'bootstrap/dist/js/bootstrap.min',
		'jquery-bridget': 'jquery-bridget/jquery-bridget',
		'flickity':'flickity/dist/flickity.pkgd.min',
		'app': '../../js/app/main',
		'fb': '../../js/vendors/fb-pixel',
		'ga': '../../js/vendors/ga',
		'jdeDsgn': '../../js/app/controllers/jewel-design',
		'jdeBase': '../../js/app/controllers/jewel-base',
		'jdeAtch': '../../js/app/controllers/jewel-attach',
		'jdeCnvs': '../../js/app/controllers/jewel-canvas',
		'jdeTran': '../../js/app/controllers/jewel-transact'
    },
	shim:{
		'angular':{exports:'angular',deps:['jquery']},
		'bootstrap':{deps:['jquery']}
	},
	
});
//Load trackers
if(window.location.host!='localhost')
	requirejs(['fb','ga']);
//Initialize app
requirejs(['app','jdeDsgn'],function(app){
	app.init();
});
