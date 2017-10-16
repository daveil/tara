define(['app','f-ldr'],function(app,fldr){
	const TYPES = {
		1:{id: 1, name:'Earring', slug:'earringsthumbv2', type:'E'},
		2:{id: 2, name:'Necklace', slug:'necklacethumb', type:'N'},
	};
	const OPTIONS = { "cellAlign": "center", "contain": true , "pageDots": false };
	
	
	app.controller('JewelTypeController', function ($scope,$timeout) {
		$scope.UITypes =  TYPES;
		$timeout(function(){
			$('#jde-start .vertical>.grid-container').flickity(OPTIONS);
		},100);
		
		$scope.selectType = function(item){
			$scope.$emit('SetJewelType',item);
		};
		
  });
});