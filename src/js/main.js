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

    $(function createBgElement(){
        container = document.createElement("div");
        container.className = "bg-holder";

        my_div = document.getElementById('fullpage-box');
        document.body.insertBefore(container, my_div);
    });


    $(function() {
        createFullPage();
    });

    function createFullPage() {
        if($(window).width() >= 520) {
            $('#fullpage').fullpage({
                anchors: ['intro', 'about', 'timeline','testimonials', 'contacts'],
                autoScrolling: true,
                scrollOverflow: true,
                verticalCentered: true,
                paddingTop: '0',
                scrollingSpeed: '800',
                navigation: true,
                navigationPosition: 'right',
                onLeave: function (index, nextIndex, direction) {
                    if (nextIndex == 2) {
                        $('.about-section').find('.flex-item:nth-child(1),.flex-item:nth-child(3)').delay(600).animate({
                            opacity: '1'
                        }, 100, 'easeOutQuint');
                        $('.flex-item:nth-child(2)').toggleClass('scale-box');

                    }
                }

            });
        } else {
            var vp_height = $(window).height();

            $(document).on('scroll', function () {
                setActiveSectionAnimation();
            });

            function setActiveSectionAnimation() {
                scroll_height = $(document).scrollTop();
                viewport_bottom = vp_height + scroll_height;
                $('.section').filter($filter_inview).addClass('active');
            }

            function $filter_inview(i, el) {
                var el = $(el);
                return (el.offset().top > scroll_height && el.offset().top < viewport_bottom)
            }
        }
    }


});



