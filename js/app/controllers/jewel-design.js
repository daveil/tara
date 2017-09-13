define(['app','jdeBase','jdeAtch','jdeCnvs','jdeTran'],function(app){
	
	const JEWEL_BASE = 'base';
	const JEWEL_ATTACHMENT = 'atta';
	const JEWEL_DIR ='img/jewel/';
	const JEWEL_PREFIX = '00-';
	const JEWEL_SUFFIX = '.png';
	const EAR_PIECE =  'EPC';
	const EAR_PAIR =  'EPR';
	const POS_DEFAULT = 'earRight';
	const JEWEL_DEFAULT = EAR_PIECE;
	const NECKLACE =  'NCK';
	const SCROLL_SPEED = 800;
	const THRESHOLD2FADE =  $(window).height() * 0.35;
	const UI_PANEL = {Intro:'#jde-intro',Base:'#jde-select',Attach:'#jde-build'};
	
	app.controller('JewelDesignerController', function ($rootScope,$scope,$timeout) {
		require(['jquery-bridget','flickity'],function(jqueryBridget,flickity){
			jqueryBridget('flickity',flickity);
			
		});
		function initConfig(){
			$rootScope.JewelConfig = {
				type:null,
				slugs:{},
				earRight:[],
				earLeft:[],
				neck:[],
				orderSummary:[],
				grossTotal:0,
				netTotal:0,
				discount:0,
				promoCode:null,
				activePart:null
			};
		}
		function initScrollManager(){
			$(window).scroll(function() {
				var position = $(window).scrollTop();
				var opacity = 1 - position/THRESHOLD2FADE;
				
				$('#jde-intro .container').css({'opacity':opacity});
				$('#top-nav').css({'opacity':1-opacity});
				
			});
			$('a[href^="#"]').on('click',function (e) {
				e.preventDefault();
				var target = this.hash;
				scrollTo(target);
				
			});
			setTimeout(function(){scrollTo(UI_PANEL.Intro);},SCROLL_SPEED/2);
		}
		
		function scrollTo(target){
			var $target = $(target);		
			$('html, body').stop().animate({
				'scrollTop': $target.offset().top
			}, SCROLL_SPEED, 'swing', function () {
				window.location.hash = target;
			});
		}
		
		
		initConfig();
		initScrollManager();
		
		$scope.$on('ScrollTo',function(evt,target){
			scrollTo(target);
		});
		
		$scope.$on('AttachError',function(evt,code){
			$scope.$broadcast('PreviewError',code);
		});
		
		$scope.$on('ViewItem',function(evt,item){
			//console.log('Recieved in JDsgr',item);
			$scope.$broadcast('PreviewItem',item);
			
		});
		
		$scope.$on('AddItem',function(evt,item){
			$scope.$broadcast('AppendItem',item);
			
		});
		$scope.$on('AppendItem',function(evt,item){
			var $item =  angular.copy(item);
				$item.itemCode =  $item.id;
			var activePart = $rootScope.JewelConfig.activePart;
			switch($scope.JewelConfig.type){
				case EAR_PIECE:
					var earDef = $rootScope.JewelConfig[activePart];
					if($item.itemType==JEWEL_BASE){
						$item.index=0;
						earDef[0]=$item;
						$scope.$broadcast('BaseAdded');
					}else{
						$item.index=earDef.length;
						earDef.push($item);
					}
				break;
				case EAR_PAIR:

					if($item.itemType==JEWEL_BASE){
						$item.index=0;
						var earL = $rootScope.JewelConfig.earLeft;
						var earR = $rootScope.JewelConfig.earRight;
						earL[0]=$item;
						earR[0]=$item;
						$scope.$broadcast('BaseAdded');
					}else{
						var earDef = $rootScope.JewelConfig[activePart];
						$item.index=earDef.length;
						earDef.push($item);
					}
				
				break;
				case NECKLACE:
				
				break;
			}
			
		});
	
		$scope.$on('UndoLast',function(evt){
			var activePart = $rootScope.JewelConfig.activePart;
			var jwlSlug = $rootScope.JewelConfig.slugs[activePart];
			if(jwlSlug){
				
				switch($scope.JewelConfig.type){
					case EAR_PIECE:
						var earDef = $scope.JewelConfig[activePart];
						var index = earDef.length-1;
						var item = earDef[index];
						earDef.pop();
						$scope.$broadcast('PurgeItem',item);
						
					break;
					case EAR_PAIR:
					
					break;
					case NECKLACE:
					
					break;
				}
				
			}else{
				$scope.$broadcast('PreviewError','NOUNDO');
			}
		});
		
		$scope.$on('PlaceOrder',function(evt,orderSummary){
			$rootScope.JewelConfig.orderSummary = orderSummary;
			$scope.$broadcast('PreviewOrder');
		});
		$scope.$on('ErrorOrder',function(evt,code){
			
			$scope.$broadcast('PreviewError',code);
		});
		
		$scope.$on('BeginAgain',function(evt){
			initConfig();
			$scope.$broadcast('ScrollTo',UI_PANEL.Intro);
			$scope.$broadcast('ResetBuilder');
		});
		$scope.$on('BaseAdded',function(evt){
			$scope.$broadcast('ScrollTo',UI_PANEL.Attach);
		});
		$scope.$on('ApplyPromoCode',function(evt,promoCode){
			$scope.$broadcast('ComputeOrder',promoCode);
		});
		$scope.$on('SubmitOrder',function(evt,order){
			$scope.$broadcast('ProcessOrder',order);
		});
		
		$scope.$on('OrderStarted',function(){
			
		});
		
		$scope.$on('OrderProcessed',function(){
			$timeout(function(){
				$rootScope.JewelConfig.orderStatus='ORDER NOW';
				$rootScope.JewelConfig.orderSending=false;
				$scope.$emit('ScrollTo','#jde-intro');
				$scope.$broadcast('OrderAccepted');
			},3000);

		});
		
		$scope.$on('OrderFailed',function(){});

		$rootScope.setJWLCONF = function(field,value){
			$rootScope.JewelConfig[field]=value;
		}
	});
	app.controller('JewelModalController', function ($rootScope,$scope,$timeout) {
		const ERRORS = {
			NOUNDO : 'Nothing to Undo',
			NOITEM : 'Add item first',
			NOBASE : 'Select base jewelry first.',
			MAXATTA : 'Oops! You can only add up to 3 item(s).',
			INVATTA : 'Oops! Last item added can not accept an attachment. Undo last action to change.',
			
		}
		require(['bootstrap']);

		
		$scope.$on('PreviewError',function(evt,code){
			$scope.Code =  code;
			$scope.Message =  ERRORS[code];
			$('#JDEWarnModal').modal('show');
			switch(code){
				case 'NOBASE':
					$scope.$emit('ScrollTo',UI_PANEL.Base);
				break;
				case 'NOITEM':
					$scope.$emit('ScrollTo',UI_PANEL.Attach);
				break;
			}
		});
		
		$scope.$on('PreviewItem',function(evt, item){
			//console.log('Recieved in JModal',item);
			item.image = JEWEL_DIR+'preview/'+item.itemType+'/'+item.slug+JEWEL_SUFFIX;
			
			$scope.Item = item;
			
			$scope.UIToggle = {}
			
			switch(item.itemType){
				case JEWEL_BASE:
					var uiDef = {
						JewelType:JEWEL_DEFAULT,
						JewelPosition:POS_DEFAULT
					};
					$scope.UIToggle = uiDef
					$scope.UIToggle.EarRight= uiDef.JewelPosition=='earRight';
					$scope.UIToggle.EarLeft = uiDef.JewelPosition=='earLeft';
				break;
				case JEWEL_ATTACHMENT:
					var jwConf =  $rootScope.JewelConfig;
					$scope.UIToggle.JewelType = jwConf.type;
					$scope.UIToggle.JewelPosition =jwConf.activePart;
				break;
				
			}
			$('#JDEItemModal').modal('show');
			
		});
		
		$scope.$on('PreviewOrder',function(evt){
			$scope.ShowNetTotal =  $rootScope.JewelConfig.discount!=0;
			$('#JDEOrderSummary').modal('show');
			
		});
		
		$scope.$watchGroup(['UIToggle.EarRight','UIToggle.EarLeft'],function(){
			var uiT = $scope.UIToggle;
			var eR = uiT.EarRight;
			var eL = uiT.EarLeft;
			var jT = uiT.JewelType;
			var jP;
			var jConf =  $rootScope.JewelConfig;
			if(eR!=undefined && eL!=undefined)
				$scope.UIToggle.JewelType = eR&&eL?EAR_PAIR:EAR_PIECE;
			
			
			
			if(eR) jP = 'earRight';
			else if(eL) jP = 'earLeft';
			if( jT==EAR_PAIR) jP = POS_DEFAULT;
			
			
			if(jP || !jConf.type)
				$scope.UIToggle.JewelPosition = jP;
			
		});
		$scope.$watch('UIToggle.JewelType',function(){
			
			$scope.UIToggle = $scope.UIToggle||{};
			var uiT = $scope.UIToggle;
			var eR = uiT.EarRight;
			var eL = uiT.EarLeft;
			var jT = uiT.JewelType;
			switch(uiT.JewelType){
				case EAR_PAIR:
					$scope.UIToggle.EarRight = true;
					$scope.UIToggle.EarLeft = true;
				break;
				case EAR_PIECE:
					if(eR&&eL)
						$scope.UIToggle.EarRight = false;
						$scope.UIToggle.EarLeft = false;
				break;
			}
			
		});
		
		$scope.addItem =  function(item){
			if(item.itemType ==JEWEL_BASE){
				var uiT =  $scope.UIToggle;
				$rootScope.JewelConfig.activePart = uiT.JewelPosition;
				$rootScope.JewelConfig.type = uiT.JewelType;
				
			}
			$scope.$emit('AddItem',item);
			$('#JDEItemModal').modal('hide');
		}
		$scope.undoLast = function(){
			$scope.$emit('UndoLast');
		}
		$scope.applyPromoCode = function(){
			$rootScope.JewelConfig.discount = 0;
			$scope.$emit('ApplyPromoCode',$scope.PromoCode);
		}
		$rootScope.$watch('JewelConfig.discount',function(discount){
			$scope.ShowNetTotal = discount>0;
		});
		$scope.submitOrder = function(){
			var name =$scope.Name;
			var email = $scope.Email;
			var address = $scope.Address1
				address += ';'+$scope.Address2;
			var promoCode = $scope.PromoCode;
			var grossTotal = $rootScope.JewelConfig.grossTotal;
			var netTotal = $rootScope.JewelConfig.netTotal;
			var orderSummary = $rootScope.JewelConfig.orderSummary;
				
			var data = {
					name:name,
					email:email,
					address:address,
					promoCode:promoCode,
					grossTotal:grossTotal,
					netTotal:netTotal,
					orderSummary:orderSummary
			};
			$scope.$emit('SubmitOrder',data);
		}
		$scope.$on('OrderAccepted',function(){
			$('#JDEOrderSummary').modal('hide');

		});
	});
});