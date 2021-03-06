<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <title>TARA  Jewelry Builder | The Artisan Row Accessories</title>
	<link href="libs/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
	<link href="libs/bower_components/flickity/dist/flickity.min.css" rel="stylesheet">
	<link rel="stylesheet" href="css/tara.css<?php echo '?a='.rand();?>" />
	<link rel="stylesheet" href="css/grid.tara.css<?php echo '?a='.rand();?>" />
	<link rel="stylesheet" href="css/jewel.tara.css<?php echo '?a='.rand();?>" />
	<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-101903219-1', 'auto');
	  ga('send', 'pageview');
	</script>
	<!-- Facebook Pixel Code -->
	<script>
	!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
	n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
	n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
	t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
	document,'script','https://connect.facebook.net/en_US/fbevents.js');
	fbq('init', '425915167808933', {
	em: 'no-reply@ishoptara.com'
	});
	fbq('track', 'PageView');
	</script>
	<noscript><img height="1" width="1" style="display:none"
	src="https://www.facebook.com/tr?id=425915167808933&ev=PageView&noscript=1"
	/></noscript>
	<!-- DO NOT MODIFY -->
	<!-- End Facebook Pixel Code -->
  </head>
  <body>
  	<?php include('top-nav.php');?>
	<div class="jde-ui-panel jde-ui-table jde-full-h parallax" id="jde-intro">
    	<div class="container">
    		<div class="row">
    			<div class="col-md-6">
    				<img class="img-responsive" src="img/logo white.png" alt="TARA" />
    			</div>
    			<div class="col-md-6  text-center">
			    	<h2>Assemble<br/><span>Your own fine jewelry</span></h2>
			    	<a id="begin-now" href="#jde-select" class="btn btn-xs btn-default jde-btn jde-btn-main">Begin now</a>	
    			</div>
    		</div>
    		<a href="http://ishoptara.com/" id="return-to-main">Return to main store</a>
    	</div>
    </div>
    <div class="jde-ui-panel jde-full-h jde-ui-table" id="jde-select">
    	<div class="container ">
		    	<div class="jde-header">
			    	<h2>Base jewelry</h2>
			    	<p>Select your base jewelry</p>
		    	</div>
		    	<?php include('grid-vertical.php');?>
		    	<?php //include('tray-vertical.php');?>
		    	
    	</div>
    </div>
    <div class="jde-ui-panel jde-ui-table" id="jde-build">
	    <div class="container jde-va-middle jde-table-row">
	    	<div class="jde-header">
		    	<h2>Attachment jewelry</h2>
			    <p>Select up to two layer to your base jewelry</p>
		    </div>
		    <?php include('grid-horizontal.php');?>
		    <?php include('list-horizontal.php');?>
			
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
							<div class="col-md-4 col-sm-4">
								<button class="btn btn-default btn-block jde-btn-main" id="jde-undo">
								UNDO LAST
								</button>
							</div>
							<div class="col-md-4 col-sm-4">
								<button class="btn btn-primary btn-block jde-btn-main" id="jde-place-order" data-toggle="modal" data-target="#JDEPlaceOrderModal" data-backdrop="static" data-keyboard="false">
								PLACE  ORDER
								</button>
								<a class="btn btn-primary btn-block jde-btn-main" id="jde-place-order-link" data-toggle="modal" data-target="#JDEOrderSummary" data-backdrop="static" data-keyboard="false">
								PLACE  ORDER
								</a>
							</div>
							<div class="col-md-4 col-sm-4">
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
		  			<div class="col-md-6">
						<div class="jde-preview">
							<div class="jde-image-wrapper">
								<img class="jde-image img-responsive" src=""  />	
							</div>
						</div>
		  			</div>
		  			<div class="col-md-6">
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
	  <div class="modal-dialog " role="document">
		<div class="modal-content">
		  <div class="modal-body text-center">				
				<p></p>
		  </div>
		  <div class="modal-footer">
				<button type="button" class="btn btn-default jde-btn-main" data-dismiss="modal">Close</button>
				<button type="button" class="btn btn-default jde-btn-main jde-btn-undo" data-dismiss="modal">Undo Last</button>
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
						<input type="text" class="form-control" id="full-name-1">
					</div>
					<div class="form-group">
						<label >Email</label>
						<input type="email" class="form-control" id="email-1">
					</div>
					<div class="form-group">
						<label >Shipping Address</label>
						<input type="text" class="form-control" id="address-1-1">
						<input type="text" class="form-control" id="address-2-1">
						<input type="text" class="form-control" id="address-3-1">
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
				<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
				<h2 class="text-left">Summary of your custom jewelry</h2>
				 
				<div class="clearfix"></div>
				<table class="table">
					<thead>
						<tr>
							<th>Item</th>
							<th>Price</th>
							<th><span class="hidden-sm hidden-xs">Quantity</span><span class="visible-sm visible-xs">Qty</span></th>
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
					<tfoot></tfoot>
				</table>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6 col-md-offset-6">
					<h3>Order Request</h3>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<div class="spacer"></div>
					<p>Got it! Please review your order above and fulfill the order request form.</p>
					<p>We'll email your billing invoice within 24-48 hours after confirmation and provide further instructions.</p>
				</div>
				<div class="col-md-6">
				<form id="JDEOrderRequest">
					<div class="form-group">
						<label >Full name</label>
						<input type="text" class="form-control" id="full-name">
					</div>
					<div class="form-group">
						<label >Email</label>
						<input type="email" class="form-control" id="email">
					</div>
					<div class="form-group">
						<label >Shipping Address</label>
						<input type="text" class="form-control" id="address-1">
						<input type="text" class="form-control" id="address-2">
					</div>
					<div class="form-group">
						<label >Promo Code</label>
						<input type="text" class="form-control" id="promo-code">
					</div>
				</form>
				<button class="btn btn-default  jde-btn-main"  id="jde-submit-order-now">ORDER NOW</button>
				</div>
			</div>
		  </div>
		  <div class="modal-footer hide">
			
				<button type="button" class="btn btn-default jde-btn-main" data-dismiss="modal" data-toggle="modal" data-target="#JDEPlaceOrderModal">PROCEED</button>
			</div>
		</div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
 	<?php include('scripts.php');?>
     </body>
</html>