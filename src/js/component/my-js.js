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

    // // sript for toggle Number
    // function toggleNumber() {
    //     var trigger = '.panelBtn',
    //         menuToggle = '.panelToggle',
    //         wrapParent = '.panelWrapper';

    //     function navigationMenu(event) {
    //         var $_menuItem = $(event.target).parents(wrapParent),
    //             $_panel = $_menuItem.find(menuToggle);


    //         if ($_menuItem.data('collapsed')) {
    //             $_menuItem.data('collapsed', false).removeClass('is-open').addClass('is-closed');
    //             $_panel.slideUp();
    //         } else {
    //             $_menuItem.data('collapsed', true).removeClass('is-closed').addClass('is-open');
    //             $_panel.slideDown();
    //         }
    //     }
    //     $(trigger).on('click', function(event) {
    //         navigationMenu(event);
    //     });
    // }
    // toggleNumber();

    // // sript for seach
    // function seachFade() {
    //     var searcHeader = $(".header .btn-search");
    //     var searcInHeader = $(".header .search-in");
    //     searcHeader.click(function(e) {
    //         $(this).toggleClass("on");
    //         if (searcInHeader.css('display') == 'none') {
    //             searcInHeader.fadeIn(200);
    //         } else {
    //             searcInHeader.fadeOut(200);
    //         }
    //         e.preventDefault();
    //     });
    // }
    // seachFade();

    // // sript for burger header
    // function headerBurger() {
    //     var menu = $(".header .nav-toggle_burger, .header .cancel-panel");
    //     var head = $(".header");
    //     menu.on("click", function() {
    //         if (head.hasClass("js-open")) {
    //             head.removeClass('js-open');
    //         } else head.addClass('js-open');
    //     });
    // }
    // headerBurger()

    // // sript for burger footer
    // function footerBurger() {
    //     var menu = $(".footer .nav-toggle_burger, .footer .cancel-panel");
    //     var head = $(".footer");
    //     menu.on("click", function() {
    //         if (head.hasClass("js-open")) {
    //             head.removeClass('js-open');
    //         } else head.addClass('js-open');
    //     });
    // }
    // footerBurger()

    // // sript for burger site bar
    // function siteBarBurger() {
    //     var menu = $(".site-bar .site-bar_mobile-menu__wraper");
    //     var head = $(".site-bar");
    //     menu.on("click", function() {
    //         if (head.hasClass("js-open")) {
    //             head.removeClass('js-open');
    //         } else head.addClass('js-open');
    //     });
    // }
    // siteBarBurger()



// ------------------My js END-------------------------

    // ---------------Globals js yulia---------------
    var $_win = $(window),
        $_html = $('html'),
        $_body = $('body'),

        //Breakpoint
        mobileBreakpoint = 480,
        tabletBreakpoint = 767,
        laptopBreakpoint = 992;

/* Popup
* Website: http://dimsemenov.com/plugins/magnific-popup/
    ==========================================================================
*/
    function funcPopup() {
        // Image popups
        $('.gallery').magnificPopup({
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

    /*
        @returns {*} window width
        ==========================================================================
    */
    function getWindowWidth() {
        return $_win.width();
    }
    /*
        @returns {boolean} true if mobile
        ==========================================================================
    */
    function isMobileResolution() {
        var isMobile = false;
        if (getWindowWidth() <= mobileBreakpoint) {
            isMobile = true;
        }
        return isMobile;
    }
    /*
        @returns {boolean} true if tablet
        ==========================================================================
    */
    function isTabletResolution() {
        var isTablet = false;
        if (getWindowWidth() <= tabletBreakpoint && getWindowWidth() >= mobileBreakpoint) {
            isTablet = true;
        }
        return isTablet;
    }

    /*
        @returns {boolean} true if tablet
        ==========================================================================
    */
    function isLaptopResolution() {
        var isLaptop = false;
        if (getWindowWidth() <= laptopBreakpoint && getWindowWidth() >= tabletBreakpoint) {
            isLaptop = true;
        }
        return isLaptop;
    }

    /*
        @returns {boolean} true if desktop
        ==========================================================================
    */
    function isDesktopResolution() {
        var isDesktop = false;
        if (getWindowWidth() >= laptopBreakpoint) {
            isDesktop = true;
        }
        return isDesktop;
    }

    /*
        @returns {boolean} true if desktop
        ==========================================================================
    */


    function checkWindowSize() {
        if (isMobileResolution()) {
            $_body.removeClass('no-mobile');
            $_body.addClass('is-mobile');
        } else {
            $_body.removeClass('is-mobile');
            $_body.addClass('no-mobile');

        }
        if (isTabletResolution()) {
            $_body.removeClass('no-tablet');
            $_body.addClass('is-tablet');
        } else {
            $_body.removeClass('is-tablet');
            $_body.addClass('no-tablet');

        }
        if (isLaptopResolution()) {
            $_body.removeClass('no-laptop');
            $_body.addClass('is-laptop');
        } else {
            $_body.removeClass('is-laptop');
            $_body.addClass('no-laptop');
        }

        if (isDesktopResolution()) {
            $_body.removeClass('no-desktop');
            $_body.addClass('is-desktop');
        } else {
            $_body.removeClass('is-desktop');
            $_body.addClass('no-desktop');
        }

    }
    checkWindowSize();






     /* function ajaxStop
        ==========================================================================
    */

    $(document).ajaxStop(function() {
        funcPopup();
        funcMatchHeight();
        //sliderInit();
    });

    /* function resize
        ==========================================================================
    */
    $_win.on('resize orientationchange', function() {
        funcMatchHeight();
        myScrollbar();
    });
    funcMatchHeight();
});
