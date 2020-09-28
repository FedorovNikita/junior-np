var wow = new WOW(
    {
        boxClass: 'wow',      // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 0,          // distance to the element when triggering the animation (default is 0)
        mobile: true,       // trigger animations on mobile devices (default is true)
        live: true,       // act on asynchronously loaded content (default is true)
        callback: function (box) {
            // the callback is fired every time an animation is started
            // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null // optional scroll container selector, otherwise use window
    }
);
wow.init();

//   var rellax1 = new Rellax('.circle1');

//   var rellax2 = new Rellax('.circle2');

//   var rellax3 = new Rellax('.chart');
var e = new ScrollMagic.Controller;
var p = new ScrollMagic.Scene({
    triggerElement: ".form-footer",
    triggerHook: 0.5,
    duration: "200%"
}).setTween(".chart", 1, {rotation: 360}).addTo(e);
var p = new ScrollMagic.Scene({
    triggerElement: ".what",
    triggerHook: 1,
    duration: "200%"
}).setTween(".circle2", 1, {rotation: 360}).addTo(e);

let mainMenu = document.querySelector('.menu-header');
let sandwich = document.querySelector('.sandwich');

sandwich.addEventListener('click', function () {
    sandwich.classList.toggle('sandwich--active');
    mainMenu.classList.toggle('menu-header--active');

    if (!mainMenu.classList.contains('menu-header--active') && document.body.clientWidth < 768) {
        document.body.style.overflow = "auto";
    }
    
})


$('.menu-header a,.button-header').on('click', function () {
    sandwich.classList.toggle('sandwich--active');
    mainMenu.classList.toggle('menu-header--active');
    // window.scrollTo(0,0);
    var el = $(this);
    var dest = el.attr('href'); // получаем направление
    if (dest !== undefined && dest !== '') { // проверяем существование
        $('html').animate({
                scrollTop: $(dest).offset().top - 100 // прокручиваем страницу к требуемому элементу
            }, 500 // скорость прокрутки
        );
        $('body').removeClass('show-mobile-menu');
    }
    return false;
});


$('form').on('submit', (event) => {
    event.preventDefault();

    let form = $(event.target);
    let formData = new FormData(form[0]);

    // for(let [name, value] of formData) {
    //     console.log(`${name} = ${value}`); // key1=value1, потом key2=value2
    // }

    $.ajax({
        type: "post",
        url: "https://functions.yandexcloud.net/d4ernf6cb1odnptnu2bf",
        data: formData,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        cache: false,
        success(msg) {
            if (msg === '{"message": "ok"}') {
                // location.replace("success.html");
                $('#button-submit').prop("disabled", true);
                $('#button-submit').text("Заявка принята!");

            } else if (msg == "success-ask") {
                console.log("Вопрос отправлен");
                $(".ask button").text('Вопрос отправлен');
                $('.ask button').prop('disabled', true);
            }
        }
    })
});

$('.accordion').accordion({
    heightStyle: 'content',
    header: '> .accordion-item > .accordion-header',
    collapsible: true,
    active: false
});

$("select").selectize({
    scrollDuration: 1000,
    // persist: false,
    create: false,
    placeholder: "Предпочитаемый курс",
});


$(window).on('load resize', function () {
    if ($(window).width() < 767) {
        $('.gallery-mobile:not(.slick-initialized)').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true,
            arrows: false,
        });
    } else {
        $(".gallery-mobile.slick-initialized").slick("unslick");
    }
});

let selectizeControl = document.querySelector('.selectize-control');
let selectize = document.querySelector('.selectize-input');
let selec = document.querySelector('.selectize-input.not-full');
let selectizeDropdown = document.querySelector('.selectize-dropdown');

selec.addEventListener('click', () => {
    selec.classList.toggle('dropdown-active');
    selec.classList.toggle('input-active');
    selec.classList.toggle('focus');
    if (selec.classList.contains('dropdown-active')) {
        selectizeDropdown.style.display = "block";
    } else {
        selectizeDropdown.style.display = "none";
    }
})

selectizeControl.addEventListener('click', () => {
    if(selectize.classList.contains('dropdown-active')) {
        selectizeDropdown.classList.add('selectize-dropdown-active')
    } else {
        selectizeDropdown.classList.remove('selectize-dropdown-active')
    }
    
})

let org = document.getElementById('org');
let mainHeader = document.querySelector('.main-header');
let menuHeader = document.querySelector('.menu-header');

document.addEventListener('scroll', () => {
    if (window.pageYOffset + 83 > org.offsetTop) {
        mainHeader.classList.add('header-dark');
    } else {
        mainHeader.classList.remove('header-dark');
    }

    
    if (document.body.clientWidth < 768) {
        if (menuHeader.classList.contains('menu-header--active')) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }
})

let logoLink = document.querySelector('.logo');
logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
})