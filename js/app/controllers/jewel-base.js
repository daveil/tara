define(['app','f-ldr'],function(app,fldr){
	const BASES = {
		1:{id: 1, name:'Mari', slug:'mari', price:812,width:160,height:156, type:'B', group:'E'},
		3:{id:3, name:'Kimberly (with Diamond)', slug:'kimberly', price:588,width:160,height:156,type:'B', soldAsPair:true, group:'E'},
		2:{id: 2, name:'Blake', slug:'blake', price:758,width:160,height:156, type:'B', group:'E'},
		4:{id: 4, name:'Choker', slug:'chocker', price:2288,width:1051,height:257, type:'B', soldAsPiece:true,group:'N'},
		5:{id: 5, name:'Heart 3', slug:'heart3', price:2288,width:160,height:156, type:'B',group:'E'},
		6:{id: 6, name:'6', slug:'6', price:2288,width:160,height:156, type:'B',group:'E'},
		7:{id: 7, name:'Astrid', slug:'astrid', price:2288,width:160,height:156, type:'B',group:'E'},
		8:{id: 8, name:'7', slug:'7', price:2288,width:160,height:156, type:'B',group:'E'},
		9:{id: 9, name:'9', slug:'9', price:2288,width:160,height:156, type:'B',group:'E'},
		10:{id: 10, name:'Heart V', slug:'heartv', price:2288,width:160,height:156, type:'B',group:'E'},
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