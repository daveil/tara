<div ng-controller="JewelModalController">
	
	<div class="modal fade" tabindex="-1" role="dialog" id="JDEItemModal">
	  <div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
		  <div class="modal-body">
		  		<div class="row">
		  			<div class="col-md-6">
						<div class="jde-preview">
							<div class="jde-image-wrapper">
								<img class="jde-image img-responsive" ng-src="{{Item.image}}"  />	
							</div>
						</div>
		  			</div>
		  			<div class="col-md-6">
						<div class="jde-ui-product">
							<div class="jde-product">
								<h4 class="jde-name">{{Item.name}}</h4>
								<div class="jde-price">
									<i><span>{{Item.price | currency:'$ ':0}}</span></i>
								</div>	
							</div>
							<div class="jde-btn-group">
								<button type="button" class="btn btn-primary jde-btn-confirm jde-btn-main" ng-click="addItem(Item)">ADD</button>
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
				<p>{{Message}}</p>
		  </div>
		  <div class="modal-footer">
				<button type="button" class="btn btn-default jde-btn-main" data-dismiss="modal">Close</button>
				<button type="button" class="btn btn-default jde-btn-main jde-btn-undo" data-dismiss="modal" ng-show="Code=='INVATTA'" ng-click="undoLast()">Undo Last</button>
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
				<h2 class="text-left">
				
				<span class="hidden-xs">Summary of your custom jewelry</span>
				<span class="visible-xs">Summary</span>
				</h2>
				 
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
						<tr  ng-repeat="Item in JewelConfig.orderSummary">
							<td>{{Item.name}}</td>
							<td><div class="currency">{{Item.price | currency:'':0}}</div></td>
							<td class="text-center">{{Item.quantity}}</td>
							<td><div class="currency">{{Item.amount | currency:'':0}}</div></td>
						</tr>
					</tbody>
					<tfoot>
						<tr id="gross-total" >
							<td class="text-right" colspan="3"> Total</td>
							<td class="amount"><div class="currency">{{JewelConfig.grossTotal | currency:'$ ':0}}</div></td>
						</tr>
						<tr id="net-total" ng-show="ShowNetTotal">
							<td class="text-right" colspan="3">Net Total <i>(Less {{JewelConfig.discount}}%)</i></td>
							<td class="amount"><div class="currency">{{JewelConfig.netTotal | currency:'$ ':0}}  </div></td>
						</tr>
					</tfoot>
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
						<input type="text" class="form-control" id="full-name" ng-model="Name">
					</div>
					<div class="form-group">
						<label >Email</label>
						<input type="email" class="form-control" id="email" ng-model="Email">
					</div>
					<div class="form-group">
						<label >Shipping Address</label>
						<input type="text" class="form-control" id="address-1" ng-model="Address1">
						<input type="text" class="form-control" id="address-2" ng-model="Address2">
					</div>
					<div class="form-group">
						<label >Promo Code</label>
						<input type="text" class="form-control" id="promo-code" ng-model="PromoCode" ng-change="applyPromoCode()">
					</div>
				</form>
				<button class="btn btn-default  jde-btn-main"  id="jde-submit-order-now" ng-click="submitOrder()" ng-disabled="JewelConfig.orderSending" >{{JewelConfig.orderStatus?JewelConfig.orderStatus:'ORDER NOW'}}</button>
				</div>
			</div>
		  </div>
		  <div class="modal-footer hide">
			
				<button type="button" class="btn btn-default jde-btn-main" data-dismiss="modal" data-toggle="modal" data-target="#JDEPlaceOrderModal">PROCEED</button>
			</div>
		</div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
</div>
	