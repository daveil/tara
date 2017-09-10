<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <title>TARA  Jewelry Builder | The Artisan Row Accessories</title>
	
	<style type="text/css">
		body{padding:0;margin:0;}
		#main,#preloader{
			-webkit-transition: opacity 0.5s ease-in-out;
			-moz-transition: opacity 0.5s ease-in-out;
			-ms-transition: opacity 0.5s ease-in-out;
			-o-transition: opacity 0.5s ease-in-out;
		}
		#bar{
			-webkit-transition: width 0.25s ease-in-out;
			-moz-transition: width 0.25s ease-in-out;
			-ms-transition: width 0.25s ease-in-out;
			-o-transition: width 0.25s ease-in-out;
		}
		#preloader{
			position:absolute;
			width:100%;
			height:100%;
			background-image:url('img/tara-loading.gif');
			background-size: 500px auto;
			background-repeat: no-repeat;
			background-position: 50%;
			opacity:1;
		}
		#bar{
			height: 2px;
			width: 0%;
			background-color: #15294f;
		}
		#main{opacity:0;}
		.loaded #main{opacity:1;}
		.loaded #preloader{opacity:0;}
		
		
	</style>
	
	<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
	<noscript><img height="1" width="1" style="display:none"
	src="https://www.facebook.com/tr?id=425915167808933&ev=PageView&noscript=1"
	/></noscript>
	 <link href="libs/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet"  media="none" onload="if(media!='all')media='all'"/>
	<link href="libs/bower_components/flickity/dist/flickity.min.css" rel="stylesheet"  media="none" onload="if(media!='all')media='all'"/>
	<link rel="stylesheet" href="css/tara.css<?php echo '?a='.rand();?>"  media="none" onload="if(media!='all')media='all'"/>
	<link rel="stylesheet" href="css/grid.tara.css<?php echo '?a='.rand();?>" media="none" onload="if(media!='all')media='all'" />
  </head>
  <body >
	<script data-main="js/config" src="libs/bower_components/requirejs/require.js"></script>
	<div id="preloader">
		<div id="bar"></div>
	</div>
	<div id="main"ng-controller="JewelDesignerController">