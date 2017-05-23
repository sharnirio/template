//header clic
function clicFunction() {
	var clicClass = $('.header-h2');
	var clicClass2 = $('.header-h2_2');
        clicClass.click(function() {
        	clicClass2.slideToggle(300);
        });
        console.log("test-console2");
    }
    clicFunction();