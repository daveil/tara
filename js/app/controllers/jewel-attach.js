define(['app'],function(app){
	const PENDANTS = {
		1:{name:'Celine', slug:'celine', price:898,width:67,height:89,altHeight:73,type:'R'},
		2:{name:'Ciara', slug:'ciara', price:728,width:45,height:188,altHeight:168,type:'E'},
		3:{name:'Rachael', slug:'rachel',  price:928,width:91,height:251,altHeight:233,type:'E'},
		4:{name:'Grace', slug:'attachment8', price:1188,width:100,height:156,altHeight:139,type:'R'},
		5:{name:'Diana', slug:'diana',  price:708,width:55,height:229,altHeight:213,type:'R'},
		6:{name:'Emma', slug:'emma',  price:1198,width:155,height:225,altHeight:207,type:'R'},
		7:{name:'Kelly', slug:'kelly',  price:1158,width:93,height:242,altHeight:224,type:'R'},
		8:{name:'Sam', slug:'sam',  price:1293,width:66,height:192,altHeight:173,type:'E'},
		9:{name:'Martine', slug:'martine',  price:988,width:119,height:229,altHeight:214,type:'R'},
		10:{name:'Mari', slug:'mari',  price:2088,width:54,height:68,altHeight:68,type:'R'},
		21:{name:'Mari Plain', slug:'mari-plain',  price:628,width:62,height:68,altHeight:68,type:'R'},
		11:{name:'Mira', slug:'a1',  price:812,width:119,height:128,altHeight:116,type:'R'},
		12:{name:'Sienna', slug:'a2',  price:658,width:119,height:143,altHeight:132,type:'R'},
		13:{name:'Hari', slug:'a3',  price:938,width:119,height:221,altHeight:210,type:'R'},
		14:{name:'Kaya', slug:'a4',  price:1718,width:119,height:126,altHeight:114,type:'R'},
		15:{name:'Celeste', slug:'a10',  price:998,width:119,height:157,altHeight:145,type:'R'},
		16:{name:'Jasmine', slug:'a11',  price:2008,width:119,height:392,altHeight:380,type:'R'},
		17:{name:'Jasmine', slug:'jasmine-sm',  price:2008,width:119,height:306,altHeight:293,type:'R'},
		18:{name:'Stella', slug:'stella',  price:2828,width:119,height:221,altHeight:208,type:'R'},
		19:{name:'Vivian Rose Gold', slug:'vivianrg',  price:318,width:127,height:214,altHeight:189,type:'R'},
		20:{name:'Vivian White Gold', slug:'vivianwg',  price:318,width:119,height:201,altHeight:189,type:'R'},
		22:{name:'Anya', slug:'anya', price:2778,width:41,height:43,altHeight:43, type:'R'}
		//20:{name:'Alex', slug:'alex',  price:0,width:862,height:862,altHeight:189,type:'R'},
	};
	const ROW_COUNT = 2;
	const OPTIONS = { "cellAlign": "left", "contain": true , "pageDots": false };
	const MAX_ATTCH = 3;
	const EAR_DEFAULT = 'earRight';
	
	app.controller('JewelAttachmentController', function ($rootScope, $scope,$timeout) {
		var $carousel;
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
			$carousel = $('.main-carousel,.mini-carousel').flickity(OPTIONS);
		},100);
		
		$scope.$on('JewelTypeSelected',function(evt){
			$timeout(function(){
				$carousel.flickity('resize');
				$carousel.flickity('reposition');
			},250);
			
		});
		$scope.viewItem = function(item){
			item.itemType = 'atta';
			var activePart = $rootScope.JewelConfig.activePart;
			var jwlSlug = $rootScope.JewelConfig.slugs[activePart];
			
			if(!jwlSlug)
				$scope.$emit('AttachError','NOBASE');
			else if(jwlSlug.length==MAX_ATTCH+1)
				$scope.$emit('AttachError','MAXATTA');
			else if(jwlSlug.endsWith('E'))
				$scope.$emit('AttachError','INVATTA');
			else
				$scope.$emit('ViewItem',item);
		};
		
	});
	
});