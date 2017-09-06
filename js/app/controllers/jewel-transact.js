define(['app'],function(app){
	
	const PROMO_CODE = 'CYT2017';
	const PROMO_LESS = 0.4;
	
	app.controller('JewelTransactionController', function ($rootScope, $scope,$timeout) {
		$scope.$on('AppendItem',function(evt,item){
			console.log('Compute Total',item);
			computeTotal();
		});
		$scope.$on('PurgeItem',function(evt,item){
			console.log('Compute Total',item);
			computeTotal();
		});
		function computeTotal(){
			var jwlConf = $rootScope.JewelConfig;
			var jwlPart = ['earRight'];
			var jwlTotal = 0;
			for(var i  in jwlPart){
				var part = jwlPart[i];
				for(var j in jwlConf[part]){
					var item =  jwlConf[part][j];
					jwlTotal+=item.price;
				}
			}
			
			$rootScope.JewelConfig.total =  jwlTotal;
		}
	});
	
});