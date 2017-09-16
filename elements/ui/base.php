   <div class="jde-ui-panel jde-full-h jde-ui-table" id="jde-select">
    	<div class="container " ng-controller="JewelBaseController" >
				<div class="jde-header">
					<h2>Base jewelry</h2>
					<p>Select your base jewelry</p>
				</div>
				<div class="grid-canvas vertical" >
					<div class="grid-container" >
						<div class='grid-item white tall' ng-repeat="item in UIBases track by $index">
							<a class='item' ng-click="viewItem(item)"><img async  ng-src="img/jewel/preview/base/{{item.slug}}.png" alt="" /></a>
						</div>
					</div>
				</div>
    	</div>
    </div>