define(['app'],function(app){
	const PENDANTS = {
		1:{name:'Celine', slug:'celine', price:898,width:67,height:89,altHeight:73,type:'R'},
		2:{name:'Ciara', slug:'ciara', price:728,width:45,height:188,altHeight:168,type:'E'},
		3:{name:'Rachel', slug:'rachel',  price:928,width:91,height:251,altHeight:233,type:'E'},
		4:{name:'Grace', slug:'attachment8', price:1188,width:100,height:156,altHeight:139,type:'R'},
		5:{name:'Diana', slug:'diana',  price:708,width:55,height:229,altHeight:213,type:'R'},
		6:{name:'Emma', slug:'emma',  price:1198,width:155,height:225,altHeight:207,type:'R'},
		7:{name:'Kelly', slug:'kelly',  price:1158,width:93,height:242,altHeight:224,type:'R'},
		8:{name:'Sam', slug:'sam',  price:1293,width:66,height:192,altHeight:173,type:'E'},
		9:{name:'Martine', slug:'martine',  price:988,width:119,height:229,altHeight:214,type:'R'},
		10:{name:'Mari', slug:'mari',  price:2088,width:54,height:68,altHeight:68,type:'R'}
	};
	const ROW_COUNT = 2;
	const OPTIONS = { "cellAlign": "left", "contain": true , "pageDots": false };
	
	app.controller('JewelAttachmentController', function ($scope,$timeout) {
		
		var UIPendants  =[];
		var UIMobilePendants  =[];
		var uiIndex = -1;
		for(var id in PENDANTS){
			var index =  id-1;
			var item =  PENDANTS[id];
			if(index%ROW_COUNT==0){
				UIPendants.push([]);
				uiIndex++;
			}
			item.id = id;
			UIPendants[uiIndex].push(item);
			UIMobilePendants.push(item);
		}
		$scope.UIPieces = UIPendants;
		$scope.UIMobilePieces = UIMobilePendants;
		
		$timeout(function(){
			$('.main-carousel,.mini-carousel').flickity(OPTIONS);
		},100);
		
		$scope.viewItem = function(item){
			item.itemType = 'atta';
			$scope.$emit('ViewItem',item);
		};
		
	});
	
});