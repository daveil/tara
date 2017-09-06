define(['app'],function(app){
	const BASES = {
		1:{id: 1, name:'Mari', slug:'mari', price:2088,width:160,height:156, type:'B'},
		3:{id:3, name:'Kimberly', slug:'kimberly', price:288,width:160,height:156,type:'B'},
		2:{id: 2, name:'Blake', slug:'blake', price:758,width:160,height:156, type:'B'}
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