var speed = 200, newWidth = 100;
var $content = $('.gl-events-box'); // Cache your selectors!

var actions = {
    scrollBar: function() {
        if($(window).width() > 992){
            if ($(this).scrollTop() > 124) {
                $('.nav-wrapper').addClass('navbar-fixed-top');
                //$('.navbar-brand').css("display", "block");
            } else {
                $('.nav-wrapper').removeClass('navbar-fixed-top');
                //$('.navbar-brand').css("display", "none");
            }
        }
    },
    resizer: function() {
        window.resizeEvt;
        $(window).resize(function() {
            clearTimeout(window.resizeEvt);
            window.resizeEvt = setTimeout(function(){

                if ($(window).width() < 988){
                    $('nav').addClass('navbar-fixed-top');
                    $('#navbrand').addClass('navbar-wrapper');
                    $('.player').css("margin-top", "0px");
                    $('#account-wrapper').removeClass('account-container-wrapper');
                    $('.top-menu-wrapper').css("display", "none");
                    //$('.top-menu-wrapper').css("display", "none");
                }

                if ($(window).width() > 988){
                    $('#account-wrapper').addClass('account-container-wrapper');
                    $('nav').removeClass('navbar-fixed-top');
                    $('#navbrand').removeClass('navbar-wrapper');
                    $('.player').css("margin-top", "-50px");
                    $('.top-menu-wrapper').css("display", "block");
                    //$('.top-menu-wrapper').css("display", "block");
                }
            }, 250);
        });
    },
    loopO: function () {
        if ($('.gl-events-box').css('margin-left').replace('px', '') <= '0') {
            $content.stop().animate({marginLeft: '+=20'}, speed, 'linear', actions.loopO);
        }
    },
    loopT: function () {
        if ($('.gl-events-box').css('margin-left').replace('px', '').replace('-', '') < (newWidth - 621)) {
            $content.stop().animate({marginLeft: '-=20'}, speed, 'linear', actions.loopT);
        }
    },
    stop: function () {
        $content.stop();
    }
};

var init = {
    set: function() {
        this.customActions();

        $(window).scroll(actions.scrollBar);
        $(window).bind('resize', actions.resizer);

        this.eventBoxEvents();
    },
    customActions: function() {
        if($(window).width() < 992){
            $('nav').addClass('navbar-fixed-top');
            $('#navbrand').addClass('navbar-wrapper');
            $('.player').css("margin-top", "0px");
            $('.top-menu-wrapper').css("display", "none");
            $('#account-wrapper').removeClass('account-container-wrapper');
        }

        if($(window).width() > 988) {
            $('#account-wrapper').addClass('account-container-wrapper');
            $('.top-menu-wrapper').css("display", "block")
        }
    },
    eventBoxEvents: function() {
        $('.gl-event').each(function(i, obj) {
            newWidth += $(obj).width();
        });
        $('.gl-events-box').width(newWidth);

        $('.event-arrow-left').hover(actions.loopO, actions.stop);
        $('.event-arrow-right').hover(actions.loopT, actions.stop);
        $('.event-box-arrow').mousedown(function() {
            speed = 100;
        }).bind('mouseup mouseleave', function() {
            speed = 200;
        }).hover(function() {
            //$(this).css('background-color', 'black');
        });
    }
};

$(document).ready(function() {
    init.set();
});
