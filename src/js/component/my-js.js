;

function startTimer(duration, display, display_text) {
    var timer = duration,
        seconds;
    var start_text = 'секунд';
    setInterval(function() {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.text(seconds);
        current_text = (timer == 1) ? 'секунду' :
            (timer == 4 || timer == 3 || timer == 2) ? 'секунды' :
            start_text;
        display_text.text(current_text);
        if (--timer < 0) {
            timer = duration;
            location.reload();
        }
    }, 1000);
}

jQuery(document).ready(function($) {
    'use strict';
    // ------------------My js-------------------------

    // sript for seach
    function seachFade() {
        var searcHeader = $(".header .btn-search");
        var searcInHeader = $(".header .search-in");
        searcHeader.click(function(e) {
            $(this).toggleClass("on");
            if (searcInHeader.css('display') == 'none') {
                searcInHeader.fadeIn(200);
            } else {
                searcInHeader.fadeOut(200);
            }
            e.preventDefault();
        });
    // закрытие поиска по клику в любом месте
    function clickDocument(event) {
        var clickDoc = $('.clickDoc');
        var div2 = $('header .btn-search')
        if (!clickDoc.is(event.target) // если клик был не по блоку
            && clickDoc.has(event.target).length === 0) { // и не по его дочерним элементам
            clickDoc.fadeOut(200);
            div2.removeClass("on");
        }
    }
    $(document).mouseup(function(event) { // событие клика по веб-документу
        clickDocument(event)
    });
    }
    seachFade();



    // menu and other
    function blockCollapsed(event) {

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

    function resizeblockCollapsed() {
        var $_auxiliaryWrp = $('.resizeWrp'),
            $_auxiliaryPanel = $('.resizePanel');
        if ($(window).width() >= 768) {
            //$(menuToggle).data('collapsed', false)
            $_auxiliaryWrp.removeClass('js-closed').removeClass('js-open')
            $_auxiliaryPanel.removeAttr('style')
        }
    }
    $(window).on('resize orientationchange', function() {
        resizeblockCollapsed();
    });
    $('.panelBtn').on('click', function(event) {
        event.preventDefault();
        blockCollapsed(event);
    });

/* Popup
* Website: http://dimsemenov.com/plugins/magnific-popup/
    ==========================================================================
*/
    function funcPopup() {
        // Image popups
        $('.js-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            removalDelay: 500,
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
            },
            callbacks: {
                beforeOpen: function() {
                    // just a hack that adds mfp-anim class to markup
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                    this.st.mainClass = this.st.el.attr('data-effect');
                }
            },
            closeOnContentClick: true,
            midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
        });


        $('.popup-show').magnificPopup({
            type: 'inline',
            preloader: false,
            focus: '#name',
            modal: true,
            callbacks: {
                beforeOpen: function() {
                    if ($(window).width() < 700) { this.st.focus = false; } else { this.st.focus = '#name'; }
                }
            }
        });
        $(document).on('click', '.mfp-close', function(e) {
            e.preventDefault();
            $.magnificPopup.close();
        });
        $(document).on('click', '.popup-close', function(e) {
            e.preventDefault();
            $.magnificPopup.close();
            location.reload();
        });
        if ($('.feedback-2').css('display') == 'block') { $('body').addClass('wrappOver'); } else { $('body').removeClass('wrappOver'); }
        $(document).on('click', '.hid-popup', function(e) {
            $('body').removeClass('wrappOver');
            $('.feedback-2').css('display', 'none');
            location.reload();
        });
    }
    funcPopup();

    /* jquery-match-height
        * Website: https://github.com/liabru/jquery-match-height
        ==========================================================================
    */

    function funcMatchHeight() {
        $('.match-height').matchHeight({
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        });
    };
    /* Scrollbar
    * Website: http://brm.io/jquery-match-height/
    ==========================================================================
    */
    function myScrollbar() {
        $('.scrollbar_inner').scrollbar();
    }
    myScrollbar();

    /* style inpyt
    * Website: http://dimox.name/jquery-form-styler
    ==========================================================================
    */

    $('.style-input input, .style-input select').styler();




    /* function ajaxStop
        ==========================================================================
    */

    $(document).ajaxStop(function() {
        funcPopup();
        funcMatchHeight();
        //sliderInit();
    });
    // ------------------My js END-------------------------


});
