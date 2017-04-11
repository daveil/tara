$(document).ready(function(){
	const BG_SQ = 1650;
	const JEWEL_SCALE = 0.3;
	const BASE_SCALE = 0.65;
	const VIEW_HEIGHT = 1;
	const WIDTH  = BG_SQ;
	const HEIGHT = BG_SQ/VIEW_HEIGHT;
	const PENDANTS = {
		1:{name:'Triangle Object', path:'img/triangle.png',price:25,width:200,height:220,type:'A'},
		2:{name:'Circle Object', path:'img/circle.png', price:20,width:200,height:220,type:'A'},
		3:{name:'Square Object', path:'img/square.png', price:15,width:200,height:220,type:'A'}
	};
	const APP = new PIXI.Application(WIDTH, HEIGHT, {backgroundColor : 0xffffff});
	const MAX_ATTCH = 3;
	const BASE_Y = 55;
	var pendantSprites = [];
	var lastPosition=BASE_Y;
	var orderPlaced = false;
	buildBase(0,-300);
	function buildBase(x,y){
		$('#jde-canvas').prepend(APP.view);
		addSprite('img/bgtara-2.jpg',0,0,WIDTH,HEIGHT,1,0.2);
		addSprite('img/Base-A.png',x,y,2700,1018,BASE_SCALE);
		computeTotal();
	}
	function addSprite(img,x,y,width,height,scale,opacity){
		var path = img;
		var scale =  scale||1;
		var opacity =  opacity || 1;
		var sprite =  PIXI.Sprite.fromImage(path);
			sprite.anchor.set(0.5);
			sprite.x=x+(WIDTH/2);
			sprite.y=y+(HEIGHT/2);
			sprite.width=width*scale||WIDTH;
			sprite.height=height*scale||HEIGHT*VIEW_HEIGHT;
			sprite.alpha=opacity;
		APP.stage.addChild(sprite);
		return sprite;
	}
	function addPendant(itemCode){
		if(itemCode==undefined){
			var min = 0 ;
			var max = PENDANTS.length-1;
			itemCode = Math.round(Math.random()* (max - min) + min)+1;
		}
		if(lastPosition<BASE_Y) lastPosition = BASE_Y;
		var pendant = PENDANTS[itemCode];
		var scale = JEWEL_SCALE;
		var sprite = addSprite(pendant.path,0,lastPosition,pendant.width,pendant.height,scale);
		var pendant_height = (pendant.height*scale);
		pendantSprites.push({height:pendant_height,sprite:sprite,price:pendant.price});
		if(pendant.type=='A')
			lastPosition = lastPosition+pendant_height;
		computeTotal();
	}
	function removePendant(index){
		var pendant = pendantSprites[index];
		APP.stage.removeChild(pendant.sprite);
		lastPosition = lastPosition-pendant.height;
		pendantSprites.pop();
		computeTotal();
	}
	function computeTotal(){
		var total = 0;
		for(var i in pendantSprites){
			var pendant = pendantSprites[i];
			total += pendant.price;
		}
		$('#jde-total span').text(total);
		$('#jde-undo,#jde-reset,#jde-place-order').show();
		$('#jde-place-order-link').hide();
		if(pendantSprites.length==0){
			$('#jde-place-order').attr('data-target','#JDEWarnModal');
			$('#jde-build .jde-btn').attr('data-target','#JDEItemModal');
			if(!orderPlaced)
				$('#JDEWarnModal .modal-body p').text('Add item first!');
		}else{
			$('#jde-place-order').attr('data-target','#JDEPlaceOrderModal');
			if(pendantSprites.length>=MAX_ATTCH&&!orderPlaced){
				$('#jde-build .jde-btn').attr('data-target','#JDEWarnModal');
				$('#JDEWarnModal .modal-body p').text('Oops! You can only add up to '+MAX_ATTCH+' item(s).');
			}else{
				$('#jde-place-order').hide();
				$('#jde-place-order-link').show();
				$('#jde-build .jde-btn').attr('data-target','#JDEItemModal');
				$('#JDEWarnModal .modal-body p').text('Order placement successful. Thank you!');
			}
		}
	}
	function resetBuilder(href){
		if(pendantSprites.length)
			for(var i in pendantSprites){
				APP.stage.removeChild(pendantSprites[i].sprite);
			}
		pendantSprites=[];
		lastPosition = BASE_Y;
		orderPlaced=false;
		computeTotal();
		window.location.href=href||'#jde-select';
	}
	$('#JDEWarnModal .modal-body span').text(MAX_ATTCH);
	$('#jde-build .jde-ui-item').click(function(){
		if(!orderPlaced){
			if(!$(this).hasClass('active'))
				$('#jde-build .jde-ui-item.active').removeClass('active');
			$(this).toggleClass('active');
		}
	});
	$('#JDEItemModal').on('show.bs.modal', function (event) {
		 var button = $(event.relatedTarget)
		 var itemCode =  button.data('item-code');
		 var item = PENDANTS[itemCode];
		 var modal = $(this);
		 modal.find('.jde-name').text(item.name);
		 modal.find('.jde-image').attr('src',item.path);
		 modal.find('.jde-price span').text(item.price);
		 modal.find('.jde-btn-confirm').data('item-code',itemCode);
	});
	$('#JDEWarnModal').on('show.bs.modal', function (event) {
		if(orderPlaced){
			resetBuilder();
		}
	}).on('hidden.bs.modal', function (event) {
		if(orderPlaced){
			orderPlaced =false;
			$('#JDEWarnModal .modal-body p').text('Add item first!');
		}
	});
	$('.jde-btn-confirm').click(function(){
		var itemCode =  $(this).data('item-code');
		addPendant(itemCode);
		$('#JDEItemModal').modal('hide');
	});
	$('#jde-undo').click(function(){
		var i = pendantSprites.length-1;
		if(i>=0)
			removePendant(i);
		else
			lastPosition = BASE_Y;
	});
	$('#jde-reset').click(function(){
		resetBuilder();
	});
	$('#jde-submit-order').click(function(){
		orderPlaced = true;
		resetBuilder('#jde-intro');
	});
	$('#jde-place-order-link').click(function(){
		orderPlaced = true;
		$('#jde-undo,#jde-place-order,#jde-place-order-link,#jde-reset').hide();
	});
});
