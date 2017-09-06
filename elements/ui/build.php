 <div class="jde-ui-panel jde-ui-table" id="jde-build">
	    <div class="container jde-va-middle jde-table-row" ng-controller="JewelAttachmentController" >
	    	<div class="jde-header">
		    	<h2>Attachment jewelry</h2>
			    <p>Select up to two layer to your base jewelry</p>
		    </div>
		    <div class="main-carousel hidden-sm hidden-xs" >
					<div class="carousel-cell" ng-repeat="Pieces  in UIPieces">
						<div class='grid-item white'  ng-repeat="item in Pieces  track by $index">
							<div class="item {{item.slug}}"  ng-click="viewItem(item)"  ></div>
						</div>
					</div>
			</div>
			<div class="mini-carousel visible-sm visible-xs" >
			  <div class="carousel-cell" ng-repeat="item  in UIMobilePieces">
					<div class='grid-item white' >
						<div class="item {{item.slug}}" ng-click="viewItem(item)" ></div>
					</div>
				</div>
			</div>
		</div>

		<div id="jde-canvas" ng-controller="JewelCanvasController" >
			<pre>{{JewelConfig|json}}</pre>
		</div>
		<div class="container" ng-controller="JewelTransactionController">
			<div class="jde-footer">
				<h2>Your current total</h2>
				<p id="jde-total">{{JewelConfig.total | currency:'$ ':0}} <span></span></p>
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
	