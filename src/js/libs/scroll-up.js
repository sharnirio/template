jQuery( document ).ready(function() {
	jQuery('#scrollup').click( function(){
		window.scroll(0 ,0);
		return false;
	});
});

jQuery( document ).ready(function() {
	jQuery('#scrollDown').click( function(){
		window.scroll(10000 ,10000);
		return false;
	});
});