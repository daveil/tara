<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Tara Jewelry Builder</title>
	<link href="libs/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
	<link rel="stylesheet" href="css/tara.css<?php echo '?a='.rand();?>" />
	<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <div class="container">
		<div id="jde-canvas"></div>
		<div id="jde-actions"></div>
		<div class="jde-horizontal-wrapper">
			<ul class="jde-ui-list">
				<li class="jde-ui-item">
					<div class="jde-jewel">
						<div class="jde-img"></div>
						<div class="jde-title">ITEM 1</div>
						<button class="jde-btn btn btn-xs">ADD</button>
					</div>
				</li>
				<li class="jde-ui-item">
					<div></div>
				</li>
				<li class="jde-ui-item">
					<div></div>
				</li>
				<li class="jde-ui-item">
					<div></div>
				</li>
				<li class="jde-ui-item">
					<div></div>
				</li>
				<li class="jde-ui-item">
					<div></div>
				</li>
				<li class="jde-ui-item">
					<div></div>
				</li>
				<li class="jde-ui-item">
					<div></div>
				</li>
				<li class="jde-ui-item">
					<div></div>
				</li>
				<li class="jde-ui-item">
					<div>
						
					</div>
				</li>
				<li class="jde-ui-item">
					<div>
						
					</div>
				</li>
				<li class="jde-ui-item">
					<div>
						
					</div>
				</li>
				<li class="jde-ui-item">
					<div>
						
					</div>
				</li>
				
			</ul>
		</div>
	</div>
    <script src="libs/bower_components/jquery/dist/jquery.min.js"></script>
    <script>
    	$(document).ready(function(){
    		$('.jde-ui-item').click(function(){
    			if(!$(this).hasClass('active'))
    				$('.jde-ui-item.active').removeClass('active');
    			$(this).toggleClass('active');
    		});
    	});
    </script>
  </body>
</html>