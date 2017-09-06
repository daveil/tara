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
	
</div>
	