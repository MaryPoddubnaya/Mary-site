$(document).ready(function () {

    // hide-menu
    $('.nav-link').on('click', function (e) {
        e.preventDefault();
        $('.main-nav').toggleClass('hide-mobile');
    });

    //textillate plugin
    $('.animate-heading').textillate({
        in: { effect: 'bounce' }
    });

    $('.animate-heading').on('inAnimationEnd.tlt', function () {
        $('.hidden-animation').addClass('animate-subheading');
        $('.animate-subheading').textillate({
            minDisplayTime: 2000,
            initialDelay: 1,
            in: {
                effect: 'fadeIn',
                delayScale: 1,
                delay: 50
            }
        });
    });

    $('#fullpage').fullpage({
        anchors: ['intro', 'about', 'timeline', 'portfolio', 'testimonials', 'contacts'],
        verticalCentered: true,
        scrollOverflow: true,
        paddingTop: '0',
        scrollingSpeed: '800',
        navigation: true,
        navigationPosition: 'right',
        responsiveWidth: 1100

    });

});

