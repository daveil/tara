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
		
		$scope.undoLast = function(){
			$scope.$emit('UndoLast');
		}
		$scope.placeOrder =  function(){
			console.log('Place Order');
			var jwlConf  = $rootScope.JewelConfig;
			var jwlSlug = jwlConf.slugs;
			var jwlPart = ['earRight'];
			for(var i  in jwlPart){
				var part = jwlPart[i];
				console.log(part, jwlSlug);
				if(!jwlSlug[part]){
					$scope.$emit('ErrorOrder','NOITEM');
					break;
				}
			}
			$scope.$emit('PlaceOrder');
		}
		$scope.beginAgain = function(){
			$scope.$emit('BeginAgain');
		}
		function computeTotal(){
			var jwlConf  = $rootScope.JewelConfig;
			var jwlSlug = jwlConf.slugs;
			var jwlPart = ['earRight'];
			var jwlTotal = 0;
			for(var i  in jwlPart){
				var part = jwlPart[i];
				jwlSlug[part]='';
				for(var j in jwlConf[part]){
					var item =  jwlConf[part][j];
					jwlTotal+=item.price;
					jwlSlug[part]+=item.type;
				}
			}
			
			$rootScope.JewelConfig.total =  jwlTotal;
		}
	});
	
	
});