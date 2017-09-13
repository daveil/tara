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
			var summaryObj = {};
			var orderSummary = [];
			for(var i  in jwlPart){
				var part = jwlPart[i];
				if(!jwlSlug[part]){
					$scope.$emit('ErrorOrder','NOITEM');
					break;
				}else{
					for(var i in jwlConf[part]){
						var item = jwlConf[part][i];
						var key =  item.type+'-'+item.itemCode;
						if(!summaryObj[key]){
							summaryObj[key] = {
								name:item.name,
								price:item.price,
								quantity:1,
								amount:item.price
							};
						}else{
							var so = summaryObj[key];
								so.quantity++;
								so.amount=so.quantity * so.price;
								summaryObj[key] = so;
						}
					}
				}
			}
			for(var o in summaryObj){
				var item  =summaryObj[o];
				var order = {
					itemCode:item.itemCode,
					name:item.name,
					price:item.price,
					quantity:item.quantity,
					amount:item.amount,
				}
				orderSummary.push(order);
				
			}
			computeTotal();
			$scope.$emit('PlaceOrder',orderSummary);
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