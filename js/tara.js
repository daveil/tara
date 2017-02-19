
$(document).ready(function(){
	const VIEW_HEIGHT = 1.25;
	const WIDTH  = 796;
	const HEIGHT = 702/VIEW_HEIGHT;
	const PENDANTS = [
				{'path':'pendant-a.png','width':65,'height':396,type:'A'},
				{'path':'pendant-b.png','width':65,'height':396,type:'A'},
				{'path':'pendant-c.png','width':249,'height':442,type:'B'}
			];
	const app = new PIXI.Application(WIDTH, HEIGHT, {backgroundColor : 0xffffff});
	var lastPosition=143;
	var pendantSprites = [];
	buildBase(0,-144);
	addUIControl();
	
	function buildBase(x,y){
		$('body>div.container').append(app.view);
		addSprite('body.jpg',0,0);
		addSprite('Base-A.png',x,y,2700,1018,0.45);
	}
	function addUIControl(){
		var pendants = ['a','b','c'];
		$('#add-random-pendant').click(function(){
			addPendant();
		});
		$('.add-pendant').click(function(){
			var pendant =  $(this).data('pendant');
			var index = pendants.indexOf(pendant);
			addPendant(index);
		});
		$('#undo-pendant').click(function(){
			var i = pendantSprites.length-1;
			if(i>=0)
				removePendant(i);
			else
				lastPosition = 143;
		});
		$('#clear-pendants').click(function(){
			if(pendantSprites.length)
				for(var i in pendantSprites){
					app.stage.removeChild(pendantSprites[i].sprite);
				}
			pendantSprites=[];
			lastPosition = 143;
		});
	}
	function addPendant(index){
		if(index==undefined){
			var min = 0 ;
			var max = PENDANTS.length-1;
			index = Math.round(Math.random()* (max - min) + min);
		}
		if(lastPosition<143) lastPosition = 143;
		var pendant = PENDANTS[index];
		var scale = 0.3;
		var sprite = addSprite(pendant.path,0,lastPosition,pendant.width,pendant.height,scale);
		var pendant_height = (pendant.height*scale);
		pendantSprites.push({height:pendant_height,sprite:sprite});
		if(pendant.type=='A')
			lastPosition = lastPosition+pendant_height;
		
	}
	function removePendant(index){
		var pendant = pendantSprites[index];
		app.stage.removeChild(pendant.sprite);
		lastPosition = lastPosition-pendant.height;
		pendantSprites.pop();
		
	}
	function addSprite(img,x,y,width,height,scale){
		var path = 'img/'+img;
		var scale =  scale||1;
		var sprite =  PIXI.Sprite.fromImage(path);
			sprite.anchor.set(0.5);
			sprite.x=x+(WIDTH/2);
			sprite.y=y+(HEIGHT/2);
			sprite.width=width*scale||WIDTH;
			sprite.height=height*scale||HEIGHT*VIEW_HEIGHT;
		app.stage.addChild(sprite);
		return sprite;
	}
	
});