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
		<div class="jde-horizontal-wrapper">
			<ul class="jde-ui-list">
				<li class="jde-ui-item">
					<div class="jde-jewel">
						<div class="jde-img jde-triangle"></div>
						<button class="jde-btn btn btn-xs" data-toggle="modal" data-target="#JDEItemModal" data-item-code="1">+</button>
					</div>
				</li>
				<li class="jde-ui-item">
					<div class="jde-jewel">
						<div class="jde-img jde-circle"></div>
						<button class="jde-btn btn btn-xs" data-toggle="modal" data-target="#JDEItemModal" data-item-code="2">+</button>
					</div>
				</li>
				<li class="jde-ui-item">
					<div class="jde-jewel">
						<div class="jde-img jde-square"></div>
						<button class="jde-btn btn btn-xs" data-toggle="modal" data-target="#JDEItemModal" data-item-code="3">+</button>
					</div>
				</li>
				<li class="jde-ui-item">
					<div class="jde-jewel">
						<div class="jde-img"></div>
						<button class="jde-btn btn btn-xs">+</button>
					</div>
				</li>
				<li class="jde-ui-item">
					<div class="jde-jewel">
						<div class="jde-img"></div>
						<button class="jde-btn btn btn-xs">+</button>
					</div>
				</li>
				<li class="jde-ui-item">
					<div class="jde-jewel">
						<div class="jde-img"></div>
						<button class="jde-btn btn btn-xs">+</button>
					</div>
				</li>
				<li class="jde-ui-item">
					<div class="jde-jewel">
						<div class="jde-img"></div>
						<button class="jde-btn btn btn-xs">+</button>
					</div>
				</li>
				<li class="jde-ui-item">
					<div class="jde-jewel">
						<div class="jde-img"></div>
						<button class="jde-btn btn btn-xs">+</button>
					</div>
				</li>
				<li class="jde-ui-item">
					<div class="jde-jewel">
						<div class="jde-img"></div>
						<button class="jde-btn btn btn-xs">+</button>
					</div>
				</li>
				<li class="jde-ui-item">
					<div class="jde-jewel">
						<div class="jde-img"></div>
						<button class="jde-btn btn btn-xs">+</button>
					</div>
				</li>
				<li class="jde-ui-item">
					<div class="jde-jewel">
						<div class="jde-img"></div>
						<button class="jde-btn btn btn-xs">+</button>
					</div>
				</li>
				<li class="jde-ui-item">
					<div class="jde-jewel">
						<div class="jde-img"></div>
						<button class="jde-btn btn btn-xs">+</button>
					</div>
				</li>
			</ul>
		</div>
		<div id="jde-canvas">
		
		</div>
		<div id="jde-actions">
			<div class="row">
				<div class="col-md-4">
					<button class="btn btn-default btn-block">
					A
					</button>
				</div>
				<div class="col-md-4">
					<button class="btn btn-default btn-block">
					A
					</button>
				</div>
				<div class="col-md-4">
					<button class="btn btn-default btn-block">
					A
					</button>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade" tabindex="-1" role="dialog" id="JDEItemModal">
	  <div class="modal-dialog" role="document">
		<div class="modal-content">
		  <div class="modal-body text-center">				
				<h4 class="jde-name"></h4>
				<img class="jde-image" src=""  />
				<div class="jde-price">
					<i>$<span></span></i>
				</div>
		  </div>
		  <div class="modal-footer">
			<button type="button" class="btn btn- pull-left" data-dismiss="modal">Close</button>
			<button type="button" class="btn btn-primary jde-btn-confirm" data-item-code="">Confirm</button>
			<div class="clear-fix"></div>
		  </div>
		</div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
    <script src="libs/bower_components/jquery/dist/jquery.min.js"></script>
    <script src="libs/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script>
    	$(document).ready(function(){
			var items = {
				1:{name:'Triangle Object', img:'img/triangle.png',price:25},
				2:{name:'Circle Object', img:'img/circle.png', price:20},
				3:{name:'Square Object', img:'img/square.png', price:15},
			};
    		$('.jde-ui-item').click(function(){
    			if(!$(this).hasClass('active'))
    				$('.jde-ui-item.active').removeClass('active');
    			$(this).toggleClass('active');
    		});
			$('#JDEItemModal').on('show.bs.modal', function (event) {
				 var button = $(event.relatedTarget)
				 var itemCode =  button.data('item-code');
				 var item = items[itemCode];
				 var modal = $(this);
				 modal.find('.jde-name').text(item.name);
				 modal.find('.jde-image').attr('src',item.img);
				 modal.find('.jde-price span').text(item.price);
				 modal.find('.jde-btn-confirm').data('item-code',itemCode);
			});
			$('.jde-btn-confirm').click(function(){
				var itemCode =  $(this).data('item-code');
				$('#JDEItemModal').modal('hide');
			});
    	});
    </script>
  </body>
</html>