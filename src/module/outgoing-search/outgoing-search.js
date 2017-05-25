// sript for seach
function seachFade() {
    var searcHeader = $(".outgoing-search .btn-search");
    var searcInHeader = $(".outgoing-search .search-in");
    searcHeader.click(function(e) {
        $(this).toggleClass("on");
        if (searcInHeader.css('display') == 'none') {
            searcInHeader.fadeIn(200);
        } else {
            searcInHeader.fadeOut(200);
        }
        e.preventDefault();
    });
}
seachFade();
// закрытие поиска по клику в любом месте
function clickDocument(event) {
        var div = $('.clickDoc');
        var div2 = $('header .btn-search')
        if (!div.is(event.target) // если клик был не по блоку
            && div.has(event.target).length === 0) { // и не по его дочерним элементам
            $('.clickDoc').fadeOut(200);
            div2.removeClass("on");
        }
    }
    $(document).mouseup(function(event) { // событие клика по веб-документу
        clickDocument(event)
});