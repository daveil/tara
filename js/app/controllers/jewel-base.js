define(['app','f-ldr'],function(app,fldr){
	const BASES = {
		1:{id: 1, name:'Mari', slug:'mari', price:2088,width:160,height:156, type:'B', jewelType:'E'},
		3:{id:3, name:'Kimberly (with Diamond)', slug:'kimberly', price:588,width:160,height:156,type:'B', soldAsPair:true, jewelType:'E'},
		2:{id: 2, name:'Blake', slug:'blake', price:758,width:160,height:156, type:'B', jewelType:'E'},
		4:{id: 4, name:'Choker', slug:'chocker', price:758,width:1051,height:253, type:'B', soldAsPiece:true,jewelType:'N'}
	};
	const OPTIONS = { "cellAlign": "center", "contain": true , "pageDots": false };
	
	
	app.controller('JewelBaseController', function ($scope,$timeout) {
		$scope.UIBases =  BASES;
		$timeout(function(){
			$('#jde-select .vertical>.grid-container').flickity(OPTIONS);
		},100);
		
		$scope.viewItem = function(item){
			item.itemType = 'base';
			$scope.$emit('ViewItem',item);
		};
		
  });
});