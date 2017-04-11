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
	<?php include('top-nav.php');?>
    <div class="jde-ui-panel jde-ui-table jde-full-h" id="jde-intro">
    	<div class="container  jde-va-middle">
    		<div class="row">
    			<div class="col-md-6 col-md-offset-3 text-center">
			    	<h2><span>Buildable</span><br>Fine Jewelry</h2>
			    	<a href="#jde-select" class="btn btn-default btn-lg jde-btn jde-btn-main">Assemble</a>	
    			</div>
    		</div>
    	</div>
    </div>
    <div class="jde-ui-panel jde-full-h" id="jde-select">
    	<div class="container">
		    	<div class="jde-header">
			    	<h2>Base jewelry</h2>
			    	<p>Select your base jewelry</p>
		    	</div>
		    	<ul class="jde-ui-tray">
					<li class="jde-ui-item">
						<a class="jde-jewel" href="#jde-build">
							<div class="jde-img"></div>
						</a>
					</li>
					<li class="jde-ui-item">
						<a class="jde-jewel" href="#jde-build">
							<div class="jde-img"></div>
						</a>
					</li>
					<li class="jde-ui-item">
						<a class="jde-jewel" href="#jde-build">
							<div class="jde-img"></div>
						</a>
					</li>
					<li class="jde-ui-item">
						<a class="jde-jewel" href="#jde-build">
							<div class="jde-img"></div>
						</a>
					</li>
					<li class="jde-ui-item">
						<a class="jde-jewel" href="#jde-build">
							<div class="jde-img"></div>
						</a>
					</li>
					<li class="jde-ui-item">
						<a class="jde-jewel" href="#jde-build">
							<div class="jde-img"></div>
						</a>
					</li>
					<li class="jde-ui-item">
						<a class="jde-jewel" href="#jde-build">
							<div class="jde-img"></div>
						</a>
					</li>
					<li class="jde-ui-item">
						<a class="jde-jewel" href="#jde-build">
							<div class="jde-img"></div>
						</a>
					</li>
					<li class="jde-ui-item">
						<a class="jde-jewel" href="#jde-build">
							<div class="jde-img"></div>
						</a>
					</li>
				</ul>
		    	
    	</div>
    </div>
    <div class="jde-ui-panel" id="jde-build">
	    <div class="container">
	    	<div class="jde-header">
		    	<h2>Attachment jewelry</h2>
			    <p>Select up to two layer to your base jewelry</p>
		    </div>
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
		</div>

		<div id="jde-canvas">
			
		</div>
		<div class="container">
			<div class="jde-footer">
				<h2>Your current total</h2>
				<p id="jde-total">$ <span></span></p>
			</div>
			<div id="jde-actions">
				<div class="row">
					<div class="col-md-10 col-md-offset-1">
						<div class="row">
							<div class="col-md-4">
								<button class="btn btn-default btn-block jde-btn-main" id="jde-undo">
								UNDO LAST
								</button>
							</div>
							<div class="col-md-4">
								<button class="btn btn-primary btn-block jde-btn-main" id="jde-place-order" data-toggle="modal" data-target="#JDEPlaceOrderModal">
								PLACE  ORDER
								</button>
								<a class="btn btn-primary btn-block jde-btn-main" id="jde-place-order-link" data-toggle="modal" data-target="#JDEOrderSummary">
								PLACE  ORDER
								</a>
							</div>
							<div class="col-md-4">
								<button class="btn btn-default btn-block jde-btn-main" id="jde-reset">
								BEGIN AGAIN
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade" tabindex="-1" role="dialog" id="JDEItemModal">
	  <div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
		  <div class="modal-body">
		  		<div class="row">
		  			<div class="col-md-6 col-sm-6">
						<div class="jde-preview">
							<div class="jde-image-wrapper">
								<img class="jde-image img-responsive" src=""  />	
							</div>
						</div>
		  			</div>
		  			<div class="col-md-6 col-sm-6">
						<div class="jde-ui-product">
							<div class="jde-product">
								<h4 class="jde-name"></h4>
								<div class="jde-price">
									<i>$<span></span></i>
								</div>	
							</div>
							<div class="jde-btn-group">
								<button type="button" class="btn btn-primary jde-btn-confirm jde-btn-main" data-item-code="">ADD</button>
								<button type="button" class="btn btn-default jde-btn-main" data-dismiss="modal">CANCEL</button>
							</div>
						</div>
					</div>
		  		</div>
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
				<button type="button" class="btn btn-default jde-btn-main" data-dismiss="modal">Close</button>
		  </div>
		</div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	<div class="modal fade" tabindex="-1" role="dialog" id="JDEPlaceOrderModal">
	  <div class="modal-dialog  modal-lg" role="document">
		<div class="modal-content">
		  <div class="modal-body">
				<h3>Order request</h3>
				<p>Got it! Please review your order above and fulfill the order request form.</p>
	    		<p>We'll email your billing invoice within 24-28 hours after confrimation and provide further instructions.</p>
				<form id="JDEOrderRequest">
					<div class="form-group">
						<label >Full name</label>
						<input type="text" class="form-control">
					</div>
					<div class="form-group">
						<label >Email</label>
						<input type="text" class="form-control">
					</div>
					<div class="form-group">
						<label >Shipping Address</label>
						<input type="text" class="form-control">
						<input type="text" class="form-control">
						<input type="text" class="form-control">
					</div>
				</form>
		  </div>
		  <div class="modal-footer">
				<button class="btn btn-default  jde-btn-main" data-dismiss="modal" id="jde-submit-order">ORDER NOW</button>
			</div>
			
		  </div>
		</div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	<div class="modal fade" tabindex="-1" role="dialog" id="JDEOrderSummary">
	  <div class="modal-dialog  modal-lg" role="document">
		<div class="modal-content">
		  <div class="modal-body" id="jde-summary">
		  	<div class="row">
				<div class="col-md-12">
				<h2 class="text-center">Summary of your custom jewelry</h2>
				<table class="table">
					<thead>
						<tr>
							<th>Item</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Amount</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>-</td>
							<td>-</td>
							<td>-</td>
							<td>-</td>
						</tr>
					</tbody>
				</table>
				</div>
			</div>				
		  </div>
		  <div class="modal-footer">
			
				<button type="button" class="btn btn-default jde-btn-main" data-dismiss="modal" data-toggle="modal" data-target="#JDEPlaceOrderModal">PROCEED</button>
			</div>
		</div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
    <script src="libs/bower_components/jquery/dist/jquery.min.js"></script>
    <script src="libs/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="libs/bower_components/pixi.js/dist/pixi.min.js"></script>
    <script src="js/build.tara.js"></script>
     </body>
</html>