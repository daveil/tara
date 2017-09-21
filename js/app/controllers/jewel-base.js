define(['app','f-ldr'],function(app,fldr){
	const BASES = {
		1:{id: 1, name:'Mari', slug:'mari', price:2088,width:160,height:156, type:'B', group:'E'},
		3:{id:3, name:'Kimberly (with Diamond)', slug:'kimberly', price:588,width:160,height:156,type:'B', soldAsPair:true, group:'E'},
		2:{id: 2, name:'Blake', slug:'blake', price:758,width:160,height:156, type:'B', group:'E'},
		4:{id: 4, name:'Choker', slug:'chocker', price:758,width:1051,height:257, type:'B', soldAsPiece:true,group:'N'}
	};
	const OPTIONS = { "cellAlign": "center", "contain": true , "pageDots": false };
	
	
	app.controller('JewelBaseController', function ($rootScope,$scope,$timeout) {
		var $carousel;
		$scope.UIBases = {E:[],N:[]}
		for(var i in BASES){
			var b = BASES[i];
			var group = b.group;
			$scope.UIBases[group].push(b);
		}
		
		$timeout(function(){
			$carousel = $('#jde-select .vertical>.grid-container').flickity(OPTIONS);
		},100);
		
		$scope.$on('JewelTypeSelected',function(evt){
			$timeout(function(){
				$carousel.flickity('resize');
				$carousel.flickity('reposition');
			},250);
			
		});
		$scope.viewItem = function(item){
			var activePart = $rootScope.JewelConfig.activePart;
			var isN2N = activePart=='neck' && item.group!='N';
			var isE2E =  activePart!='neck' && item.group=='N';
			if(!activePart){
				$scope.$emit('BaseError','NOTYPE');
			}else if(isN2N || isE2E){
				$scope.$emit('BaseError','INVABASE');
			}else{
				item.itemType = 'base';
				$scope.$emit('ViewItem',item);
			}
		};
		
  });
});