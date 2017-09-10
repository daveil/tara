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
		initConfig();
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
		$scope.$on('BeginAgain',function(evt){
			initConfig();
			$scope.$broadcast('ResetBuilder');
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