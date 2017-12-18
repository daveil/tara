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
		#main{opacity:0;}
		.loaded #main{opacity:1;}
		.loaded #preloader{opacity:0;}
		#bar{
			height: 4px;
			width: 4%;
			background-color: #15294f;
		}
		#preloader{
			position:absolute;
			width:100%;
			height:100%;
		}
	</style>
	
	<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
	<noscript><img height="1" width="1" style="display:none"
	src="https://www.facebook.com/tr?id=425915167808933&ev=PageView&noscript=1"
	/></noscript>
	<link rel="stylesheet" href="css/preload.tara.css?a" media="none" onload="if(media!='all')media='all'" />
	<link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"  media="none" onload="if(media!='all')media='all'"/>
	<link href="libs/bower_components/flickity/dist/flickity.min.css" rel="stylesheet"  media="none" onload="if(media!='all')media='all'"/>
	<link rel="stylesheet" href="css/tara.css<?php echo '?a='.rand();?>"  media="none" onload="if(media!='all')media='all'"/>
	<link rel="stylesheet" href="css/grid.tara.css<?php echo '?a='.rand();?>" media="none" onload="if(media!='all')media='all'" />
  </head>
  <body >
	<div id="preloader">
		<div id="bar"></div>
	</div>
	<script data-main="js/config" src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.5/require.min.js"></script>
	<style type="text/css">#bar{width:19%}</style>
	<div id="main"ng-controller="JewelDesignerController">