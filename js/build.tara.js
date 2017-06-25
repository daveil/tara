$(document).ready(function(){
	const THRESHOLD2FADE =  $(window).height() * 0.35;
	const SCROLL_SPEED = 800;
	const BG_SQ = 1650;
	const JEWEL_DIR ='img/jewel/';
	const JEWEL_PREFIX = '00-';
	const JEWEL_SUFFIX = '.png';
	const JEWEL_SCALE = 1;
	const BASE_SCALE = 1;
	const BASE_X = 0;
	const BASE_Y = -350;
	const VIEW_HEIGHT = 1;
	const WIDTH  = 1082
	const HEIGHT = 702;
	const MAX_BASES = 3;
	const MAX_THUMBS = 10;
	const REGULAR  = 'R';
	const ENDING =  'E';
	const TALL =  'T';
	const BASES = {
		1:{name:'Mari', slug:'mari', price:2088,width:160,height:156, type:'T'},
		3:{name:'Kimberly', slug:'kimberly', price:288,width:160,height:156,type:'T'},
		2:{name:'Blake', slug:'blake', price:758,width:160,height:156, type:'T'}
	};
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
	const APP = new PIXI.Application(WIDTH, HEIGHT, {backgroundColor : 0xffffff});
	const MAX_ATTCH = 3;
	const ATTA_Y = -280;
	const LOCK_OFFSET = 15;
	var baseSprite,baseSelected;
	var pendantSprites = [];
	var lastPosition=ATTA_Y;
	var lastPendantType;
	var orderPlaced = false;
	var orderSummary = [];
	initBaseGrid();
	initAttachmentGrid();
	buildBase();
	function buildBase(){
		APP.renderer.plugins.interaction.destroy();
		$('#jde-canvas').prepend(APP.view);
		addSprite('img/model/blank-side-view.jpg',0,0,WIDTH,HEIGHT,1,1);
		computeTotal();
		
	}
	function initAttachmentGrid(){
		var $carousel = $('.main-carousel').flickity(
							{ "cellAlign": "left", "contain": true , "pageDots": false }
						);
		var $carousel_mini = $('.mini-carousel').flickity(
							{ "cellAlign": "left", "contain": true , "pageDots": false }
						);
		var $cell = $("<div class='carousel-cell'/>");
		var $item = $("<div class='grid-item'  ><div class='item'/></div>");         
		var $c;
		var ctr = 0;
		for(var id in PENDANTS){
			var p_obj = PENDANTS[id];
			var $i = $item.clone();
				$i.attr('id','atta-'+id);
				$i.attr('data-toggle','modal');
				$i.attr('data-backdrop','static');
				$i.attr('data-keyboard','false');
				$i.attr('data-target','#JDEItemModal');
				$i.attr('data-item-code',id);
				$i.attr('data-item-type','atta');
				$i.addClass('white');
				$i.find('.item').addClass(p_obj.slug);
				
			if(!$c) $c =   $cell.clone();
			
			$c.append($i);
			var $cm = $cell.clone();
				$cm.append($i.clone());
			$carousel_mini.flickity( 'append', $cm );

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
				if(i<=MAX_THUMBS){
					var $cm = $cell.clone();
						$cm.append($i.clone());
					$carousel_mini.flickity( 'append', $cm );
				}
				if(i%2==0){
					$carousel.flickity( 'append', $c );
					$c = null;
				}

			}
	
	}
	
	function initBaseGrid(){
		var $grid = $('.vertical>.grid-container').flickity(
				{ "cellAlign": "center", "contain": true , "pageDots": false }
		);		
		var $item = $("<div class='grid-item'><a class='item'/></a>");         
		var $c = null;
		var ctr = 0;
		for(var id in BASES){
			var b_obj = BASES[id];
			var $img = $('<img src="'+JEWEL_DIR+'/preview/base/'+b_obj.slug+'.png" alt="'+b_obj.name+'" />');
			var $i = $item.clone();
			var $a = $i.find('a');
				//Item attributes
				$i.attr('id','base-'+id);
				$i.attr('data-item-code',id);
				$i.addClass('white');
				//Modal attributes
				$a.attr('data-item-type','base');
				$a.attr('data-item-code',id);
				$a.attr('data-toggle','modal');
				$a.attr('data-backdrop','static');
				$a.attr('data-keyboard','false');
				$a.attr('data-target','#JDEItemModal');
				
				$i.find('.item').append($img);	
				if(b_obj.type==TALL)
					$i.addClass('tall');
			$grid.flickity( 'append', $i );
			//$grid.append($i).masonry('appended', $i );
			ctr++;
		}
		//Fill buffer with MAX_BASES
		if(ctr<MAX_BASES)
			for(var i = ctr;i<MAX_BASES;i){
				i++;
				var $i = $item.clone();
					$i.find('.item').text(i);
				$grid.append($i).masonry('appended', $i );
			}
		//$grid.masonry('layout');
		//setTimeout(function(){  $grid.masonry('layout'); }, 500);
		/* $('.vertical>.grid-container .grid-item').on('click',onBaseSelect);
		function onBaseSelect(){
			var id =  $(this).data('item-code');
			
		} */
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
	function addBase(itemCode){
		var base = BASES[itemCode];
		var path = JEWEL_DIR+'/sprite/1x/base/'+base.slug+'.png';
		if(baseSprite)
			removeBase(baseSprite);
		baseSprite = addSprite(path,BASE_X,BASE_Y,base.width,base.height,BASE_SCALE,1,{x:0.5,y:0});
		baseSelected = base;
		$('#jde-build .jde-btn,.main-carousel .grid-item.white').attr('data-target','#JDEItemModal');
		scrollTo('#jde-build');
		computeTotal();
	}
	function removeBase(sprite){
		APP.stage.removeChild(sprite);
		
	}
	function addPendant(itemCode){
		if(itemCode==undefined){
			var min = 0 ;
			var max = PENDANTS.length-1;
			itemCode = Math.round(Math.random()* (max - min) + min)+1;
		}
		if(lastPosition<ATTA_Y) lastPosition = ATTA_Y;
		var pendant = PENDANTS[itemCode];
		var scale = JEWEL_SCALE;
		var anchor = {x:0.5,y:0};
		var path  = JEWEL_DIR+'sprite/1x/atta/';		
		var pendant_height = pendant.height;
		if(!pendantSprites.length){
			path +=JEWEL_PREFIX;
			pendant_height = pendant.altHeight;
		}
		
			
		path += pendant.slug+JEWEL_SUFFIX;
		var sprite = addSprite(path,0,lastPosition,pendant.width,pendant_height,scale,1,anchor);
		var pHeight =  Math.round((pendant_height-LOCK_OFFSET)*scale,2);
		pendantSprites.push({height:pHeight,sprite:sprite,price:pendant.price,name:pendant.name,itemCode:itemCode});
		console.log('Before',lastPosition,pHeight);
		lastPosition = lastPosition+pHeight;
		console.log('After',lastPosition);
		lastPendantType = pendant.type;
		computeTotal();
	}
	function removePendant(index){
		var pendant = pendantSprites[index];
		APP.stage.removeChild(pendant.sprite);
		console.log('Before undo',lastPosition,pendant.height);
		
		lastPosition = lastPosition-pendant.height;
		
		console.log('After undo',lastPosition);
		if(index>0) {
			var itemCode = pendantSprites[index-1]['itemCode'];
			var type = PENDANTS[itemCode].type;
			lastPendantType =  type;
		}else{
			lastPendantType = null;
		}
		pendantSprites.pop();
		if(index>0) {
			var itemCode = pendantSprites[index-1]['itemCode'];
			var type = PENDANTS[itemCode].type;
			lastPendantType =  type;
		}else{
			lastPendantType = null;
		}
		computeTotal();
	}
	function computeTotal(){
		var total = 0;
		if(baseSelected)
			total+=baseSelected.price;
		for(var i in pendantSprites){
			var pendant = pendantSprites[i];
			total += pendant.price;
		}
		$('#jde-total span').text(total);
		$('#jde-undo,#jde-reset,#jde-place-order').show();
		$('#jde-place-order-link,.jde-btn-undo').hide();
		if(!baseSprite){
				$('#jde-build .jde-btn,.main-carousel .grid-item.white,.mini-carousel .grid-item.white').attr('data-target','#JDEWarnModal');
				$('#JDEWarnModal .modal-body p').text('Select base jewelry first.');
		}else if(pendantSprites.length==0){
			$('#jde-place-order').attr('data-target','#JDEWarnModal');
			$('#jde-build .jde-btn,.main-carousel .grid-item.white,.mini-carousel .grid-item.white').attr('data-target','#JDEItemModal');
			if(!orderPlaced)
				$('#JDEWarnModal .modal-body p').text('Add item first!');
			
		}else{
			$('#jde-place-order').attr('data-target','#JDEPlaceOrderModal');
			$('#jde-place-order').hide();
			$('#jde-place-order-link').show();
			if(pendantSprites.length>=MAX_ATTCH&&!orderPlaced){
				$('#jde-build .jde-btn,.main-carousel .grid-item.white,.mini-carousel .grid-item.white').attr('data-target','#JDEWarnModal');
				$('#JDEWarnModal .modal-body p').text('Oops! You can only add up to '+MAX_ATTCH+' item(s).');
			}else if(lastPendantType==ENDING){
				$('#jde-build .jde-btn,.main-carousel .grid-item.white,.mini-carousel .grid-item.white').attr('data-target','#JDEWarnModal');
				$('#JDEWarnModal .modal-body p').text('Oops! Last item added can not accept an attachment. Undo last action to change.');
				$('.jde-btn-undo').show();
			}else{
				$('#jde-build .jde-btn,.main-carousel .grid-item.white,.mini-carousel .grid-item.white').attr('data-target','#JDEItemModal');
				$('#JDEWarnModal .modal-body p').text('Order placement successful. Thank you!');
			}
		}
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
		basePrice = 0;
		pendantSprites=[];
		lastPosition = ATTA_Y;
		orderPlaced=false;
		orderSummary = [];
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
	function populateModal(modal,item,itemCode,itemType){
		var path = JEWEL_DIR+'preview/'+itemType+'/'+item.slug+JEWEL_SUFFIX;
		 modal.find('.jde-name').text(item.name);
		 modal.find('.jde-image').attr('src',path);
		 modal.find('.jde-price span').text(item.price);
		 modal.find('.jde-btn-confirm').data('item-code',itemCode);
		 modal.find('.jde-btn-confirm').data('item-type',itemType);
	}
	function submitOrder(){
		var name = $('#full-name').val();
		var email = $('#email').val();
		var address = $('#address-1').val();
			address += ';'+$('#address-2').val();
			address += ';'+$('#address-3').val();
		var data = {
				name:name,
				email:email,
				address:address,
				orderSummary:orderSummary
		};
		var endpoint = window.location.origin+window.location.pathname;
			endpoint += 'scripts/email.php';
		var config = {};
			config.url = endpoint;
			config.type ='POST';
			config.dateType ='json';
			config.cache = false;
			config.data = data;
			config.beforeSend = function(){
				$('#jde-submit-order-now').text('SENDING...').attr('disabled','');
			};
			config.success = function (response){
				$('#jde-submit-order-now').text('SENT!').removeAttr('disabled');
				setTimeout(function(){
					$('#JDEOrderSummary').modal('hide');
					resetBuilder('#jde-intro');	
				},1500);
				
			};
			config.error = function (response){
				$('#jde-submit-order-now').text('TRY AGAIN.').removeAttr('disabled');
				alert('Could not proceed. Please contact TARA for support.');
			};
		$.ajax(config);
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
		 var itemType =  button.data('item-type');
		 var item;
		 switch(itemType){
			case 'base':
				item  = BASES[itemCode];
			break;
			case 'atta':
				item  = PENDANTS[itemCode];
			break;
			
		 }
		 var modal = $(this);
		 populateModal(modal,item,itemCode,itemType);
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
		$('#jde-submit-order').text('ORDER NOW');
		var $table = $('#JDEOrderSummary table tbody');
		var $footer = $('#JDEOrderSummary table tfoot');
			$table.html('');
		//Build summary table
		var summary = {};
			//Base
			summary['0']={
				name:baseSelected.name,
				price:baseSelected.price,
				quantity:1,
				amount:baseSelected.price
			};
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
		orderSummary = [];
		for(var code in summary){
			var item =  summary[code];
			var row  = '<tr>';
				row += '<td>'+item.name+'</td>';
				row += '<td>'+item.price+'</td>';
				row += '<td>'+item.quantity+'</td>';
				row += '<td>'+item.amount+'</td>';
				row += '</tr>';
			$table.append(row);
			var order = {
				itemCode:code,
				name:item.name,
				price:item.price,
				quantity:item.quantity,
				amount:item.amount,
				
			}
			orderSummary.push(order);
		}
		var computedTotal = $('#jde-total span').text();
		var total  ='<tr>';
			total +='<td class="text-right" colspan="3">Total</td>';
			total +='<td>'+computedTotal+'</td>';
			total +='</tr>';
		$footer.html(total);
		orderSummary.push({total:computedTotal});
	}).on('hidden.bs.modal', function (event) {
		var $table = $('#JDEOrderSummary table tbody');
		var $footer = $('#JDEOrderSummary table tfoot');
		var empty = '<tr><td>-</td><td>-</td><td>-</td><td>-</td></tr>';
		$table.html(empty);
		$footer.html('');
	});
	
	$('.jde-btn-confirm').click(function(){
		var itemCode =  $(this).data('item-code');
		var itemType =  $(this).data('item-type');
		switch(itemType){
			case 'base':
				addBase(itemCode);
			break;
			case 'atta':
				addPendant(itemCode);
			break;
		}
		
		$('#JDEItemModal').modal('hide');
	});
	$('#jde-undo,.jde-btn-undo').click(function(){
		var i = pendantSprites.length-1;
		if(i>=0)
			removePendant(i);
		else
			lastPosition = ATTA_Y;
	});
	$('#jde-reset').click(function(){
		resetBuilder();
	});
	$('#jde-submit-order-now').click(function(){
		orderPlaced = true;
		submitOrder();
		
		
	});
	$('#jde-place-order-link').click(function(){
		orderPlaced = true;
		//$('#jde-undo,#jde-place-order,#jde-place-order-link,#jde-reset').hide();
	});
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();
	    var target = this.hash;
		scrollTo(target);
		if(target=='#jde-select'&&!baseSelected){
			//$('.vertical>.grid-container').masonry('layout');
		}
	});
	$(window).scroll(function() {
		var position = $(window).scrollTop();
		var opacity = 1 - position/THRESHOLD2FADE;
		
		$('#jde-intro .container').css({'opacity':opacity});
		$('#top-nav').css({'opacity':1-opacity});
		
	});
	scrollTo('#jde-intro');
});
