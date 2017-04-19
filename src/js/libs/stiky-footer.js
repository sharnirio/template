 ;
 // sript for stiky footer
 $(function() {
     var header = $(".header").outerHeight(true);
     var footer = $(".footer").outerHeight(true);;
     var sum = header + footer;
     var main_content = $(".main-content");
     var main_contentCSS = "calc(100vh - " + sum + "px)";
     $(main_content).css({ "min-height": main_contentCSS });
 });
