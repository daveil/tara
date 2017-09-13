define(['app'],function(app){
	
	const BG_SQ = 1650;
	const JEWEL_DIR ='img/jewel/';
	const JEWEL_PREFIX = '00-';
	const JEWEL_SUFFIX = '.png';
	const JEWEL_BASE = 'base';
	const JEWEL_ATTACHMENT = 'atta';
	const JEWEL_SCALE = 1;
	const BASE_SCALE = 1;
	const BASE_X = 0;
	const BASE_Y = -350;
	const VIEW_HEIGHT = 1;
	const WIDTH  = 1082
	const HEIGHT = 702;
	const ATTA_Y = -280;
	const LOCK_OFFSET = 15;
	var  APP;
	
	var baseSprite,baseSelected;
	var pendantSprites = [];
	var lastPosition=ATTA_Y;
	var lastPendantType;
		
	app.controller('JewelCanvasController', function ($rootScope,$scope,$timeout) {
		require(['pixi'],function(pixi){
			APP =new PIXI.Application(WIDTH, HEIGHT, {backgroundColor : 0xffffff});
			APP.renderer.plugins.interaction.destroy();
			$.get('css/jewel.tara.css',function(data){
				var style =  data.replace(/\.\.\//g,"");
				$("body").append("<style id='jewels'>"+style+"</style>");
			});
			
		});
		
		$scope.$on('ActivePartSelected',function(){
			buildBase();
		});
		
		
		
		
		$scope.$on('AppendItem',function(evt,item){
			console.log('Draw Sprite',item);
			switch(item.itemType){
				case JEWEL_BASE:
					addBase(item);
				break;
				case JEWEL_ATTACHMENT:
					addPendant(item);
				break;
			}
			
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
		
		function buildBase(){
			$('#jde-canvas .canvas-wrapper').prepend(APP.view);
			addSprite('img/model/blank-side-view.jpg',0,0,WIDTH,HEIGHT,1,1);
		}
		
		function addSprite(img,x,y,width,height,scale,opacity,anchor){
			var path = img;
			var scale =  scale||1;
			var opacity =  opacity || 1;
			var anchor = anchor || {x:0.5,y:0.5};
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
			baseSprite = addSprite(path,BASE_X,BASE_Y,base.width,base.height,BASE_SCALE,1,{x:0.5,y:0});
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
			
			if(lastPosition<ATTA_Y) lastPosition = ATTA_Y;
		
			if(!pendantSprites.length){
				path +=JEWEL_PREFIX;
				pendant_height = pendant.altHeight;
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
		
		function resetBuilder(href){
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