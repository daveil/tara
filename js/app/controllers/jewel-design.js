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
		$rootScope.JewelConfig = {
				type:EAR_PIECE,
				hasBase:false,
				earRight:[],
				earLeft:[],
				neck:[],
				total:0,
		};
		
		$scope.$on('ViewItem',function(evt,item){
			//console.log('Recieved in JDsgr',item);
			$scope.$broadcast('PreviewItem',item);
			
		});
		
		$scope.$on('AddItem',function(evt,item){
			$scope.$broadcast('AppendItem',item);
			
		});
		$scope.$on('AppendItem',function(evt,item){
			var $item =  angular.copy(item);
			if($item.itemType==JEWEL_BASE)
				$scope.JewelConfig.hasBase = true;
			switch($scope.JewelConfig.type){
				case EAR_PIECE:
					var earDef = $scope.JewelConfig[EAR_DEFAULT];
					if($item.itemType==JEWEL_BASE){
						$scope.JewelConfig.hasBase = true;
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
	});
	app.controller('JewelModalController', function ($scope,$timeout) {
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
	});
});