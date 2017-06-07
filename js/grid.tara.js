$(document).ready(function(){
	
	$('.horizontal>.grid-container').isotope({
		itemSelector: '.grid-item',
		layoutMode:'cellsByColumn',
		cellsByColumn:{
			columnWidth:190,
			rowHeight:190
		}
	}); 
	
});