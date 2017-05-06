$(document).ready(function(){
	$('.vertical>.grid-container').masonry({
		itemSelector:'.grid-item',
		gutter:10,
		fitWidth: true
	});
	$('.horizontal>.grid-container').isotope({
		itemSelector: '.grid-item',
		layoutMode:'cellsByColumn',
		cellsByColumn:{
			columnWidth:110,
			rowHeight:110
		}
	}); 
	
});