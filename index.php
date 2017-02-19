<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Tara Jewelry Builder</title>
	<link href="libs/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
	<link rel="stylesheet" href="css/tara.css" />
	<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <div class="container">
		<div class="row">
			<div class="col-md-10 col-md-offset-1">
				<center>
				<h2>Welcome to Tara!</h2>
				<button class="btn btn-default add-pendant" data-pendant="A">+ A</button>
				<button class="btn btn-default add-pendant" data-pendant="B">+ B</button>
				<button class="btn btn-default add-pendant" data-pendant="C">+ C</button>
				<button class="btn btn-default" id="add-random-pendant">Random</button>
				<button class="btn btn-warning" id="undo-pendant">Undo</button>
				<button class="btn btn-danger" id="clear-pendants">Clear</button>
				</center>
			</div>
		</div>
	</div>
    <script src="libs/bower_components/jquery/dist/jquery.min.js"></script>
    <script src="libs/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="libs/bower_components/pixi.js/dist/pixi.min.js"></script>
	<script type="text/javascript" src="js/tara.js"></script>
  </body>
</html>