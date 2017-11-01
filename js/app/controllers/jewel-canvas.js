define(['app'],function(app){
	
	const BG_SQ = 1650;
	const JEWEL_DIR ='img/jewel/';
	const JEWEL_PREFIX = '00-';
	const JEWEL_SUFFIX = '.png';
	const JEWEL_BASE = 'base';
	const JEWEL_ATTACHMENT = 'atta';
	const EAR_PIECE =  'EPC';
	const EAR_PAIR =  'EPR';
	const NECKLACE =  'NCK';
	const JEWEL_SCALE = 1;
	const BASE_SCALE = 1;
	const BASE_X = 0;
	const BASE_Y = -350;
	const VIEW_HEIGHT = 1;
	const WIDTH  = 1082
	const HEIGHT = 702;
	const LOCK_OFFSET = 15;
	const EAR_START_Y = -280;
	const NECK_START_Y = -107;
	const TDY =  new Date();
	const CACHE_BRKR = '?v='+TDY.getMonth()+'.'+TDY.getDate();

	var  APP;
	var ATTA_Y;
	var baseSprite,baseSelected;
	var pendantSprites = [];
	var lastPosition;
	var lastPendantType;
		
	app.controller('JewelCanvasController', function ($rootScope,$scope,$timeout) {
		var currSide , prevSide;
		require(['pixi'],function(pixi){
			APP =new PIXI.Application(WIDTH, HEIGHT, {backgroundColor : 0xffffff});
			APP.renderer.plugins.interaction.destroy();
			$.get('css/jewel.tara.css',function(data){
				var style =  data.replace(/\.\.\//g,"");
				$("body").append("<style id='jewels'>"+style+"</style>");
			});
			
		});
		$scope.$on('JewelTypeSelected',function(){
			var jwConf =  $rootScope.JewelConfig;
			switch(jwConf.type){
				case EAR_PIECE: case EAR_PAIR:
					ATTA_Y =  EAR_START_Y;
				break;
				case NECKLACE:
					ATTA_Y = NECK_START_Y;
				break;

			}
		});
		$scope.$on('ActivePartSelected',function(){
			var jwConf = $rootScope.JewelConfig;
			var path;
			switch(jwConf.activePart){
				case 'earLeft':
					path  ='img/model/blank-L-side-view.jpg';
				break;
				case 'earRight':
					path  ='img/model/blank-R-side-view.jpg';
				break;
				case 'neck':
					path  ='img/model/blank-front-view.png';
				break;
			}
			currSide = jwConf.activePart;
			initCanvas(path);
			revealCanvas(1,700);
			
		});
		
		$scope.$on('ReDrawJewelry',function(evt){
			$scope.$broadcast('ActivePartSelected');
			$timeout(function(){
				var jwConf = $rootScope.JewelConfig;
				var aPrt = jwConf.activePart;
				if(jwConf[aPrt].length){
					var items = jwConf[aPrt];
					for(var i in items){
						var item =  items[i];
						drawItem(item);
					}
				}
				
			},800);
				
			revealCanvas(1,800);
			
		});
		
		
		
		$scope.$on('AppendItem',function(evt,item){
			//console.log('Draw Sprite',item);
			var delay =  item.itemType==JEWEL_BASE&&currSide!=prevSide?800:0;
			
			$timeout(function(){
				drawItem(item);
			},delay)
			
			
		});
		$scope.$on('PurgeItem',function(evt,item){
			//console.log('Remove Sprite',item);
			switch(item.itemType){
				case JEWEL_BASE:
					removeBase(baseSprite);
				break;
				case JEWEL_ATTACHMENT:
					removePendant(item.index-1);
				break;
			}
			
		});
		
		$scope.$on('ResetBuilder',function(evt){
			resetBuilder();
		});
		function initCanvas(path){
			//if(currSide!=prevSide)
				buildBase(path);
			
			
		}
		function buildBase(path){
			$('#jde-canvas .canvas-wrapper').prepend(APP.view);
			revealCanvas(0,0);
			$timeout(function(){
				resetBuilder();
				addSprite(path,0,0,WIDTH,HEIGHT,1,1);
			},600);
			
		}
		
		function revealCanvas(show,delay){
			$timeout(function(){
					$('#jde-canvas .canvas-wrapper canvas').css('opacity',show);
					prevSide = currSide;
				},delay);
		}
		function drawItem(item){
			switch(item.itemType){
				case JEWEL_BASE:
					addBase(item);
					
				break;
				case JEWEL_ATTACHMENT:
					addPendant(item);
				break;
			}
		}
		function addSprite(img,x,y,width,height,scale,opacity,anchor){
			var path = img+CACHE_BRKR;
			var scale =  scale||1;
			var opacity =  opacity || 1;
			var anchor = anchor || {x:0.5,y:0.5};
			var drawDelay = drawDelay || 0;
			var sprite =  PIXI.Sprite.fromImage(path);
				sprite.anchor.set(anchor.x,anchor.y);
				sprite.x=x+(WIDTH/2);
				sprite.y=y+(HEIGHT/2);
				sprite.width=width*scale||WIDTH;
				sprite.height=height*scale||HEIGHT*VIEW_HEIGHT;
				sprite.alpha=opacity;
			APP.stage.addChild(sprite);
			return sprite;
		}
		
		function removeSprite(sprite){
			APP.stage.removeChild(sprite);
		}

		function addBase(item){
			var itemCode =  item.id;
			var base = item;
			var path = JEWEL_DIR+'/sprite/1x/base/'+base.slug+'.png';
			if(baseSprite)
				removeBase(baseSprite);
			base.itemCode = itemCode;

			var baseX = BASE_X;
			var baseY =  BASE_Y;
			
			if(item.group=="N") {
				baseY = baseY - 5;
				if(item.startBase)  ATTA_Y =  item.startBase;
				else ATTA_Y = NECK_START_Y;
			}
			baseSprite = addSprite(path,baseX,baseY,base.width,base.height,BASE_SCALE,1,{x:0.5,y:0});
			baseSelected = base;
		}
		
		function removeBase(sprite){
			removeSprite(sprite);
		}
		
		function addPendant(item){
			var itemCode = item.id;
			var pendant = item;
			var scale = JEWEL_SCALE;
			var anchor = {x:0.5,y:0};
			var path  = JEWEL_DIR+'sprite/1x/atta/';		
			var pendant_height = pendant.height;
			var jwConf =  $rootScope.JewelConfig;
			
			if(lastPosition<ATTA_Y) lastPosition = ATTA_Y;

			if(jwConf.type==EAR_PIECE||jwConf.type==EAR_PAIR){
				if(!pendantSprites.length){
					path +=JEWEL_PREFIX;
					pendant_height = pendant.altHeight;
				}	
			}	
			path += pendant.slug+JEWEL_SUFFIX;
			var sprite = addSprite(path,0,lastPosition,pendant.width,pendant_height,scale,1,anchor);
			var pHeight =  Math.round((pendant_height-LOCK_OFFSET)*scale,2);
			pendantSprites.push({height:pHeight,sprite:sprite,price:pendant.price,name:pendant.name,itemCode:itemCode});
			lastPosition = lastPosition+pHeight;
		}
		
		function removePendant(index){
			var pendant = pendantSprites[index];
			removeSprite(pendant.sprite);
			lastPosition = lastPosition-pendant.height;
			pendantSprites.pop();
		}
		
		function resetBuilder(){
			if(baseSprite)
				APP.stage.removeChild(baseSprite);
			if(pendantSprites.length)
				for(var i in pendantSprites){
					APP.stage.removeChild(pendantSprites[i].sprite);
				}
			baseSelected = null;
			baseSprite = null;
			pendantSprites=[];
			lastPosition = ATTA_Y;
		}
	});
	
});