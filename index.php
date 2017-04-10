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
    <div class="jde-ui-panel" id="jde-intro">
    	<div class="container">
    		<div class="row">
    			<div class="col-md-6 col-md-offset-3 text-center">
			    	<p>Lorem ipsum fedur ilum sur nomeni.</p>
			    	<button class="btn btn-default btn-lg">Start</button>	
    			</div>
    		</div>
    	</div>
    </div>
    <div class="jde-ui-panel" id="jde-select">
    	<div class="container text-center">
		    	<h2>Select base jewelry</h2>
		    	<ul class="jde-ui-tray">
					<li class="jde-ui-item">
						<div class="jde-jewel">
							<div class="jde-img jde-triangle"></div>
						</div>
					</li>
					<li class="jde-ui-item">
						<div class="jde-jewel">
							<div class="jde-img jde-triangle"></div>
						</div>
					</li>
					<li class="jde-ui-item">
						<div class="jde-jewel">
							<div class="jde-img jde-triangle"></div>
						</div>
					</li>
					<li class="jde-ui-item">
						<div class="jde-jewel">
							<div class="jde-img jde-triangle"></div>
						</div>
					</li>
					<li class="jde-ui-item">
						<div class="jde-jewel">
							<div class="jde-img jde-triangle"></div>
						</div>
					</li>
					<li class="jde-ui-item">
						<div class="jde-jewel">
							<div class="jde-img jde-triangle"></div>
						</div>
					</li>
					<li class="jde-ui-item">
						<div class="jde-jewel">
							<div class="jde-img jde-triangle"></div>
						</div>
					</li>
					<li class="jde-ui-item">
						<div class="jde-jewel">
							<div class="jde-img jde-triangle"></div>
						</div>
					</li>
					<li class="jde-ui-item">
						<div class="jde-jewel">
							<div class="jde-img jde-triangle"></div>
						</div>
					</li>
				</ul>
		    	
    	</div>
    </div>
    <div class="jde-ui-panel" id="jde-build">
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
					<div class="col-md-8 col-md-offset-2">
						<h3 id="jde-total" class="text-center">Total $<span></span></h3>
						<div class="row">
							<div class="col-md-4">
								<button class="btn btn-default btn-block" id="jde-undo">
								UNDO
								</button>
							</div>
							<div class="col-md-4">
								<button class="btn btn-default btn-block" id="jde-reset">
								RESET
								</button>
							</div>
							<div class="col-md-4">
								<button class="btn btn-primary btn-block" id="jde-place-order" data-toggle="modal" data-target="#JDEPlaceOrderModal">
								PLACE ORDER
								</button>
							</div>
						</div>
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
		<div class="modal fade" tabindex="-1" role="dialog" id="JDEWarnModal">
		  <div class="modal-dialog" role="document">
			<div class="modal-content">
			  <div class="modal-body text-center">				
					<p></p>
			  </div>
			  <div class="modal-footer">
				<button type="button" class="btn btn- pull-left" data-dismiss="modal">Close</button>
				<div class="clear-fix"></div>
			  </div>
			</div><!-- /.modal-content -->
		  </div><!-- /.modal-dialog -->
		</div><!-- /.modal -->
		<div class="modal fade" tabindex="-1" role="dialog" id="JDEPlaceOrderModal">
		  <div class="modal-dialog" role="document">
			<div class="modal-content">
			  <div class="modal-body text-center">				
					To place your order please enter your email. <br />
					<div class="form-group"><input type="email" class="form-control" placeholder="Your email." /></div>
			  </div>
			  <div class="modal-footer">
				<button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
				<button type="button" class="btn btn-primary" id="jde-submit-order" data-dismiss="modal" data-toggle="modal" data-target="#JDEWarnModal">Submit</button>
				<div class="clear-fix"></div>
			  </div>
			</div><!-- /.modal-content -->
		  </div><!-- /.modal-dialog -->
		</div><!-- /.modal -->
	</div>
    <script src="libs/bower_components/jquery/dist/jquery.min.js"></script>
    <script src="libs/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="libs/bower_components/pixi.js/dist/pixi.min.js"></script>
    <script>
    	$(document).ready(function(){
			const VIEW_HEIGHT = 1.25;
			const WIDTH  = 796;
			const HEIGHT = 702/VIEW_HEIGHT;
			const PENDANTS = {
				1:{name:'Triangle Object', path:'img/triangle.png',price:25,width:200,height:220,type:'A'},
				2:{name:'Circle Object', path:'img/circle.png', price:20,width:200,height:220,type:'A'},
				3:{name:'Square Object', path:'img/square.png', price:15,width:200,height:220,type:'A'}
			};
			const APP = new PIXI.Application(WIDTH, HEIGHT, {backgroundColor : 0xffffff});
			const MAX_ATTCH = 3;
			const BASE_Y = 123;
			var pendantSprites = [];
			var lastPosition=BASE_Y;
			var orderPlaced = false;
			buildBase(0,-144);
			function buildBase(x,y){
				$('#jde-canvas').prepend(APP.view);
				addSprite('img/body.jpg',0,0);
				addSprite('img/Base-A.png',x,y,2700,1018,0.45);
				computeTotal();
			}
			function addSprite(img,x,y,width,height,scale){
				var path = img;
				var scale =  scale||1;
				var sprite =  PIXI.Sprite.fromImage(path);
					sprite.anchor.set(0.5);
					sprite.x=x+(WIDTH/2);
					sprite.y=y+(HEIGHT/2);
					sprite.width=width*scale||WIDTH;
					sprite.height=height*scale||HEIGHT*VIEW_HEIGHT;
				APP.stage.addChild(sprite);
				return sprite;
			}
			function addPendant(itemCode){
				if(itemCode==undefined){
					var min = 0 ;
					var max = PENDANTS.length-1;
					itemCode = Math.round(Math.random()* (max - min) + min)+1;
				}
				if(lastPosition<BASE_Y) lastPosition = BASE_Y;
				var pendant = PENDANTS[itemCode];
				var scale = 0.3;
				var sprite = addSprite(pendant.path,0,lastPosition,pendant.width,pendant.height,scale);
				var pendant_height = (pendant.height*scale);
				pendantSprites.push({height:pendant_height,sprite:sprite,price:pendant.price});
				if(pendant.type=='A')
					lastPosition = lastPosition+pendant_height;
				computeTotal();
			}
			function removePendant(index){
				var pendant = pendantSprites[index];
				APP.stage.removeChild(pendant.sprite);
				lastPosition = lastPosition-pendant.height;
				pendantSprites.pop();
				computeTotal();
			}
			function computeTotal(){
				var total = 0;
				for(var i in pendantSprites){
					var pendant = pendantSprites[i];
					total += pendant.price;
				}
				$('#jde-total span').text(total);
				if(pendantSprites.length==0){
					$('#jde-place-order').attr('data-target','#JDEWarnModal');
					$('.jde-btn').attr('data-target','#JDEItemModal');
					if(!orderPlaced)
						$('#JDEWarnModal .modal-body p').text('Add item first!');
				}else{
					$('#jde-place-order').attr('data-target','#JDEPlaceOrderModal');
					if(pendantSprites.length>=MAX_ATTCH&&!orderPlaced){
						$('.jde-btn').attr('data-target','#JDEWarnModal');
						$('#JDEWarnModal .modal-body p').text('Oops! You can only add up to '+MAX_ATTCH+' item(s).');
					}else{
						$('.jde-btn').attr('data-target','#JDEItemModal');
						$('#JDEWarnModal .modal-body p').text('Order placement successful. Thank you!');
					}
				}
			}
			function resetBuilder(){
				if(pendantSprites.length)
					for(var i in pendantSprites){
						APP.stage.removeChild(pendantSprites[i].sprite);
					}
				pendantSprites=[];
				lastPosition = BASE_Y;
				computeTotal();
			}
			$('#JDEWarnModal .modal-body span').text(MAX_ATTCH);
    		$('.jde-ui-item').click(function(){
    			if(!$(this).hasClass('active'))
    				$('.jde-ui-item.active').removeClass('active');
    			$(this).toggleClass('active');
    		});
			$('#JDEItemModal').on('show.bs.modal', function (event) {
				 var button = $(event.relatedTarget)
				 var itemCode =  button.data('item-code');
				 var item = PENDANTS[itemCode];
				 var modal = $(this);
				 modal.find('.jde-name').text(item.name);
				 modal.find('.jde-image').attr('src',item.path);
				 modal.find('.jde-price span').text(item.price);
				 modal.find('.jde-btn-confirm').data('item-code',itemCode);
			});
			$('#JDEWarnModal').on('show.bs.modal', function (event) {
				if(orderPlaced){
					resetBuilder();
				}
			}).on('hidden.bs.modal', function (event) {
				if(orderPlaced){
					orderPlaced =false;
					$('#JDEWarnModal .modal-body p').text('Add item first!');
				}
			});
			$('.jde-btn-confirm').click(function(){
				var itemCode =  $(this).data('item-code');
				addPendant(itemCode);
				$('#JDEItemModal').modal('hide');
			});
			$('#jde-undo').click(function(){
				var i = pendantSprites.length-1;
				if(i>=0)
					removePendant(i);
				else
					lastPosition = BASE_Y;
			});
			$('#jde-reset').click(function(){
				resetBuilder();
			});
			$('#jde-submit-order').click(function(){
				orderPlaced = true;
			});
			
    	});
    </script>
  </body>
</html>