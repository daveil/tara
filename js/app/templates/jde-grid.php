
<div class="grid-canvas" >
	<div class="grid-container" ng-if="jdeGridType === 'vertical'">
		<div class='grid-item white' ng-class="{tall:item.type=='T'}"  ng-repeat="item in jdeGridItems  track by $index">
			<a class='item'><img ng-src="img/jewel/preview/base/{{item.slug}}.png" alt="" /></a>
		</div>
	</div>
</div>