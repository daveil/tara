//Set up config
var modules = [];
var progress=0.20;
var loadedModules = 0;
var totalModules = 0;
var bar = document.getElementById('bar');
	bar.style.width ='15%';
requirejs.config({
    baseUrl: 'libs/bower_components/',
	urlArgs: (function(){ return 'v='+(new Date()).getTime()})(), // Dev purposes.
	waitSeconds: 120,
    paths: {
        'angular': 'angular/angular.min',
		'jquery': 'jquery/dist/jquery.min',
		'bootstrap': 'bootstrap/dist/js/bootstrap.min',
		'jquery-bridget': 'jquery-bridget/jquery-bridget',
		'flickity':'flickity/dist/flickity.pkgd.min',
		'pixi':'pixi.js/dist/pixi.min',
		'app': '../../js/app/main',
		'fb': '../../js/vendors/fb-pixel',
		'ga': '../../js/vendors/ga',
		'f-ldr': '../../js/file-loader',
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
	progress = 1;
	bar.style.width = progress*100+'%';
	app.init();
	
});

require.onResourceLoad= function (context, map, depMaps) {
	if(progress<1){
		if(progress==0) progress=0.1;
		var mods = Object.keys(context.urlFetched);
		if(mods.length>modules.length){
			modules=mods;
			totalModules = modules.length;
		} 
		
		if(modules.indexOf(map.url)>-1 ){
			loadedModules++;
			var p = loadedModules / totalModules;
			if(p>progress) progress =p;
			else progress+=0.1; 
		}
		bar.style.width = progress*100+'%';
	}
	
};