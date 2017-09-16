   <div class="jde-ui-panel jde-full-h jde-ui-table" id="jde-select">
    	<div class="container " ng-controller="JewelBaseController" >
				<div class="jde-header">
					<h2>Base jewelry</h2>
					<p>Select your base jewelry</p>
				</div>
				<div class="text-center" ng-hide="JewelConfig.activePart && JewelConfig.type">
						<p class="help-text">Nothing to display yet.</p>
				</div>
				<div  class="grid-container" ng-show="JewelConfig.activePart && JewelConfig.type">
					<div class="grid-inner">
						<div class="grid-canvas vertical" ng-show="JewelConfig.type!='NCK'"  >
							<div class="grid-container" >
								<div class='grid-item white tall' ng-repeat="item in UIBases.E  track by $index">
									<a class='item' ng-click="viewItem(item)">
										<img async  ng-src="img/jewel/preview/base/{{item.slug}}.png" alt="" />
									</a>
								</div>
							</div>
						</div>
						<div class="grid-canvas vertical" ng-show="JewelConfig.type=='NCK'" >
							<div class="grid-container" >
								<div class='grid-item white tall' ng-repeat="item in UIBases.N  track by $index">
									<a class='item' ng-click="viewItem(item)">
										<img async  ng-src="img/jewel/preview/base/{{item.slug}}.png" alt="" />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
    	</div>
    </div>