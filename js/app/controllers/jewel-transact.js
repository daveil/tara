define(['app'],function(app){
	
	const PROMO_CODE = 'CYT2017';
	const PROMO_LESS = 0.4;
	
	app.controller('JewelTransactionController', function ($rootScope, $scope,$timeout) {
		$scope.$on('AppendItem',function(evt,item){
			//console.log('Compute Total',item);
			computeTotal();
		});
		$scope.$on('PurgeItem',function(evt,item){
			//console.log('Compute Total',item);
			computeTotal();
		});
		$scope.$on('ComputeOrder',function(evt,promoCode){
			
			$timeout(function(){
				console.log(promoCode,PROMO_CODE);
				$rootScope.JewelConfig.promoCode = promoCode;
				$scope.$apply(computeTotal);
			},250);
		});
		
		$scope.$on('ProcessOrder',function(evt,data){
			submitOrder(data);
			
		});
		$scope.undoLast = function(){
			$scope.$emit('UndoLast');
		}
		$scope.placeOrder =  function(){
			//console.log('Place Order');
			var jwlConf  = $rootScope.JewelConfig;
			var jwlSlug = jwlConf.slugs;
			var jwlPart = getParts(jwlConf);
			var summaryObj = {};
			var orderSummary = [];
			if(jwlConf.grossTotal==0){
				return $scope.$emit('ErrorOrder','EMPTY');
			}
			for(var i  in jwlPart){
				var part = jwlPart[i];
				if(!jwlSlug[part]){
					$scope.$emit('ErrorOrder','NOITEM');
					break;
				}else{
					for(var i in jwlConf[part]){
						var item = jwlConf[part][i];
						//Change to be SKU
						var key =  item.type+'-'+item.itemCode; 
						if(!summaryObj[key]){
							summaryObj[key] = {
								itemCode:item.itemCode,
								name:item.name,
								price:item.price,
								quantity:1,
								amount:item.price
							};
						}else{
							var so = summaryObj[key];
								if(item.soldAsPair){
									so.quantity = 1;
									so.price = item.price;
								}else{
									so.quantity++;
								}
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
			var jwlPart = getParts(jwlConf);
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
			
			$rootScope.JewelConfig.grossTotal =  jwlTotal;
			$rootScope.JewelConfig.netTotal =  jwlTotal;
			if($rootScope.JewelConfig.promoCode==PROMO_CODE){
					$rootScope.JewelConfig.netTotal = jwlTotal *(1-PROMO_LESS);
					$rootScope.JewelConfig.discount = PROMO_LESS*100;
					
			}
		}
		function getParts(jwlConf){
			var parts = ['earRight','earLeft','neck'];
			var jwlPart = [];
			for(var i in parts){
				 var part = parts[i];
				 if(jwlConf[part].length)
					 jwlPart.push(part);
			}
			if($rootScope.JewelConfig.type !='NCK')
			$rootScope.JewelConfig.type = jwlPart.length>1?'EPR':'EPC';
			return jwlPart;
		}
		function submitOrder(data){
		var loc =  window.location;
		var endpoint = loc.origin;
			if(loc.host.match(/localhost/g))
				endpoint +='/tara';
			endpoint += '/scripts/email.php';
		var config = {};
			config.url = endpoint;
			config.type ='POST';
			config.dateType ='json';
			config.cache = false;
			config.data = data;
			config.beforeSend = function(){
				$rootScope.JewelConfig.orderSending=true;
				$rootScope.JewelConfig.orderStatus='SENDING...';
				$scope.$emit('OrderStarted');
			};
			config.success = function (response){
				$rootScope.JewelConfig.orderStatus='SENT!';
				$timeout(function(){
					$scope.$emit('OrderProcessed');
				},2000);
				
				
			};
			config.error = function (response){
				$rootScope.JewelConfig.orderSending=false;
				$rootScope.JewelConfig.orderStatus='TRY AGAIN';
				$scope.$emit('OrderFailed');
				//fbq('track', 'CheckoutError',{response:response});
				//alert('Could not proceed. Please contact TARA for support.');
			};
		$.ajax(config);
		
		}
	});
	
	
});