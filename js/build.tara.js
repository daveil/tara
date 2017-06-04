$(document).ready(function(){
	const THRESHOLD2FADE =  $(window).height() * 0.35;
	const SCROLL_SPEED = 800;
	const BG_SQ = 1650;
	const JEWEL_DIR ='img/jewel/';
	const JEWEL_PREFIX = '00-';
	const JEWEL_SUFFIX = '.png';
	const JEWEL_SCALE = 0.3;
	const BASE_SCALE = 0.3;
	const VIEW_HEIGHT = 1;
	const WIDTH  = 1082;
	const HEIGHT = 702;
	const MAX_THUMBS = 12;
	const PENDANTS = {
		1:{name:'Celine', slug:'celine', price:25,width:487,height:647,type:'A'},
		2:{name:'Ciara', slug:'ciara',  price:20,width:112,height:702,type:'A'},
		3:{name:'Rachel', slug:'rachel',  price:15,width:179,height:702,type:'A'}
	};
	const APP = new PIXI.Application(WIDTH, HEIGHT, {backgroundColor : 0xffffff});
	const MAX_ATTCH = 3;
	const BASE_Y = -190;
	var pendantSprites = [];
	var lastPosition=BASE_Y;
	var orderPlaced = false;
	initAttachmentGrid();
	buildBase(0,-300);
	function buildBase(x,y){
		APP.renderer.plugins.interaction.destroy();
		$('#jde-canvas').prepend(APP.view);
		addSprite('img/model/blank-side-view.jpg',0,0,WIDTH,HEIGHT,1,1);
		addSprite('img/jewel/base-kimberly.png',x,y,177,200,BASE_SCALE);
		addPendant(2);
		addPendant(3);
		computeTotal();
		
	}
	function initAttachmentGrid(){
		var $carousel = $('.main-carousel').flickity(
							{ "cellAlign": "left", "contain": true , "pageDots": false }
						);
		var $cell = $("<div class='carousel-cell'/>");
		var $item = $("<div class='grid-item'  ><div class='item'/></div>");         
		var $c = null;
		var ctr = 0;
		for(var id in PENDANTS){
			var p_obj = PENDANTS[id];
			var $i = $item.clone();
				$i.attr('id',id);
				$i.attr('data-toggle','modal');
				$i.attr('data-target','#JDEItemModal');
				$i.attr('data-item-code',id);
				$i.addClass('white');
				$i.find('.item').addClass(p_obj.slug);
				
			if(!$c) $c =  $cell.clone();
			
			$c.append($i);
			if(id%2==0){
				$carousel.flickity( 'append', $c );
				$c = null;
			}	
			ctr++;
		}
		
		//Fill buffer with MAX_THUMBS
		if(ctr<MAX_THUMBS)
			for(var i = ctr;i<=MAX_THUMBS;i){
				i++;
				var $i = $item.clone();
					$i.find('.item').text(i);
				if(!$c) $c =  $cell.clone();
				$c.append($i);
				if(i%2==0){
					$carousel.flickity( 'append', $c );
					$c = null;
				}
			}
	
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
		var scale = pendant.scale||JEWEL_SCALE;
		var path  = JEWEL_DIR;		
		if(!pendantSprites.length)
			path +=JEWEL_PREFIX;
		path += pendant.slug+JEWEL_SUFFIX;
		var sprite = addSprite(path,0,lastPosition,pendant.width,pendant.height,scale);
		var pendant_height = (pendant.height*scale);
		pendantSprites.push({height:pendant_height,sprite:sprite,price:pendant.price,name:pendant.name,itemCode:itemCode});
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
			$('#jde-build .jde-btn,.main-carousel .grid-item.white').attr('data-target','#JDEItemModal');
			if(!orderPlaced)
				$('#JDEWarnModal .modal-body p').text('Add item first!');
			
		}else{
			$('#jde-place-order').attr('data-target','#JDEPlaceOrderModal');
			$('#jde-place-order').hide();
			$('#jde-place-order-link').show();
			if(pendantSprites.length>=MAX_ATTCH&&!orderPlaced){
				$('#jde-build .jde-btn,.main-carousel .grid-item.white').attr('data-target','#JDEWarnModal');
				$('#JDEWarnModal .modal-body p').text('Oops! You can only add up to '+MAX_ATTCH+' item(s).');
			}else{
				$('#jde-build .jde-btn,.main-carousel .grid-item.white').attr('data-target','#JDEItemModal');
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
		href=href||'#jde-select';
		scrollTo(href);
	}
	function scrollTo(target){
		var $target = $(target);		
	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, SCROLL_SPEED, 'swing', function () {
	        window.location.hash = target;
	    });
	}
	function populateModal(modal,item,itemCode){
		var path = JEWEL_DIR+item.slug+JEWEL_SUFFIX;
		 modal.find('.jde-name').text(item.name);
		 modal.find('.jde-image').attr('src',path);
		 modal.find('.jde-price span').text(item.price);
		 modal.find('.jde-btn-confirm').data('item-code',itemCode);
	}
	$('#JDEWarnModal .modal-body span').text(MAX_ATTCH);
	$('#jde-build .jde-ui-item').click(function(){
		if(!orderPlaced){
			if(!$(this).hasClass('active'))
				$('#jde-build .jde-ui-item.active').removeClass('active');
			$(this).toggleClass('active');
		}
	});
	$('#JDEItemModal').on('show.bs.modal', function (event,arguments) {
		 var button = $(event.relatedTarget);
		 var itemCode =  button.data('item-code');
		 var item = PENDANTS[itemCode];
		 var modal = $(this);
		 populateModal(modal,item,itemCode);
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
	$('#JDEOrderSummary').on('show.bs.modal', function (event,arguments) {
		var $table = $('#JDEOrderSummary table tbody');
		var $footer = $('#JDEOrderSummary table tfoot');
			$table.html('');
		//Build summary table
		var summary = {};
		for(var i in pendantSprites){
			var pendant =  pendantSprites[i];
			var itemCode = pendant.itemCode;
			var item;
			if(!summary[itemCode]){
				item = {
					name:pendant.name,
					price:pendant.price,
					quantity:1,
					amount:pendant.price
				}
			}else{
				item = summary[itemCode];
				var price =item.price;
				var qty = item.quantity+1;
				item.quantity=qty;
				item.amount=qty*price;
			}
			summary[itemCode] = item;
		}
		for(var code in summary){
			var item =  summary[code];
			var row  = '<tr>';
				row += '<td>'+item.name+'</td>';
				row += '<td>'+item.price+'</td>';
				row += '<td>'+item.quantity+'</td>';
				row += '<td>'+item.amount+'</td>';
				row += '</tr>';
			$table.append(row);
		}
		var computedTotal = $('#jde-total span').text();
		var total  ='<tr>';
			total +='<td class="text-right" colspan="3">Total</td>';
			total +='<td>'+computedTotal+'</td>';
			total +='</tr>';
		$footer.html(total);
	}).on('hidden.bs.modal', function (event) {
		var $table = $('#JDEOrderSummary table tbody');
		var $footer = $('#JDEOrderSummary table tfoot');
		var empty = '<tr><td>-</td><td>-</td><td>-</td><td>-</td></tr>';
		$table.html(empty);
		$footer.html('');
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
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();
	    var target = this.hash;
		scrollTo(target);
	});
	$(window).scroll(function() {
		var position = $(window).scrollTop();
		var opacity = 1 - position/THRESHOLD2FADE;
		
		$('#jde-intro .container').css({'opacity':opacity});
		$('#top-nav').css({'opacity':1-opacity});
		
	});
	
});
