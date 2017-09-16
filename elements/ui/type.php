<div class="jde-ui-panel jde-full-h jde-ui-table" id="jde-start">
    	<div class="container " ng-controller="JewelTypeController" >
				<div class="jde-header">
					<h2>LET'S BEGIN</h2>
					<p>Select your jewelry</p>
				</div>
				<div class="grid-canvas vertical" >
					<div class="grid-container" >
						<div class='grid-item white tall' ng-repeat="item in UITypes  track by $index">

							<a class='item' ng-click="selectType(item)"><p class="help-text text-center">{{item.name}}</p><img async  ng-src="img/model/{{item.slug}}.png" alt="" /></a>

						</div>
					</div>
				</div>
    	</div>
    </div>