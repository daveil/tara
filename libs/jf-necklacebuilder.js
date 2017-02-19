jQuery(function($){

	var prodtvar = {};
	prodtvar.charms = {};
	prodtvar.chain = {};
	var canvasOption = {};
	canvasOption.chain = {}; // to save the chain canvas option html
	var draggableArea =  $('#draggable-area');
	var imageList=[];
	var imageURLs=[];  // put the paths to your images here
	var imagesOK=0;
	var imgs=[];    
	var isSliderLoaded = true;
    var ondrag = false;
    var toolTipX = 0;
    var toolTipY = 0;
	//pagination variables
	var scrollTriggered =0;
	var currentScrollPage = 1;
    var onSliding = false;
	var isNSlickLoaded = true,
	isInit = false;
	var builderUrl = $('#builderUrl').val();
	// load charms on page load
	var charmsLoaded = "false";
	var chainsLoaded = "false";
	// ---------------    onclick Chains or Charms
	var areaH = $('.necklace-builder-area').outerHeight(),
	topAreaH = $('.necklace-filter-row.top').outerHeight(),
	newH = areaH - topAreaH - 6;

	var filters = {};
	var page = 1,ctrTooltip=10;
    var paddingFromChain = 70;
    var paddingCharms = 20;
    var timer;
	var skinSlider = $('.skinColor-slider').slider(),
	imgID, skinBgName, ctr, skinPrevName, idCtr, oVal = 1;

	// same product adding variable
	var charmsIncrementer = 0; 
	
	if($(window).width() < 954){
		 paddingCharms = 25;
	}
	if($(window).width() < 760){
		 paddingCharms = 45;
	}
	
	var hasLocalStorage = false;
	var charmsStock = {};
	var selectedChainParent = 0;
	var initSet = 0 ;
	
	// fancy dropdown to open above
	


	// mobile snapping
	/*if($(window).width() < 954)
	{
		var gridWidth = 8,
		gridHeight = 8,
		gridRows = 140,
		gridColumns = 67,
		i, x, y, tooltip, pos, xPos, yPos;
	   //set the container's size to match the grid
	   TweenLite.set(draggableArea, {height: gridRows * gridHeight + 1, width: gridColumns * gridWidth + 1});
	}
    */


	/***************************************** EVENTS************************/
	$("document").ready( function() {
		
		//local storage for configuration
		storageKey = "configure_"+ $('#sessionId').val();
		
		 // share link - clear the local Storage 
		 if ($('#requestType').val()=='share'){
			 clearStorage();
		 }
		 
		 if ("localStorage" in window) {
			 if ($localItem = localStorage.getItem(storageKey) ){
				 hasLocalStorage = true;
			 }else{
				 clearStorage();
			 }
			 
		 }
		
		
		// --------------- custom dropdown

		$('.dropdown-select').fancySelect({
			optionTemplate: function(optionEl) {
				return optionEl.text() + '<span class="icon"><img src="'+ optionEl.data('icon')+'" alt=""></span>';
			}
		});

		$('.chains-material-slider .fancy-select .trigger').on('click',function(e){
			$('.chains-material-slider .fancy-select .options').addClass('overflowing');
		});
		
		$('.chains-material-slider .fancy-select .options').addClass('overflowing');
		
		if (hasLocalStorage !== true){
		// set the group product details
			setSelectedGroupDetails();
		}else{
			// show product from local storage
			setProductFromLocalStorage();
		}
		obj = $('.charms-slider1');
		loadSlider(obj);
		if ($(window).width() < 955) {
			loadNecklaceSlick();
		}
		hideAjaxLoading();
	});

	$(window).on('resize', function(){	     
		if ($(window).width() < 955) {	      	
			if (isNSlickLoaded) {
				loadNecklaceSlick();
			}
		}
		else {
			if (isInit) {
				/*$('.chains-slick').slick('unslick');*/
				//$('.charms-slick').slick('unslick');
			}
		}
	});

	// add to cart - bag
	$('#addToCartBtn').click(function(e){
		addToCart();
	});
        
        // add to wishlist
        $('#addToWishlistBtn').click(function(e){
            e.preventDefault();
            addToWishlist();
	});

	/************ charms events **************/
	// click on charms - show charm popup
	$("#charmsListDiv").on( "click", ".product-box",function(e){
		showAjaxLoading();
		$selectedId         = $(this).attr('data-productid');	
		$id                 = $(this).attr('data-parentid');
		$type                = $(this).attr('data-type');
		$hasParent           = $(this).attr('data-hasparent');
		
		// update on options
		$('#itemTobeUpdate').val('');
		
		showCharmDetails($id,$selectedId,"a",$type,$hasParent);
		e.preventDefault();
	});	


	// Chain tool tip for edit length / materail/more option

	/*$('.chain-inner').on('click','#chainImage',function (e){
		
		var offset = $(this).offset();
		x  = (e.pageX - $('.chain-inner').offset().left);
	    y =  (e.pageY - offset.top);
	    
		parentId = $(this).attr('parentid');
		initSet  = 1;
		showChainOptions(x,y,parentId);
	});*/
	
	 $('#chainSizeDiv').fancySelect().on('change.fs', '.dropdown-select',function (e) {
		 changeChain((this),selectedChainParent);
		   if (initSet == 0){
			   $('#chain-tooltip').fadeOut(400); 
		   }
		  initSet  = 0 ;
	  });

	// click on canvas charm material selection
	$('#charm-tooltip').on("click","#canvasOption .materialOptions",function (e){
		showAjaxLoading();
		$productIdTobeUpdated = $('#itemTobeRemoved').val();
		$productId = $(this).attr('data-productId');
		$parentId  = $(this).attr('data-parentId');
		$image    =  $(this).attr('data-canvas-image');	
		imageWidth =  $(this).attr('data-canvas-imageWidth');	
		$categoryId    =  $(this).attr('data-categoryId');	
		currentStock         =  $(this).attr('data-stock');	
		$productPrice = $(this).attr('data-price');	

		stock = checkForStock($productId,currentStock);
		if(stock == "false"){
			hideAjaxLoading();
			$('#buildError').html('Product not available currently');
			$('#buildError').css('display','block');
			target = $('.necklace-filter-options li a').eq(1).attr('href');
			if (!($(target).hasClass('open'))){
			   $('.necklace-filter-options li a')[1].click();
			} 
			 
			return;
		}

		$('#buildError').css('display','none');
		
		
		//	DrawChange
		       
		    imageObj = $('#'+"charm_"+$productIdTobeUpdated+"_configurable");
			if(imageObj.length){
				x = imageObj.position().left;
				y = imageObj.position().top;
		
				charmsIncrementer++;
				$productId = $productId + '-' + charmsIncrementer;
				
				imgs = [];
				var imageObj = new Image();
				imageObj.src = $image;
				imageObj.id   = "charm_"+$productId+"_configurable";
				imageObj.setAttribute('type',"charm");
				imageObj.setAttribute('data-x',x) ;
				imageObj.setAttribute('data-y',y) ;
				imageObj.setAttribute('data-width',imageWidth);
		
				imgs.push(imageObj)
		
				//imageObj.onload = function(){ 
					startDraw();
				//}

		    custopt = prodtvar.charms[$productIdTobeUpdated]['custopt'];
			delete prodtvar.charms[$productIdTobeUpdated];
			
			canvasRemove("charm_"+$productIdTobeUpdated+"_configurable");
			
			setProductOptions(
					$productId, 
					$categoryId,
					"charm",
					$productPrice,$parentId,"",'','configurable',
					custopt,imageObj);
			
			
			
			//subTotalCalculation() ;
			
			$(this).parents('div #charm-tooltip').hide();
			
		}
		hideAjaxLoading();
	});


	// delete charm from canvans
	$('#charm-tooltip').on("click", "#deleteCharm", function(event) {
		showAjaxLoading();
		$productId = $('#itemTobeRemoved').val();
		type = "configurable";
		
		if (typeof prodtvar.charms[$productId]!=='undefined'){
			if (typeof prodtvar.charms[$productId]['type'] !=='undefined'){
				type = prodtvar.charms[$productId]['type'];
			}
		}
		
		deleteCharmFromCanvas($productId,type);
		
		$(this).parents('div #charm-tooltip').hide();
		
		hideAjaxLoading();
		event.preventDefault();
		
	}); 

	document.on("click",".popup-out-of-stock .fancybox-close",function (e){
		$('.popup-out-of-stock').css('display','none');
	});
	// Add charms to the canvas from popup
	document.on( "click", "#addCharmsBtn", function(e) {

		if (validateCharm()==false){
			$('.charmrequired').css("display","inline-block");
			//$('#charm-popup .error').css("display","block");
			e.preventDefault();
			return ;
		}

  
		$selectedProductItem =  $('#charm-popup .flex-active-slide').first();
		if (!$selectedProductItem.length>0){
			$selectedProductItem =  $('#charm-popup  li').first();
		}
	
	
		$productId = $selectedProductItem.attr('data-productid');
	
		sameProduct = $('#productTobeUpdated').val() == $productId;
		type =  $('#type').val();
		hasparent =  $('#hasparent').val();

		currentStock = $selectedProductItem.attr('data-stock');
		stock = checkForStock($productId,currentStock);
	
		if(stock=="false"){
			
			$('.popup-out-of-stock-text').html('Product is not available currently');
			$('.popup-out-of-stock').css('display','block');
			return;
		}
	
		charmsIncrementer++;
		$productId = $productId + '-' +charmsIncrementer;   
		
		$productPrice  = $selectedProductItem.attr('data-price'); 
	
		$src = $selectedProductItem.attr('data-canvas-image');
		imageWidth = $selectedProductItem.attr('data-canvas-imageWidth');
		// set bag to collect : used for add to cart function
		var attrVal = {};
        var custoptobj = {};
		$(".charmoption").each(function(option) {
			attrVal[$(this).attr('data-optionid')]=$(this).find(":selected").val();
		});

		$(".customOption").each(function(option) {
			
			id = $(this).attr('id');
			custoptobj[id] = {}; 
			 if($(this).data('inpt')){
	              var custoptiondatakey = $(this).data('optkey');
	            }else{
	              var custoptiondatakey = $(this).find(':selected').data('optkey');
	            }
	            var custoptiondataval = $(this).val();
	            if(custoptiondatakey!= undefined){
	              if(custoptiondataval!=''){
	                custoptobj[id][custoptiondatakey]=custoptiondataval;
	              }
	            }
			//attrVal[$(this).attr('data-optionid')]=$(this).find(":selected").val();
		});
		
	
		parentid = $("#parentId").val();
		
		//if (!sameProduct)
		{
		imgs = [];
		var imageObj = new Image();
		imageObj.src = $src;
		chainHeight = 0;
		if(prodtvar.chain){
			for (var key in prodtvar.chain) {

				if (prodtvar.chain[key]['imageHeight']){
					chainHeight = Number(prodtvar.chain[key]['imageHeight']+paddingFromChain);			
					}
			}
		}
		

		prodtvar.charms[$productId] = {
				product_id: $productId, 
				attrs: attrVal,
				parent_id : parentid,
				price: $productPrice,
				custopt : custoptobj,
				type : type,
				hasparent :hasparent ,
				image :$src,
				imageY:chainHeight,
				imageWidth:imageWidth};

		
		
		imageObj.id   = "charm_"+$productId+"_"+type;
		imageObj.setAttribute('type',"charm");
		imageObj.setAttribute('data-y',chainHeight);
		imageObj.setAttribute('data-width',imageWidth);

		// update on options
		if ($('#itemTobeUpdate').val()!='')  {
			 $productIdTobeUpdated = $('#itemTobeUpdate').val();
			  imageObjTobeRemoved = $('#'+"charm_"+$productIdTobeUpdated+"_configurable");
				if(imageObjTobeRemoved.length){
					x = imageObjTobeRemoved.position().left;
					y = imageObjTobeRemoved.position().top;
					
					imageObj.setAttribute('data-y',y);
					imageObj.setAttribute('data-x',x);
					prodtvar.charms[$productId]['imageY'] = y;
					prodtvar.charms[$productId]['imageX'] = x;
					
					
				}
				delete prodtvar.charms[$productIdTobeUpdated];
				canvasRemove("charm_"+$productIdTobeUpdated+"_configurable");
		}// product update - if from more options
		
		
		
		
		imgs.push(imageObj)
	//imageObj.onload = function(){ 
			startDraw();
	//	}

		}
		subTotalCalculation();
		
		// update local storage
		 if ("localStorage" in window) {
			 localStorage.setItem(storageKey,JSON.stringify(prodtvar));
		 }
		 
		 
		$.fancybox.close();
		if($(window).width() < 954) {
			if ($('#itemTobeUpdate').val()=='') {
				// only for add charm
				$('.necklace-filter-options li a')[1].click();
			}
		}
	});


	// show options charm from canvans
	$('#charm-tooltip').on("click", "#charmOptions", function(event) {
		showAjaxLoading();
		
		$productId = $('#itemTobeRemoved').val();
		$('#itemTobeUpdate').val($productId);
		$id = $productId;
		if ($('#itemTobeRemovedParent').val()!=""){
			$id = $('#itemTobeRemovedParent').val();
		}
        
		type = "configurable";hasparent="yes";
		if (typeof prodtvar.charms[$productId]!=='undefined'){
			if (typeof prodtvar.charms[$productId]['type'] !=='undefined'){
				type = prodtvar.charms[$productId]['type'];
			}
			if (typeof prodtvar.charms[$productId]['hasparent'] !=='undefined'){
				hasparent = prodtvar.charms[$productId]['hasparent'];
			}
		}
		
		
		$selectedId = $productId;
		showCharmDetails($id,$selectedId,"u",
				type,
				hasparent);
	}); 


	// Load More Option
    if($(window).width() > 954){
		$('#charms .product-list-dropdown-inner').on('scroll', function() {
			loadMoreProducts(false);
		});
	}else{ 
		$('.load-more-btn').on('click', function() {
			loadMoreProducts(true);
		});
	} 

	/************ charm events end **************/

	/*********** chain events ***********************/
 // Edit chain length starts
    function setChainConfigDetials(parentContent){
    	var parentId = parentContent.attr('parentid');
	    var optionArray = {};
		if (!canvasOption.chain[parentId]){
			canvasOption.chain[parentId] = {};
		  // get size array
		parentContent.find('select').each(function (e,index){
			$(this).find('option').each(function (e1,index1)
					{
						valueString = $(this).attr('value');
						valueArray =  valueString.split("@!");
						size       = valueArray[0];
						price      = valueArray[2];
						simpleProductId = valueArray[3];
						simpleSku  = valueArray[4];
						materialOptionId   = valueArray[5];
						material = valueArray[6];
						sizeOptionId = valueArray[7];
						if(!optionArray[size]){
							optionArray[size]= {};
							optionArray[size]['material']= {};
							optionArray[size]['optionId'] = sizeOptionId;
						}
						if (!optionArray[size]['material'][materialOptionId]){
							optionArray[size]['material'][materialOptionId] = {};
						}
						optionArray[size]['material'][materialOptionId]['sku'] = simpleSku;
						optionArray[size]['material'][materialOptionId]['productId'] = simpleProductId;
						optionArray[size]['material'][materialOptionId]['price'] = price;
						optionArray[size]['material'][materialOptionId]['option'] = material;
		});
		});
		
		canvasOption.chain[parentId]['size'] = optionArray;
		canvasOption.chain[parentId]['material_attribute_id'] = parentContent.attr("materialattributeid");
		canvasOption.chain[parentId]['size_attribute_id'] = parentContent.attr("sizeattributeid");
	   }
		
		
		// Edit chain length ends
    }
    
	$('#chains .dropdown-select').fancySelect().on('change.fs', function (e) {
		// Edit chain length 
		var parentContent = $(this).closest('.configDetail');
		setChainConfigDetials(parentContent);
		
		targetString = (this).value;
		targetArray = targetString.split("@!");
		target = targetArray[0];

		name = "."+target+"-chain-img",
		$parent = $(this).parents('.product-select-variant');

		var label = $('#productName'+target);
		var sku = targetArray[4];
		var productName = label.attr('value');

       // iphone ipad - label not updating 
		$(this).siblings('.trigger').html(target);
	
		if($(name).length) {

			$(this).find('.chain-img').hide();		
			$parent.siblings('.imagebox').children('.chain-img').removeClass('active');
			$parent.siblings('.imagebox').children(name).addClass('active');
			$parent.siblings('.product-info').children('.name').html(targetArray[1]);
			$parent.siblings('.product-info').children('.price-box').children('.regular-price').children('.price').html(targetArray[2]);

		}


		//if($parent.children('p').children('.select-chain-btn').text().toLowerCase() == "selected")
		{

			showAjaxLoading();
			imageValue = $parent.siblings('.imagebox').children('.chain-img').attr('value');
			var label = $('#productImageValue'+imageValue);
			var productImageValue = label.attr('productImageValue');
			var productId = label.attr('productImageId');
			var skinPath = label.attr('skinPath');
			productId = targetArray[3];

			

			prodtvar.chain = {};	

			$previousImage = $('#previousChainId').val();
			
			$('#previousChainId').val(productId);

			$('#chains .chains-material-slider li').removeClass('selected');
			$parent.closest('li').addClass('selected');
			$('#chains .chains-material-slider li .select-chain-btn').text('Select');
			$parent.children('p').children('.select-chain-btn').text('Selected');

			
			setProductOptions(productId,68,"chain",
					targetArray[2].replace('$','').replace(',',''),
					0,productImageValue,sku,'',{},{});
			
			
			if($(window).width() < 954) {
				$('.necklace-filter-options li a')[0].click();
				}
		

		}

	});

	//Adjust skin color by image id   

	$('.skinColor-slider').on('change', function(slideEvt) {	
		if($(window).width() > 954) {

			if(slideEvt.value.newValue < 11) 
				idCtr=0;
			else if(slideEvt.value.newValue > 10 && slideEvt.value.newValue < 21)
				idCtr=1;
			else if(slideEvt.value.newValue > 20 && slideEvt.value.newValue < 31)
				idCtr=2;
			else if(slideEvt.value.newValue > 30 && slideEvt.value.newValue < 41)
				idCtr=3;
			else if(slideEvt.value.newValue > 40 && slideEvt.value.newValue < 51)
				idCtr=4;
			else if(slideEvt.value.newValue > 50 && slideEvt.value.newValue < 61)
				idCtr=5;
			else if(slideEvt.value.newValue > 60 && slideEvt.value.newValue < 72) 
				idCtr=6;

			oVal =  getOpacityValue(slideEvt.value.newValue)
			var imgId = '#skin-image'+idCtr;

			if ($(imgId).length) {
				$(imgId).css('opacity',''+oVal.toFixed(2));
				// decreasing 
				if(slideEvt.value.newValue < slideEvt.value.oldValue) {
					if(idCtr == 0) {
						$('#skin-image1,#skin-image2,#skin-image3,#skin-image4,#skin-image5,#skin-image6').css('opacity','0');
					}
					else if(idCtr == 1) {
						$('#skin-image2,#skin-image3,#skin-image4,#skin-image5,#skin-image6').css('opacity','0');
					}
					else if(idCtr == 2) {
						$('#skin-image3,#skin-image4,#skin-image5,#skin-image6').css('opacity','0');
					}
					else if(idCtr == 3) {
						$('#skin-image4,#skin-image5,#skin-image6').css('opacity','0');
					}
					else if(idCtr == 4) {
						$('#skin-image5,#skin-image6').css('opacity','0');
					}
					else if(idCtr == 5) {				
						$('#skin-image6').css('opacity','0');
					}
				}
				// increasing
				else if (slideEvt.value.newValue > slideEvt.value.oldValue) {
					if(idCtr == 1) {
						$('#skin-image0').css('opacity','1');
					}
					else if(idCtr == 2) {
						$('#skin-image0,#skin-image1').css('opacity','1');
					}
					else if(idCtr == 3) {
						$('#skin-image0,#skin-image1,#skin-image2').css('opacity','1');
					}
					else if(idCtr == 4) {
						$('#skin-image0,#skin-image1,#skin-image2,#skin-image3').css('opacity','1');
					}
					else if(idCtr == 5) {				
						$('#skin-image0,#skin-image1,#skin-image2,#skin-image3,#skin-image4').css('opacity','1');
					}
					else if(idCtr == 6) {				
						$('#skin-image0,#skin-image1,#skin-image2,#skin-image3,#skin-image4,#skin-image5').css('opacity','1');
					}
				}
			}
		}
		// uses background images (on mobile) by class name
		else {		
			skinPrevName = "skin-image"+(slideEvt.value.oldValue);	
			skinBgName = "skin-image"+slideEvt.value.newValue;	

			$('#builder-image-container').removeClass(skinPrevName);
			$('#builder-image-container').addClass('builder-image-container '+skinBgName);
		}
	});

	// skin color - on click less button
	$('.slider-box .minus-icon').click(function(e){
		var imgId;
		var $rslider = $(this).nextAll('.skinColor-slider');
		var currVal = $rslider.val();
		var newVal = parseInt(currVal) - parseInt(1);

		if($(window).width() > 954) {
			if(newVal < 11)
				idCtr=0;
			else if(newVal > 10 && newVal < 21)
				idCtr=1;
			else if(newVal > 20 && newVal < 31)
				idCtr=2;
			else if(newVal > 30 && newVal < 41)
				idCtr=3;
			
			else if(newVal > 40 && newVal < 51)
				idCtr=4;
			oVal = getOpacityValue(newVal);
			imgId = '#skin-image'+idCtr;	
		}

		if (currVal > 0 ) {
			$rslider.slider('setValue', newVal);

			if($(window).width() > 954) {
				if ($(imgId).length) {
					$(imgId).css('opacity',''+oVal.toFixed(2));
				}
			}
			else {
				skinPrevName = "skin-image"+currVal;		
				skinBgName = "skin-image"+newVal;

				$('#builder-image-container').removeClass(skinPrevName);
				$('#builder-image-container').addClass(skinBgName);		
			}
		}
	});

	// skin color - on click plus button
	$('.slider-box .plus-icon').click(function(e){
		var $rslider = $(this).siblings('.skinColor-slider'),
		max = $rslider.data('slider-max'),
		currVal = $rslider.val(),
		newVal = parseInt(currVal) + parseInt(1);

		if($(window).width() > 954) {
			if(newVal < 11)
				idCtr=0;
			else if(newVal > 10 && newVal < 21)
				idCtr=1;
			else if(newVal > 20 && newVal < 31)
				idCtr=2;
			else if(newVal > 30 && newVal < 41)
				idCtr=3;
			else if(newVal > 40 && newVal < 51)
				idCtr=4;
			oVal = getOpacityValue(newVal);
			imgId = '#skin-image'+idCtr;
		}

		if (currVal < max ) {
			$rslider.slider('setValue', newVal);

			if($(window).width() > 954) {
				if ($(imgId).length) {
					$(imgId).css('opacity',''+oVal.toFixed(2));
				}
			}
			else {
				skinPrevName = "skin-image"+currVal;		
				skinBgName = "skin-image"+newVal;

				$('#builder-image-container').removeClass(skinPrevName);
				$('#builder-image-container').addClass(skinBgName);
			}
		}

	});




	// on click Select chain btn

	$('.select-chain-btn').click(function(e){
		
		// Edit chain length - set config details 
		var parentContent = $(this).closest('.configDetail');
		setChainConfigDetials(parentContent);
		
		showAjaxLoading();
		
		selectImage = $(this).attr('data-raw-value');

		$parent = $(this).parents('.product-select-variant');
		imageValue = $parent.siblings('.imagebox').children('.chain-img').attr('value');

		productPrice = $parent.siblings('.imagebox').children('img.active').attr('productpice');

		var label = $('#productImageValue'+imageValue);

		var productImageValue = label.attr('productImageValue');
		var productId = label.attr('productImageId');
		var skinPath = label.attr('skinPath');
		var sku =  label.attr('sku');
		


		
		prodtvar.chain = {};
		$('#chains .chains-material-slider li').removeClass('selected');
		$(this).closest('li').addClass('selected');
		$('#chains .chains-material-slider li .select-chain-btn').text('Select');
		$(this).text('Selected');


		$previousImage = $('#previousChainId').val();

		//if ($previousImage!=""){
		//	canvasRemove("chain_"+$previousImage);
		//}

		
		$('#previousChainId').val(productId);

	
		setProductOptions(productId,68,"chain",productPrice,0,
				productImageValue,sku,'',{});
	  
		
		if($(window).width() < 954) {
		$('.necklace-filter-options li a')[0].click();
		}

	});

	/*************************** Chain events ens ********************/


	/**************************** Filter Events ****************/
	$('#findMe').click(function(){
		showAjaxLoading();
		currentScrollPage = 1;
		filters['search'] = $("#searchText").val();
		loadProductList(currentScrollPage,false);
		
	});


	$('#sortAction').fancySelect().on('change.fs', function (e) {

		showAjaxLoading();
		currentScrollPage = 1;
		filters['sort'] = this.value;
		loadProductList(currentScrollPage,false);
		
	});


	$('#charmsType').fancySelect().on('change.fs', function (e) {
		showAjaxLoading();
		currentScrollPage = 1;
		filters['charmsType'] = this.value;
		loadProductList(currentScrollPage,false);
		
	});
	/*************************** Filter events end ******************************/


	$('.necklace-filter-options li a').click(function(e){
if(!$(window).scrollTop()){
        window.scrollBy(0, 250);
        }
		e.preventDefault();
		var target = $(this).attr('href'),
		$scrollArea = $(target).children('.product-list-dropdown-inner');
		$scrollArea.css({'height' : newH});       

		$(target).slideToggle(500);

                if (target == '#chains') {
			$('.product-list-dropdown.chains-slick li.parent-selected').prependTo('#chains .product-list-dropdown.chains-slick');
		}

		var targetHeight = $scrollArea.outerHeight();
		$('.necklace-filter-options li a').not(this).removeClass('active');   
		$('.product-list-dropdown-panel').not(target).hide();
		$('.product-list-dropdown-panel').not(target).removeClass("open");               
		$(this).toggleClass('active');   

		//$('.flex-active-slide').resize();

		if($(window).width() > 954 ) {
			if (targetHeight > areaH ) {                 
				$scrollArea.css({'overflow-y':'scroll'});               
				$scrollArea.css({'height' : newH});
			}
			else {         
				$scrollArea.css({'overflow-y':'scroll'})       
				$scrollArea.css({'height' : newH});
			}       
		}
		else {

			if (targetHeight > areaH ) {				 
		 		$scrollArea.css({'overflow-y':'scroll'});				
				$scrollArea.css({'height' : (newH-64)});
			}
			else {		 
				$scrollArea.css({'overflow-y':'hidden'})		
				$scrollArea.css({'height' : 'auto'});
			}	

                        //scroll to charms area 	
			if($(this).hasClass('active')) {
				$('html,body').animate({
					scrollTop: $('.necklace-builder').offset().top },'slow'
				);	
			} else {
				var charmArea = $('.chain-container .chain-inner').outerHeight() - ((topAreaH*3) + 150);
				$('html,body').animate({
					scrollTop: $('.chain-container .chain-inner').offset().top + charmArea},'slow'
				);		
				
                         }

		}
		if ($(window).width() < 955) {
			/*$('.chains-slick').slick('setPosition');*/
			//$('.charms-slick').slick('setPosition');
		}

		$(target).toggleClass("open");


		if($(window).width() > 954 ) {
			if ($(target).hasClass('open')){
				$('.builder-image-container').addClass('active');
				containerLeft = $('#draggable-area').offset().left + 30;
				moveTo = toolTipX+600;
				if (moveTo < containerLeft){
					moveTo = containerLeft;
				}
				$('#charm-tooltip').css('left',(moveTo)+'px'); 
				$('#chain-tooltip').css('left',(moveTo)+'px');
			}
			else{
				$('.builder-image-container').removeClass('active'); 
				
				containerLeft = $('#draggable-area').offset().left + 30;
				moveTo = toolTipX+300;
				if (moveTo < containerLeft){
					moveTo = containerLeft;
				}
				
				 $('#charm-tooltip').css('left',(toolTipX+300)+'px');  
				 $('#chain-tooltip').css('left',(toolTipX+330)+'px');
			}
		}
		sliderName = target.slice(1);


		if ($(target).hasClass('open')) {
			if( target.slice(1) == 'chains'  ) {
				loadVariantSlider(target);   
			}else{
				$('.charms-slider1 .flex-active-slide').resize();
			}
		}

	});

	$(window).on('scroll',function() {
		var scrollTop = $(this).scrollTop();	


		if (scrollTop > elTop ) {
			if ($(window).width() > 954) {
				$(stickyEl).addClass('sticky');

				if (scrollTop > limit ) {
					var diff = limit - (scrollTop);
					stickyEl.css({top: diff});
				}
				else {
					stickyEl.css('top', '53');			
				}
			}
		}
		else {
			$(stickyEl).removeClass('sticky');	
		}
	});
        
        $(document).click(function(e) {
            if($(e.target).parents('.draggable-area').length == 0) {
              $('#charm-tooltip').fadeOut(400);
            }
        });
	

	$('.btnStartBuilder').click(function(){
		clearStorage();
		location.reload();
	});

	


	// --------------- sticky filter row

	var stickyEl = $('#necklace-filter-row'),
	elTop 	 = stickyEl.offset().top - 6,
	stickyH  = stickyEl.height(),
	topmostBarH = $('.necklacebuilder-index-index .announcement-bar').outerHeight(),
	limit = $('.necklace-builder-area ').offset().top + $('.necklace-builder-area').height() - 110;
	
	$(window).on('scroll',function() {	

		var scrollTop = $(this).scrollTop(),
		elTopPos = 53;	

		if ($(window).width() > 954) {
			if($('.announcement-bar').length && $('.announcement-bar').is(":visible")){
				elTopPos = 53 + topmostBarH;
				stickyEl.addClass('sticky-2');
				scrollTop = $(this).scrollTop() + elTopPos;

				// console.log(scrollTop);
			}
			else {
				elTopPos = '53';
				stickyEl.removeClass('sticky-2');
				scrollTop = $(this).scrollTop();
			}
		}

		if (scrollTop > elTop ) {			
			stickyEl.addClass('sticky');

			if (scrollTop > limit ) {
				var diff = limit - (scrollTop);
	          	stickyEl.css({top: diff});

			}
			else {
				stickyEl.css('top', elTopPos);	
			}
		}
		else {
			stickyEl.css('top', '0');	
			stickyEl.removeClass('sticky');	
			stickyEl.removeClass('sticky-2');	
		}
	});
	//--------------------Share link ---------
		
		$('.necklace-builder .social-links').on('click','a',function(event){

			event.preventDefault();
                $selectedBtn = $(this);        
                if($(this).hasClass("email-btn")){
                    $selectedBtn = $(this);
                }   
                else{
                    selectedId = $(this).attr('id');
                    $shareCode = selectedId.split("_",1);

                    selectedUrl = $(this).attr('href');
                }
	        $title = "Build Your Own Charm Necklace ";
	       
	        var charmprodJsonString = JSON.stringify(prodtvar.charms);
	        var chainprodJsonString = JSON.stringify(prodtvar.chain);
	       
	        jQuery.ajax({
	            type:'POST',
	         //   async : false,
	            url: builderUrl+"index/createShareID",
	           // async : false,
	            data : {
	                    charms:charmprodJsonString,
	                    chain : chainprodJsonString
	                    },
	                success : function(data){
	               
	                    content = data;
	                    if(content){
                                if($selectedBtn.hasClass("email-btn")){
	                    	    $result = JSON.parse(content);
	                            shareId = $result['share_id'];
	                            baseUrl = $('#baseUrl').val();
	                            var href = "mailto:email@example.com?subject=Build Your Own Charm Necklace&body=Build Your Own Charm Necklace%0A"+baseUrl+"necklacebuilder?SESS_PID="+shareId;
                                    window.location.href = href;
                                }
                                else{
	                    	    $result = JSON.parse(content);
	                            shareId = $result['share_id'];
	                            baseUrl = $('#baseUrl').val();
	                            shareUrl = baseUrl+"necklacebuilder?SESS_PID="+shareId;
	                            redirectUrl =  selectedUrl+ shareUrl;
	                            setting = '';
	                            if($(window).width() > 954 ) {
	                                setting = "height=500,width=500,";
	                            }
	                            window.open(redirectUrl,'',setting);
	                            event.preventDefault();
                                }
	                    }
	                    else{
	                        event.preventDefault();
	                    }
	                },
	        });
	       
	    });




	/***************************************** EVENTS END ************************/
	
	/***************************************** FUNCTIONS  ************************/
	
	/****************** CHARMS **********/
	function validateCharm(){
		valid = true;
		 $('#charm-popup .required-entry').each(function(){
	          if($(this).val()==''){
	        	  valid = false;
	          }
	        });
		 return valid;
	}
	// Show canvas popup data
	function showCanvasOptions($productId,type,x,y){
		jQuery.ajax({
			type:'POST',
			url: builderUrl+"index/showOptions",
			data : {productId:$productId,
				    type : type },
			success : function(data){
				$('#charm-tooltip').html(data);
				prodtvar.charms[$productId]['canvas'] = data;
				/*$('#charm-tooltip').css('top',y+'px');
				if ( $('.builder-image-container').hasClass('active') ) {
				
					  $('#charm-tooltip').css('left',(x+600)+'px');  
					  
				  }else{
					  $('#charm-tooltip').css('left',(x+300)+'px');  
				  }*/
			}
		});
	}    
	
	// update charm details
	function setSelectedCharm(id,slide){
		$imageObj = $('#'+id);

        
		$label = $imageObj.attr('data-name');
		$price = $imageObj.attr('data-price');
		$productId = $imageObj.attr('data-productId');
		$slideNum   =  $imageObj.attr('data-num');

		$(".product-name").html ($label);
		
		
		jQuery.ajax({
			type:'POST',
			async : true,
			url:   builderUrl+"index/getConvertedCurrency",
			data : {price:$price },
			success : function(data){
				formattedPrice =  data;
				 $(".product-price").html(formattedPrice);
			},
			complete : function(){
			}
		});
		
	//	formattedPrice = 
			
			
	//	$(".product-price").html(getFormattedPrice($price));
	   
		$('#selectedCharm').val($productId)


		if( slide == true){
			
			slider = $('.image-slider').data('flexslider');
			if (slider.currentSlide != $slideNum){			
				slider.flexAnimate(parseInt($slideNum));
			}
		}
	}
	
	// Show charm details in a popup
	function showCharmDetails($id,$selectedId,action,type,hasparent){
		
	
		var content = "";
		$selectedIdSplit = $selectedId.split('-'); 
		jQuery.ajax({
			type:'POST',
			async : true,
			url: builderUrl+"index/charmdetails",
			data:  {
					"parentId": $id,
					"selectedId" : $selectedIdSplit[0],
					 "type" : type,
					 "hasparent":hasparent
					},
		    success : function(data){
						content = data;
				        var isSliderLoaded = true;
						if (content){
							$.fancybox({
								wrapCSS :'necklace-builder-fancybox',
								padding		: 0,    
								arrows		: false,
								maxWidth	: 790,	
								minHeight	: 440,
								width		: '98%',
								height		: 'auto',
								fitToView	: true,
								autoSize 	: false,
								
								/*maxWidth	: 790,
								//maxHeight	: 600,
								width		: '95%',
								height		: '98%',
								fitToView	: true,
								autoSize	: false,*/
								
								closeClick	: false,
								content: content,
								start : function (){
				                   window.addCurrentSlidesClass(slider);
				                },
								beforeShow : function(){
								
									if ( isSliderLoaded ) 
									{	
										
										var iSlider = $('#charmSlider').flexslider({
											animation: "slide", 
											controlNav: $('#charmSlider').find('.slides li').length > 4 ? false : true,
											animationSpeed: 700,
											pauseOnHover: true, 
											slideshow: false,
											directionNav: false,
											touch: ($('#charmSlider li').length)>1 ? true:false,
											itemWidth : 500,
											//itemHeight : 500,
											after: function ( slider ) {
												 onSliding = true;
												 window.addCurrentSlidesClass(slider);
												 $('#charmSlider .flex-active-slide').resize();
												 $currentImage = $('#charm-popup .flex-active-slide')[0];
												//setSelectedCharm($currentImage.id,false);
												if ($currentImage){
												setSelectedOption($currentImage.id.substring(7));
												setSelectedCharm($currentImage.id,false);
												}
											}	
													
										});
										
										
										isSliderLoaded = false;
										selectedItem  = document.getElementsByName($('#selectedCharm').val());
										$id = selectedItem[0].id;
										setSelectedCharm($id,true);

									}
									$('#charm-popup .dropdown-thumbSelect').fancySelect({
										optionTemplate: function(optionEl) {
											return optionEl.text() ;
										}
									});

								},
								afterShow : function (){
							
									if (prodtvar.charms[$selectedId]){
										   if (prodtvar.charms[$selectedId]['custopt']){
											   jQuery.each( prodtvar.charms[$selectedId]['custopt'], function( key, value ) {
												   obj = $("#"+key);
												   jQuery.each(value,function (okey,objValue){
													   if (obj.hasClass('dropdown-thumbSelect')){
														   obj.val(objValue).trigger('change')
													   }else{
														   obj.val(objValue);
													   }
												   });
											   })
										   }
								
									   }
                                                                           
                                                                        jQuery('.attr-letter').keyup(function() {
                                                                            var str = jQuery(this).val();
                                                                            jQuery(this).val(str.toUpperCase());
                                                                        });   
									
									if (action == "a"){
										$('#productTobeUpdated').val('');
										 window.addCurrentSlidesClass(slider);
									}else{
										$('#productTobeUpdated').val($selectedId);
									}
									
									
									
									
										/*$('.customOption').fancySelect().on('change.fs', function (e) {
											//dropObject = $('#'+(this).id);
											// console.log(dropObject);
											//alert(dropObject.siblings('ul').children('li.selected').children('span').html().trim());
											
											//$(this).siblings('.trigger').html(dropObject.siblings('ul').children('li.selected').children('span').html().trim());
									 
									 
										});*/
								
									$('.charmoption').fancySelect().on('change.fs', function (e) {

										id = "id";
										$(".charmoption").each(function(option) {
											id = id+ "-opt-"+$(this).attr('data-code')+"_value_"+$(this).find(":selected").val();
										});
										
										// labels not updating
										
										//dropObject = $('#'+(this).id);
										//alert(dropObject.siblings('ul').children('li.selected').children('span').html().trim());
									//	$(this).siblings('.trigger').html(dropObject.siblings('ul').children('li.selected').children('span').html().trim());
										
										// console.log(dropObject);
									
										 
										if (!onSliding){
											setSelectedCharm(id,true);
										}
										e.stopPropagation();
									});

									$('#charm-popup .charmoptionList').on('click',function (e){
									
										onSliding = false; 
									});
									
									
									
								},
								afterClose : function(){		
									$('#charm-tooltip').hide();	
								},
								helpers		: {
									overlay: {
										closeClick: false,
										locked: false
									}
								}
							});
						}else{
							
							$('#buildError').html('Unable to process !!');
							$('#buildError').css('display','block');
							  $('.necklace-filter-options li a')[1].click();
						}
					},
		   complete : function (){
			  
			   hideAjaxLoading();
		   }
				
		});

	}
    window.addCurrentSlidesClass = function (slider) {
        //debugger;
       
        $('.flexslider li').removeClass("flex-active-slide");
        var startli = (slider.move * (slider.currentSlide));
        var endli = (slider.move * (slider.currentSlide + 1));
        for (i = startli + 1; i <= endli; i++) {
            $('.flexslider li:nth-child(' + i + ')').addClass('flex-active-slide');
        }
    } 
	// pre-populate the selected charms option values
	function setSelectedOption(options){
		optionList = options.split('-opt-');
		for(i=0;i<optionList.length;i++){
			optionPair = optionList[i];
			selectedOption = optionPair.split('_value_');
			optionCode = selectedOption[0];
			optionValue = selectedOption[1];
			$('#option_'+optionCode).val(optionValue).trigger('change');
		}
	}

	// remove image object from canvas
	function canvasRemove($name){
		
		$('#'+$name).remove();
	}
	
	// delete charm 
	function deleteCharmFromCanvas($productId,type){
		delete prodtvar.charms[$productId];
		canvasRemove("charm_"+$productId+"_"+type);
		 if ("localStorage" in window) {
			 localStorage.setItem(storageKey,JSON.stringify(prodtvar));
		 }
		subTotalCalculation() ;
		
	}
	
	/****************** CHARMS END **********/

	/* NOTE for Quick Menu to keep Open
	 * - Enable this event 
	 * - when need to close the menu only on outer click
	 * */
	/*$('.builder-image-container').click(function(e){
			$('#charm-tooltip').fadeOut(400);
	});*/
	
	
	// Draw images to the canvas
	function drawImage(imageObj,prodidunq,type,x,y,width,height) {
		width = Number (width);
		height = Number (height);
	     if (y == 0){
	    	 y = draggableArea.height()/2;
	     }
	     if (x == 0){
	    	 
	    	 x =  ((draggableArea.width()/2)+paddingCharms) - (width>0?width/2:0);
	     }
		 image = $("<img />")
         image.attr("id", prodidunq);
		 image.attr("src", imageObj.src);
         image.css("top", Number(y));
       
         if (width>0){
        	  image.width(width); 
         }
         if (height >0){
       	  image.height(height); 
        }
         
               
         image.css("left", Number(x));
         image.css("position", 'absolute');
         image.css("z-index", ctrTooltip++);
         var tooltip, pos, xPos, yPos, ctr=1;
         
         image.bind('touchstart click', function(e){
            e.stopPropagation() 
            if (!ondrag){
                $('#chain-tooltip').css('display',"none"); 
                obj = $(this);
                $name = obj.attr('id');
                $productId= $name.split('_')[1];
                $type= $name.split('_')[2];
                $(this).css({'z-index': ctrTooltip++}); 
                setOption = false;
                
                if(typeof prodtvar.charms[$productId] !== 'undefined')
                {
                    if (typeof prodtvar.charms[$productId]['canvas'] !== 'undefined') {
                        $('#charm-tooltip').html(prodtvar.charms[$productId]['canvas']);
                        $('#itemTobeRemoved').val($productId);
                        setOption = true;
                    }
                }
                if (!setOption) {
                    showCanvasOptions($productId, $type, obj.position().left, obj.position().top);
                }
                
                toolTipX = x = obj.position().left;
                toolTipy = y = obj.position().top - 50;
                $('#charm-tooltip').css('top', y + 'px');
                containerLeft = $('#draggable-area').offset().left + 30;

                if ($(window).width() < 954) {
                    toolTipX = obj.position().left - 300;
                }

                if ($('.builder-image-container').hasClass('active')) {
                    moveTo = toolTipX + 600;
                    if (moveTo < containerLeft) {
                        moveTo = containerLeft;
                    }
                    $('#charm-tooltip').css('left', moveTo + 'px');

                } else {
                    moveTo = toolTipX + 300;
                    if (moveTo < containerLeft) {
                        moveTo = containerLeft;
                    }
                    $('#charm-tooltip').css('left', moveTo + 'px');
                }
                
                // update local storage
                x = obj.position().left;
                y = obj.position().top;
                if (typeof prodtvar.charms[$productId] !== 'undefined')
                {
                    prodtvar.charms[$productId]['imageY'] = y;
                    prodtvar.charms[$productId]['imageX'] = x;
                    // set Localstorage
                    if ("localStorage" in window) {
                        localStorage.setItem(storageKey, JSON.stringify(prodtvar));
                    }
                }

                $('#charm-tooltip').fadeIn(400);  

            }
            else{
                ondrag = false;
                $('#chain-tooltip').css('display',"none");
                $('#charm-tooltip').css('display',"none");
            }
         });
 		
         image.draggable({		
 			containment: '#draggable-area',
 			snap: "#snapArea",
 			snapTolerance: 5,
 			snapMode: "outer",
 	        start: function(e){                  
                    /*
 	        	obj = $(this);
				$name = obj.attr('id');
				$productId= $name.split('_')[1];
				$type= $name.split('_')[2];
				$(this).css({'z-index': ctrTooltip++}); 
				setOption = false;
				
				if(typeof prodtvar.charms[$productId] !== 'undefined')
				{
					if (typeof prodtvar.charms[$productId]['canvas'] !== 'undefined'){
						$('#charm-tooltip').html(prodtvar.charms[$productId]['canvas']);
						$('#itemTobeRemoved').val($productId);
						setOption = true;
					}
				}
				if (!setOption){
					showCanvasOptions($productId,$type,obj.position().left,obj.position().top);
				}
				
				$('#itemTobeUpdate').val($productId);
                    */
 	        },
 	        drag: function(){
                        $('#chain-tooltip').css('display',"none");
                        $('#charm-tooltip').css('display',"none");
                    /*
 	        	  $('#chain-tooltip').fadeOut(400); 
 	        	obj = $(this);
 	        	toolTipX = x = obj.position().left;
				toolTipy = y = obj.position().top-50;
				$('#charm-tooltip').css('top',y+'px');
				containerLeft = $('#draggable-area').offset().left + 30;
				
				if ($(window).width() < 954) {
					toolTipX = obj.position().left-300;
				}
				
				if ( $('.builder-image-container').hasClass('active') ) {
					moveTo = toolTipX+600;
					if (moveTo < containerLeft){
						moveTo = containerLeft;
					}
					  $('#charm-tooltip').css('left',moveTo+'px');  
					  
				  }else{
					  moveTo = toolTipX+300;
					  if (moveTo < containerLeft){
							moveTo = containerLeft;
						}
					  $('#charm-tooltip').css('left',moveTo+'px');  
				  }
				

				/* NOTE for Quick Menu to keep Open
				 * close option popup after 3 seconds 
				 * comment this function 
				 * - when need to close the menu only on outer click
				 */
                                /* 
			   setTimeout(function() {
					$('#charm-tooltip').fadeOut(400)
				}, 3000);
				
				*/
				
				ondrag = true;
				
 	        	
 	        },
 	        stop: function(){   
                        
                        /*
 	        	// update local storage
                        obj = $(this);
                        x = obj.position().left;
                        y = obj.position().top;
                        if (typeof prodtvar.charms[$productId] !== 'undefined')
                        {
                            prodtvar.charms[$productId]['imageY'] = y;
                            prodtvar.charms[$productId]['imageX'] = x;
                            // set Localstorage
                            if ("localStorage" in window) {
                                localStorage.setItem(storageKey, JSON.stringify(prodtvar));
                            }
                        } 
                    */
 	        }
 		});

        /* if ($(window).width() < 954) { 
	     	Draggable.create(image, {
				bounds: draggableArea,
				edgeResistance:0.65,
				type:"x,y",
				throwProps:true,
				liveSnap: true,
				snapMode: "outer",
				snap:{
					x: function(endValue) {
			            return Math.round(endValue / gridWidth) * gridWidth;
			        },
			        y: function(endValue) {
			            return Math.round(endValue / gridHeight) * gridHeight;
			        }
				},		
				onClick:function() {
					tooltip = $(this.target).data('name');
					pos = $(this.target).position();
		            xPos = pos.left;
		            yPos = pos.top-30;            
		            $(tooltip).css({top: yPos, left: xPos});             
		            $(tooltip).fadeIn(400); 
				},
				onDragStart:function() {
					tooltip = $(this.target).data('name');
		        	pos = $(this.target).position();
		        	$(tooltip).hide();
		            xPos = pos.left;
		            yPos = pos.top-30;
				},
				onDragEnd:function() {		
		            $(tooltip).css({top: yPos, left: xPos});
		        	$(tooltip).fadeIn(400); 
				}
			});
         }*/
 		
 		
		$('#draggable-area').prepend(image);
		
		
	}
	
	function productExistsInCart($productId){

		if (prodtvar.charms[$productId]){
			return true;
		}else{
			return false;
		}
	}
	
	//Selected Gorup product details 

	function setSelectedGroupDetails(){

		if ($('#combinedProductId').val()!=""){

			jQuery.ajax({
				type:'POST',
				async : true,
				url: builderUrl+"index/setDefaultProduct",
				data : {
					productId :$('#combinedProductId').val() ,
					type    :$('#requestType').val() 
				},
				success : function(data){

					$result = JSON.parse(data);
					$charms = $result['charms'];
					$chain  = $result['chain'];
                    $charmY = 0;
					if ($chain){

						for (i=0;i< $chain.length;i++) {

							prodtvar.chain[$chain[i]['productId']] = {
									product_id: $chain[i]['productId'], 
									attrs:  $chain[i]['option'],
									parent_id : $chain[i]['parentId'],
									price : $chain[i]['price'],
									image : $chain[i]['image'],
									sku : $chain[i]['sku'],
									imageHeight : $chain[i]['height'],
									imageWidth : $chain[i]['width']};


							$chainLink = $('#'+$chain[i]['parentId']);
							$chainLink.parents('li').addClass('selected');
							$chainLink.text('Selected');
							$charmY = Number($chain[i]['height'])>0 ? Number($chain[i]['height'])+paddingFromChain:0;
							$("#previousChainId").val($chain[i]['productId']);
							
			
							
						}
					}
					if ($charms){

						for (i=0;i< $charms.length;i++) {
							prodtvar.charms[$charms[i]['productId']] = {
									product_id: $charms[i]['productId'], 
									attrs:  $charms[i]['option'],
									custopt :$charms[i]['customOptions'],
									parent_id : $charms[i]['parentId'],
									price : $charms[i]['price'],
									image : $charms[i]['canvasImage'],
									imageWidth : $charms[i]['canvasImageWidth'],
									imageY :$charmY,
									type : $charms[i]['type'],
									hasparent : $charms[i]['parent']};
						}
					}
				},
				complete : function(){
					
					subTotalCalculation();
					setSelectedGroupImages();
					
					// set Localstorage
					 if ("localStorage" in window) {
						 localStorage.setItem(storageKey,JSON.stringify(prodtvar));
					 }
					
					
				}
			});

			
		}
	}
	
    function setProductFromLocalStorage(){
    	 if ("localStorage" in window) {
			var retrievedObject = localStorage.getItem(storageKey);
			prodtvar = JSON.parse(retrievedObject);
			subTotalCalculation();
			setSelectedGroupImages();
    	 }
	}


	// Set the individual items in the grouped products images in the canvas
	function setSelectedGroupImages(){

		objectCount = 0;
		imageList = [];
		imgs = [];
		imagesOK = 0;
      
		if(prodtvar.chain){
			for (var key in prodtvar.chain) {
				if (prodtvar.chain[key]['image']){
					$('#chainImage').attr('parentid',prodtvar.chain[key]['parent_id']);	
					$('#chainImage').attr('src',prodtvar.chain[key]['image']);
					$('#chainImage').css('display','block');
					$('#chainImage').attr('sku',prodtvar.chain[key]['sku']);
					
					// Edit chain length - set config details
					
					var parentContent = $('.configDetail[parentid='+ prodtvar.chain[key]['parent_id']+']').closest('.configDetail');
					setChainConfigDetials(parentContent);
				}
			}
		}

		if(prodtvar.charms){
			for (var key in prodtvar.charms) {
				if (prodtvar.charms[key]['image']){
					
					parts = prodtvar.charms[key]['product_id'].split('-');
					if (parts.lenght > 1){
						incr = Number(parts[1]);
						if (charmsIncrementer < incr){
							charmsIncrementer = incr;
						}
					}
					
					objectCount++;
					imgObj = [];
					imgObj['url'] = prodtvar.charms[key]['image'];
					imgObj['type'] = "charm";
					imgObj['width'] = prodtvar.charms[key]['imageWidth'];
					imgObj['imageY'] = typeof (prodtvar.charms[key]['imageY']) !=='undefined' ? prodtvar.charms[key]['imageY'] : null;
					imgObj['imageX'] = typeof (prodtvar.charms[key]['imageX'])!=='undefined'? prodtvar.charms[key]['imageX'] : null ;
					imgObj['id'] = "charm_"+prodtvar.charms[key]['product_id']+"_"+prodtvar.charms[key]['type'];
					
					imageList.push(imgObj);
				}
			}
		}

		for (var i=0; i<imageList.length; i++) {
			image = imageList[i];
			var img   = new Image();
			img.src   = image['url'];
			img.id    = image['id'];
			img.setAttribute('type',image['type']);
			img.setAttribute('data-width',image['width']);
			img.setAttribute('data-height',image['height']);
			img.setAttribute('data-y',image['imageY']);
			img.setAttribute('data-x',image['imageX']);
			imgs.push(img);
			/*img.onload = function(){ 
				imagesOK++; 
				if (imagesOK>=imageList.length ) {
					startDraw();
				}
			};*/
			

		}  
		startDraw();
	}

	function startDraw(){
		for (var i=0; i<imgs.length; i++) {

			img   = imgs[i];
			id    = img.id;
			type  = img.getAttribute('type');
			x     = img.getAttribute('data-x');
			y     = img.getAttribute('data-y');
			height     = img.getAttribute('data-height');
			width     =  img.getAttribute('data-width');
			
			
			if (x == null) x=0;if (height == null) height=0;
			if (y == null) y=0;if (width == null) width=0;
			
			
			drawImage(img,id,type,x,y,width,height);
		}
	}


	// function to get formatted price
	function getFormattedPrice($price){
		jQuery.ajax({
			type:'POST',
			async : false,
			url:   builderUrl+"index/getConvertedCurrency",
			data : {price:$price },
			success : function(data){
				$price = data;
			},
			complete : function(){
			}
		});
		return $price;
	}

	// add to cart

	function addToCart(){

		showAjaxLoading();
		var charmprodJsonString = JSON.stringify(prodtvar.charms);
		var chainprodJsonString = JSON.stringify(prodtvar.chain);

		jQuery.ajax({
			type:'POST',
			url: builderUrl+ "index/addToCart",
			data : {
				charms:charmprodJsonString,
				chain : chainprodJsonString },
				success : function(data){
					hideAjaxLoading();
					result = JSON.parse(data)
					if(result.status== "success"){
						location.href= $('#baseUrl').val()+"checkout/cart/";    
					}else{
						
						/*$('#buildError').css('display','block');
						$('#buildError').html(result.msg);
						  $('.necklace-filter-options li a')[1].click();
						hideAjaxLoading();*/

						if (result.stockErrors.length > 0 ){
							for (var i=0; i<result.stockErrors.length; i++ ){
								obj = result.optionErrors[i];
								if ( $('#charm_'+obj['id']+"_"+obj['type']).length > 0){
									$('#charm_'+obj['id']+"_"+obj['type']).addClass('blinking');								
								}
							}
						}
						
						else if (result.optionErrors.length > 0 ){
							for (var i=0; i<result.optionErrors.length; i++ ){
								obj = result.optionErrors[i];
								if ( $('#charm_'+obj['id']+"_"+obj['type']).length > 0){
									$('#charm_'+obj['id']+"_"+obj['type']).addClass('blinking');								
								}
							}
						}
						
						$('#buildError').css('display','block');
						$('#buildError').html(result.msg);
					        target = $('.necklace-filter-options li a').eq(1).attr('href');
						if (!($(target).hasClass('open'))){
							$('.necklace-filter-options li a')[1].click();
						}
						$("html, body").animate({ scrollTop: $('.necklace-builder-area').position().top}, "slow");
						hideAjaxLoading();
					}

				}
		});
	}
        
        // add to wishlist

	function addToWishlist(){
            
            var products = [];
            
            if(prodtvar.charms){
                for (var key in prodtvar.charms) {
                    if(prodtvar.charms[key]["product_id"]){
                       var productid = prodtvar.charms[key]["product_id"].split('-');
                       products.push(productid[0]);
                    }
                }
	    }
            
            if(prodtvar.chain){
                for (var key in prodtvar.chain) {
                    if(prodtvar.chain[key]["product_id"]){
                       products.push(prodtvar.chain[key]["product_id"]);
                    }
                }
	    }
            
            var wishlist_url = $('#baseUrl').val() + "wishlist/index/addmultiple/products/" + products.join("_") + '/form_key/' + $('#form_key').val() ;
            
            location.href = wishlist_url;
        }

	// check the product has sufficient quantity
function checkForStock(productId,stock){		
	
	status = "false";
	 if (!charmsStock[productId]){
	   charmsStock[productId] = Number(stock);
	 }
     productStock = charmsStock[productId];
	 count = 0 ;

	 if(prodtvar.charms){
	          
	 for (var key in prodtvar.charms) {

	                if(prodtvar.charms[key]["product_id"]){
	                   
	                    ckeckProduct = prodtvar.charms[key]["product_id"].split('-');
	                   
	                    if(ckeckProduct[0] == productId){
	                       
	                        count++;
	                    }

	                }
	            }
	    }
	     
	    status = (productStock >= (count+1)  ) ? "true": "false";
		return status;

	}


	
	// calculate subtotal
	function subTotalCalculation() {
		subTotal = 0;

		if(prodtvar.chain){
			for (var key in prodtvar.chain) {
				
			

				if (prodtvar.chain[key]['price']){
					subTotal = subTotal + Number(prodtvar.chain[key]['price']);		
				}
			}
		}

		if(prodtvar.charms){
			for (var key in prodtvar.charms) {
				if (prodtvar.charms[key]['price']){
					subTotal = subTotal + Number(prodtvar.charms[key]['price']);		
				}
			}
		}
		
		jQuery.ajax({
			
			type:'POST',
			async : true,
			url:   builderUrl+"index/getConvertedCurrency",
			data : {price:subTotal },
			success : function(data){
				$price = data;
				$('.subtotal-price').text($price);
				
			},
			complete : function(){
			}
		});
		
		
		
		

	}

	// Show loading..........
	function showAjaxLoading(){
		$('#ajaxLoader').css("display","block");
		$('#waitLoaderDiv').css("display","block");

	}

	// hide loading............
	function hideAjaxLoading(){
		$('#ajaxLoader').css("display","none");
		$('#waitLoaderDiv').css("display","none");
	}

	function triggerDataLoad(showLoad){
		currentScrollPage++;
		loadProductList(currentScrollPage,showLoad);
	}

	function isScrolledIntoView(elem) {
		var docViewTop = $('#charms .product-list-dropdown-inner').scrollTop()+$('.filter-options-box').height();
		var docViewBottom = docViewTop +$('#charms .product-list-dropdown-inner').height();

		var elemTop = $(elem).offset().top;
		var elemBottom =   elemTop + $(elem).height();

		return ((elemBottom <= docViewBottom));

	}

	function getFilters(){

		var filters = {};
		filters['search'] = $("#searchText").val();
		filters['sort']   = $('#sortAction').val();
		filters['charmsType'] = $('#charmsType').val();
		return filters;

	}
	
	function loadSlider(obj){
		
		obj.each(function (index,element){
		
			$(this).flexslider({
				animation: "slide",
				controlNav: $(this).find('.slides li').length > 4 ? false : true,
				animationSpeed: 700,
				pauseOnHover: true,
				slideshow: false,
				directionNav: false,       
                touch :  ($(this).find('.slides li').length)>1 ? true:false,

				initDelay: 0,
				start: function(slider) { // Fires when the slider loads the first slide
					var slide_count = slider.count - 1;

					$(slider)
					.find('img.lazy:eq(0)')
					.each(function() {
						var src = $(this).attr('data-src');
						$(this).attr('src', src).removeAttr('data-src');
					});

				},
				before: function(slider) { // Fires asynchronously with each slider animation

					var slides     = slider.slides,
					index      = slider.animatingTo,
					$slide     = $(slides[index]),
					$img       = $slide.find('img[data-src]'),
					current    = index,
					nxt_slide  = current + 1,
					prev_slide = current - 1;

					$slide
					.parent()
					.find('img.lazy:eq(' + current + '), img.lazy:eq(' + prev_slide + '), img.lazy:eq(' + nxt_slide + ')')
					.each(function() {
						var src = $(this).attr('data-src');
						$(this).attr('src', src).removeAttr('data-src');
					});

				},
			});
		})
		
	}

	function loadProductList(page,showLoad){ 
        if (showLoad == true){
        	showAjaxLoading();
        }
		jQuery.ajax({
			type:'POST',
			async : true,
			url: builderUrl+"index/getProductsByFilter",
			data : {

				filter : getFilters(),
				page : page
			},
			success : function(data){
				
				if (page > 1){
					var prev = $('.last-scroll-row');
					$('#charmsUl').append(data);
					prev.removeClass('last-scroll-row');
					$('#charmsUl').find('li:last').addClass('last-scroll-row');

				}else{
					$('#charmsUl').html(data);
				}

			},
			complete : function(){
				//charmsLoaded = "false";
				//  var defaultLoadElement = ["chains","charms"];
				obj =  $('.charms-slider'+page);
				loadSlider(obj); 
				scrollTriggered = 0;
                hideAjaxLoading();
                total = 0;
                if ($('.charmsTotalPages:last').val()){
                	total = Number($('.charmsTotalPages:last').val());
                }
                if($(window).width() < 955){
	                if (total<= page){
	    				$('.load-more-btn').css('display','none');
	    			}else{
	    				$('.load-more-btn').css('display','block');
	    			}
                }
			}
		});

	}

	function loadVariantSlider(name) {
		var sliderName = name.slice(1);
		var isTouchEnabled = true;
		
		//var isTouchEnabled = ($(window).width() < 954) ? false : true;

		isLoaded = false;
		isLoaded =  (sliderName=="charms") ?  charmsLoaded : chainsLoaded;

		if ( isLoaded == "false"){
			$("."+sliderName+'-material-slider').each( function (index,element){
				if (sliderName == "charms"){
					isTouchEnabled = 	($(this).find('.slides li').length)>1?true:false;
				}else{
					isTouchEnabled = 	($(this).find('.touchSlides li').length)>1?true:false;
				}
			$(this).flexslider({
				animation: "slide",
				controlNav: $(this).find('.slides li').length > 4 ? false : true,
				animationSpeed: 700,
				pauseOnHover: true,
				slideshow: false,
				directionNav: false,       
				touch: isTouchEnabled, 
			});
			});

			(sliderName == "charms") ?charmsLoaded = "true": chainsLoaded="true";
		}
	}

	function loadNecklaceSlick(){
		isInit = true;
		isNSlickLoaded = false;
	}

	// opacity values
	function getOpacityValue(num) {	

		if(num % 10 == 1 && num < 51 ) {oVal = 0;}
		else if(num % 10 == 2) {oVal = 0.1;}
		else if(num % 10 == 3) {oVal = 0.2;}
		else if(num % 10 == 4) {oVal = 0.3;}
		else if(num % 10 == 5) {oVal = 0.4;}
		else if(num % 10 == 6) {oVal = 0.5;}
		else if(num % 10 == 7) {oVal = 0.6;}
		else if(num % 10 == 8) {oVal = 0.7;}
		else if(num % 10 == 9) {oVal = 0.8;}
		else if(num % 10 == 0) {oVal = 0.9;}
		if(num > 50) {oVal = 1;}
		return oVal;
	}

	function setProductOptions(
			productId,
			categoryId,
			type,
			price,
			$parentId,
			productImageValue,
			sku,
			productType,
            custopt,image){

		// set bag to collect : used for add to cart function
		var attrVal = {};
		
		// get the chain product attributes
		jQuery.ajax({
			type:'POST',
			async:true,
			url: builderUrl+"index/getProductOptions",
			data : {
				productId   :productId,
				categoryId  : categoryId,
				parentId    : $parentId,
			},
			success : function(data){

				$result = JSON.parse(data);
				$option = $result['options'];
				$parentId = $result['parentId'];
               
				if ($option){
					for (var key in $option) {
						attrVal[parseInt(key)] = $option[key];
					} 
				}
				
				if (type=="chain"){
					
					//	sku = $('#defaultSku').val();				
						skinPath = $('#defaultSkinPath').val()+"chains/"; 
						
					//	imageSize = getImage(sku);						
						$sku = sku;
						
						
                // To get 3D image 
						prodtvar.chain[productId] = {
								product_id: productId, 
								attrs: attrVal,
								parent_id :$parentId,
								price : price};
						
						returnJson = '';
						jQuery.ajax({
							type:'POST',
							url: builderUrl+"index/getImage",
							async : true,
							data : {sku:$sku },
							success : function(data){
								if (data){
									imageSize = data;
									if(imageSize){
										imageSizeValues = JSON.parse(imageSize);
										prodtvar.chain[productId]['image'] = imageSizeValues.imagePath ;
										prodtvar.chain[productId]['imageHeight'] =  imageSizeValues.height ;

									}						

								}else{
									//	alert ('Product is not available currently');
									returnJson =  false;
									prodtvar.chain[productId]['image'] =  productImageValue; ;
								}
								
								
								$('#chainImage').attr('src',prodtvar.chain[productId]['image']);
								$('#chainImage').attr('parentid',$parentId);
								$('#chainImage').css('display','block');
								$('#chainImage').attr('sku',sku);
							
								
								subTotalCalculation();
								resetCharms();
							},
							complete:function (){
								// update local storage
								 if ("localStorage" in window) {
									 localStorage.setItem(storageKey,JSON.stringify(prodtvar));
								 }
								 
							}
						});

					}else{
                
						prodtvar.charms[productId] = {
								product_id: productId, 
								attrs: attrVal,
								parent_id :$parentId,
								price : price,
								type : productType,
								custopt:custopt
								};
						
						if (image){
							prodtvar.charms[productId]['image']  = image.src;
							prodtvar.charms[productId]['imageY'] = image.getAttribute('data-y');
							prodtvar.charms[productId]['imageX'] = image.getAttribute('data-x');
							prodtvar.charms[productId]['imageWidth']  = image.getAttribute('data-width');
						}
						
						
					}

				
				
			},
			complete : function(){
				subTotalCalculation();
				// update local storage
				
				 if ("localStorage" in window) {
					 localStorage.setItem(storageKey,JSON.stringify(prodtvar));
				 }
				 
				hideAjaxLoading();
			}
		});

		
	}
	
	/* reset charms after the chain selection
	 * to center of the tip  */
	function resetCharms(){
        chainHeight = 0;
        if(prodtvar.chain){
            for (var key in prodtvar.chain) {

                if (prodtvar.chain[key]['imageHeight']){
                    chainHeight = Number(prodtvar.chain[key]['imageHeight'])+5;
                }
            }
        }

       if (chainHeight){
		if (chainHeight> 1000){
			chainHeight = 1000;
		}
	 	 x = draggableArea.width() / 2 -10;
		 draggableArea.children('img').map(function(){
			 $(this).css('top',chainHeight+paddingFromChain);
			 $(this).css('left',(Number(x)+paddingCharms)- ($(this).width()/2));
			 
			 	$name        = $(this).attr('id');
				$productId   = $name.split('_')[1];
				$type        = $name.split('_')[2];
				
			
				if(typeof prodtvar.charms[$productId] !== 'undefined')
				{
					prodtvar.charms[$productId]['imageY'] = chainHeight+paddingFromChain;
					prodtvar.charms[$productId]['imageX'] = (Number(x)+paddingCharms)- ($(this).width()/2);
				}
		 });
		 
		 
		// update local storage
		 if ("localStorage" in window) {
			 localStorage.setItem(storageKey,JSON.stringify(prodtvar));
		 }
		 
        }
       
       
    }

	function loadMoreProducts(showLoading){		
		var row = $('.last-scroll-row');

		if ($('.charmsTotalPages:last').val() <= currentScrollPage){
			return ;  
		}
		var view = null;
		if($(window).width() > 954){
			 view = isScrolledIntoView(row);
		}else{
			view = true;
		}
		
	
		
		if (row.length && !scrollTriggered && view) {
			scrollTriggered = 1;
			triggerDataLoad(showLoading);
		}
	} 
    function clearStorage(){
    	Object.keys(localStorage).forEach(function(key){
    		if (key.indexOf('configure') !== -1){
    		   localStorage.removeItem(key);
    		}
    	});
    }
    
    // Change chain from canvas option 
	function changeChain (obj,selectedChainParent){
		
		  // get material attribute id of the parent product 
		  materialAttributeId = canvasOption.chain[selectedChainParent]['material_attribute_id'];
		  selectedMaterial= 0;
		  
		  // get the selected chain's material for the new chain
		  if (prodtvar.chain){
			  selectedMaterial   =  prodtvar.chain[Object.keys(prodtvar.chain)[0]]['attrs'][materialAttributeId];
		  }
		  
		 
		  
		  size = $(obj).find("option:selected").text();
		  
		  // get all materials available to the current size -
		  // ignore the size if the selected material does not have it
		  productMaterials = canvasOption.chain[selectedChainParent]['size'][size]['material'];
			
		  // check material exists - if no selected material details get the first one availabe in the selected size
		  selectedMaterial = selectedMaterial == 0 ? Object.keys(productMaterials)[0] : selectedMaterial;
		  selectedMaterial = productMaterials[selectedMaterial] ? selectedMaterial :  Object.keys(productMaterials)[0];
		   
		  // set new chain details
		  selectedProduct =  productMaterials[selectedMaterial];
		  productId = selectedProduct['productId'];
		  productPrice = selectedProduct['price'];
		  productPrice = productPrice.replace('$','').replace(',','');
		  productImageValue = '';
		  sku =  productMaterials[selectedMaterial]['sku'];
			
		  if (sku != $('#chainImage').attr('sku')){
			  // empty the current chain product details
			  prodtvar.chain = {};
			  setProductOptions(productId,68,"chain",productPrice,0,
					productImageValue,sku,'',{});
		  }
			
	 }

	// Show chain length details on chain image click
	function showChainOptions(x,y,parentId){
		 selectedChainParent = parentId; 
		 if (! Object.keys(canvasOption.chain[selectedChainParent]['size']).length >0){
			 return;
		 }
		    // set tooltip position
	        toolTipX = x;
			toolTipy = y-40;
			
			$('#chain-tooltip').css('top',toolTipy+'px');
			$('#chain-tooltip').css('left',toolTipX+'px');  
			 
			
		   $('#chain-tooltip').fadeIn(400); 
		   clearTimeout(timer);
		   timer = setTimeout(function() {
				$('#chain-tooltip').fadeOut(400)
		  }, 5000);
		  
		   
		 
		  if (canvasOption.chain[selectedChainParent]){
			 
			  // dynamically populate the sizelist
			  
			  var s = $("<select id=\"chainSizeOption\" class=\"dropdown-select chain-canvas-dropdown-select right \"/>");
			  var opts = [];
			  materialAttributeId = canvasOption.chain[selectedChainParent]['material_attribute_id'];
			  selectedMaterial    =  prodtvar.chain[Object.keys(prodtvar.chain)[0]]['attrs'][materialAttributeId];
			  
			  $.each(canvasOption.chain[selectedChainParent]['size'], function(val, obj) {
				  // TO DO : Remove after implementing material option
				  materialAttributeId = canvasOption.chain[selectedChainParent]['material_attribute_id'];
				  if (canvasOption.chain[selectedChainParent]['size'][val]['material'][selectedMaterial]){
					  $("<option />", {value: obj['optionId'], text: val}).appendTo(s);
				  }
				 
			  });	
			  
			 $("#chainSizeDiv").html(s);  
			 
			  $('#chainSizeOption').fancySelect({
					optionTemplate: function(optionEl) {
						return optionEl.text() ;
					}
			});
			 
			  // get current size of the chain to prepopulate
			  sizeAttributeId = canvasOption.chain[selectedChainParent]['size_attribute_id'];		
			  if (prodtvar.chain){
				  selectedSize   =  prodtvar.chain[Object.keys(prodtvar.chain)[0]]['attrs'][sizeAttributeId];
				  $('#chainSizeDiv .dropdown-select').val(selectedSize).trigger('change');
			  }
			 
		  }  
	}
	/***************************************** FUNCTIONS END ************************/

});

