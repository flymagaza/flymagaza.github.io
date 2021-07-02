$(document).ready(function () {

 


    let $btns = $('.filter span');
    $btns.click(function (e) {

        $('.filter span').removeClass('active');
        e.target.classList.add('active');
        $('.project-area .grid').isotope({
            layoutMode:'fitRows'                     
        });

        let selector = $(e.target).attr('data-filter');
        $('.project-area .grid').isotope({
            filter: selector                     
        });
        return false;
    })

    $('.filter #btn1').trigger('click');


        // Owl-carousel

        $('.site-main .about-area .owl-carousel').owlCarousel({
            loop: true,
            autoplay: true,
            dots: true,
            responsive: {
                0: {
                    items: 1
                },
                560: {
                    items: 2
                }
            }
        })

    // sticky navigation menu

    let nav_offset_top = $('.header_area').height();

    function navbarFixed() {
        if ($('.header_area').length) {
            $(window).scroll(function () {
                let scroll = $(window).scrollTop();
                if (scroll >= nav_offset_top) {
                    $('.header_area .main-menu').addClass('navbar_fixed');
                } else {
                    $('.header_area .main-menu').removeClass('navbar_fixed');
                }
            })
        }
    }

    navbarFixed();
});