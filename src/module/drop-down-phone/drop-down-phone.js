// menu and other
function menu(event) {

    var trigger = '.panelBtn',
        menuToggle = '.panelToggle',
        wrapParent = '.panelWrapper',
        $_menuItem = $(event.target).parent(wrapParent),
        $_panel = $_menuItem.find(menuToggle);


    if ($_menuItem.data('collapsed')) {
        $_menuItem.data('collapsed', false).removeClass('js-open').addClass('js-closed');
        $_panel.slideUp();
    } else {
        $_menuItem.data('collapsed', true).removeClass('js-closed').addClass('js-open');
        $_panel.slideDown();
    }
}

function resizeMenu() {
    var $_auxiliaryWrp = $('.resizeWrp'),
        $_auxiliaryPanel = $('.resizePanel');
    if ($(window).width() >= 768) {
        //$(menuToggle).data('collapsed', false)
        $_auxiliaryWrp.removeClass('js-closed').removeClass('js-open')
        $_auxiliaryPanel.removeAttr('style')
    }
}
$(window).on('resize orientationchange', function() {
    resizeMenu();
});
$('.panelBtn').on('click', function(e) {
    e.preventDefault();
    menu(event);
});
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
