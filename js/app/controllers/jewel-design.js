define(['app','jdeBase','jdeAtch','jdeCnvs','jdeTran'],function(app){
	
	const JEWEL_BASE = 'base';
	const JEWEL_ATTACHMENT = 'atta';
	const JEWEL_DIR ='img/jewel/';
	const JEWEL_PREFIX = '00-';
	const JEWEL_SUFFIX = '.png';
	const EAR_PIECE =  'EPC';
	const EAR_PAIR =  'EPR';
	const EAR_DEFAULT = 'earRight';
	const NECKLACE =  'NCK';
	const SCROLL_SPEED = 800;
	const THRESHOLD2FADE =  $(window).height() * 0.35;
	
	app.controller('JewelDesignerController', function ($rootScope,$scope,$timeout) {
		require(['jquery-bridget','flickity'],function(jqueryBridget,flickity){
			jqueryBridget('flickity',flickity);
			
		});
		function initConfig(){
			$rootScope.JewelConfig = {
				type:EAR_PIECE,
				slugs:{},
				earRight:[],
				earLeft:[],
				neck:[],
				total:0,
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
			setTimeout(function(){scrollTo('#jde-intro');},SCROLL_SPEED/2);
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
			
			switch($scope.JewelConfig.type){
				case EAR_PIECE:
					var earDef = $scope.JewelConfig[EAR_DEFAULT];
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
				
				break;
				case NECKLACE:
				
				break;
			}
			
		});
	
		$scope.$on('UndoLast',function(evt){
			var jwlSlug = $rootScope.JewelConfig.slugs[EAR_DEFAULT];
			if(jwlSlug){
				
				switch($scope.JewelConfig.type){
					case EAR_PIECE:
						var earDef = $scope.JewelConfig[EAR_DEFAULT];
						var index = earDef.length-1;
						var item = earDef[index];
						$scope.$broadcast('PurgeItem',item);
						earDef.pop();
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
		$scope.$on('BeginAgain',function(evt){
			initConfig();
			$scope.$broadcast('ScrollTo','#jde-intro');
			$scope.$broadcast('ResetBuilder');
		});
		$scope.$on('BaseAdded',function(evt){
			$scope.$broadcast('ScrollTo','#jde-build');
		});
	});
	app.controller('JewelModalController', function ($scope,$timeout) {
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
		});
		
		$scope.$on('PreviewItem',function(evt, item){
			//console.log('Recieved in JModal',item);
			item.image = JEWEL_DIR+'preview/'+item.itemType+'/'+item.slug+JEWEL_SUFFIX;
			
			$scope.Item = item;
			$('#JDEItemModal').modal('show');
			
		});
		
		$scope.addItem =  function(item){
			$scope.$emit('AddItem',item);
			$('#JDEItemModal').modal('hide');
		}
		$scope.undoLast = function(){
			$scope.$emit('UndoLast');
		}
	});
});