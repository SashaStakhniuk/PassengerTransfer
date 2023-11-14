const today = new Date();
const outputDateFormat = 'yyyy-MM-dd';

$(document).ready(function() {
    "use strict";

    /*==================================
* Author        : "ThemeSine"
* Template Name : Listrace directory HTML Template
* Version       : 1.0
==================================== */




    /*=========== TABLE OF CONTENTS ===========
    1. Scroll To Top 
    2. slick carousel
    3. welcome animation support
    4. feather icon
    5. counter
    ======================================*/

    // 1. Scroll To Top 
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 600) {
            $('.return-to-top').fadeIn();
        } else {
            $('.return-to-top').fadeOut();
        }
    });
    $('.return-to-top').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 1500);
        return false;
    });


    // 3. welcome animation support

    $(document).ready(function() {
        $(".welcome-hero-txt h2,.welcome-hero-txt p").removeClass("animated fadeInUp").css({ 'opacity': '0' });
        $(".welcome-hero-serch-box").removeClass("animated fadeInDown").css({ 'opacity': '0' });
    });

    $(document).ready(function() {
        $(".welcome-hero-txt h2,.welcome-hero-txt p").addClass("animated fadeInUp").css({ 'opacity': '0' });
        $(".welcome-hero-serch-box").addClass("animated fadeInDown").css({ 'opacity': '0' });
    });

    // 4. feather icon

    feather.replace();

    // 5. counter
    $(window).on('load', function() {
        $('.counter').counterUp({
            delay: 10,
            time: 800
        });
    });

});

$(document).ready(function() {
    initDatas();
    initEventListeners();
    showStep(1);
    initFormValidation();
});

function initDatas() {
    const setMinMaxDate = () => {
        const dateContainer = $('.form-box input[type = "date"]');
        const currentDate = new Date();
        const minDateString = parseDateToString(currentDate, "yyyy-MM-dd");
        dateContainer.attr("min", minDateString);
        dateContainer.attr("value", minDateString);
    };

    setMinMaxDate();
}

function scrollTo(element) {
    if (element && element.length) {
        $("html, body").animate({
            scrollTop: element.offset().top
        }, 1000);
    }
}

function initEventListeners() {

    $(".scroll-link").on('click', function(event) {
        event.preventDefault();
        scrollTo($(this.hash))
    });

    $(".open-modal-js").click(function() {
        $("#fullscreenModal").fadeIn();
        $("body").addClass("modal-open"); // Disable scrolling
    });

    // Close the modal
    $(".close").click(function() {
        $("#fullscreenModal").fadeOut();
        $("body").removeClass("modal-open"); // Enable scrolling
    });

    // Close the modal if clicked outside the content
    $(window).click(function(event) {
        if (event.target === $("#fullscreenModal")[0]) {
            $("#fullscreenModal").fadeOut();
            $("body").removeClass("modal-open"); // Enable scrolling
        }
    });


    // Handle click on steps
    $('.step').click(function() {
        let step = $(this).data('step');
        showStep(step);
    });


    $('.order-btn-js').click(function() {
        scrollTo($('#order'));
    });

    $(".change-number-btn").click(function(e) {
        e.preventDefault();

        const button = $(this);
        const input = button.siblings("input[type='number']");

        if (input.length) {
            const operation = button.data("operation");
            const currentValue = Number(input.val());
            const minValue = Number(input.attr("min")) || 0;

            if (operation === 'minus' && currentValue > minValue) {
                input.val(currentValue - 1);
            } else if (operation === 'plus') {
                input.val(currentValue + 1);
            }
        }
    });

    const faqList = $("#faq-list");
    const faqQuestions = faqList.find(".faq-list-item-question");

    faqQuestions.each(function() {
        $(this).click(function() {
            const icon = $(this).find(".faq-icon");
            icon.toggleClass("rotate-icon");
            const answer = $(this).next(".faq-list-item-answer");
            answer.slideToggle();
        });
    });

    const vehiclesSeiper = new Swiper('.vehicles-swiper', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 3,
        // autoHeight: true,
        centeredSlides: true,
        simulateTouch: true,
        spaceBetween: 10,
        grabCursor: true,
        autoplay: {
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: true
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            880: {
                slidesPerView: 2,
                centeredSlides: false,
            },
            1240: {
                slidesPerView: 3,
                centeredSlides: true,
            }
        },
        pagination: {
            el: '.vehicles-swiper .swiper-pagination',
        },
        navigation: {
            nextEl: '.vehicles-swiper .swiper-button-next',
            prevEl: '.vehicles-swiper .swiper-button-prev',
        },
    });

    const swiper = new Swiper('.reviews-swiper', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 1,
        autoHeight: false,
        simulateTouch: true,
        spaceBetween: 40,
        centeredSlides: true,
        grabCursor: true,
        autoplay: {
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: true
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 30
            },
        },
        pagination: {
            el: '.reviews-swiper .swiper-pagination',
        },
        navigation: {
            nextEl: '.reviews-swiper .swiper-button-next',
            prevEl: '.reviews-swiper .swiper-button-prev',
        },
    });

    if ($(window).width() < 580) {
        const swiper = new Swiper('.countries-swiper', {
            direction: 'horizontal',
            loop: false,
            slidesPerView: 1,
            autoHeight: true,
            simulateTouch: true,
            spaceBetween: 10,
            centeredSlides: true,
            grabCursor: true,
            autoplay: {
                delay: 1000,
                stopOnLastSlide: false,
                disableOnInteraction: true
            },
            pagination: {
                el: '.countries-swiper .swiper-pagination',
            },
        });
    }

    let currentStep = 1;
    showStep(currentStep);

    $(window).on('scroll', function() {
        // Calculate the position of each step section
        const steps = $('.step');
        const windowScrollTop = $(window).scrollTop() + (($(window).height() / 2) - 50);

        // Find the step section currently in view
        for (let i = 0; i < steps.length; i++) {
            const step = $(steps[i]);
            const stepTop = step.offset().top;

            if (windowScrollTop >= stepTop) {
                currentStep = step.data('step');
            }
        }

        showStep(currentStep);
    });

    $("#make-order-form").submit(function(event) {
        event.preventDefault();

        const form = $(this);

        const button = form.find(".order-btn");
        button.addClass("disabled");

        const formData = {
            addressFrom: form.find('input[name="addressFrom"]'),
            addressTo: form.find('input[name="addressTo"]'),
            date: form.find('input[name="date"]'),
            name: form.find('input[name="name"]'),
            phone: form.find('input[name="phone"]'),
            adultAmount: form.find('input[name="adultAmount"]'),
            kidsAmount: form.find('input[name="kidsAmount"]')
        }

        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                const value = formData[key].val().trim();

                if (!value) {
                    formData[key].closest('.data-box').addClass('error');

                    return;
                } else {
                    formData[key].closest('.data-box').removeClass('error');
                }
            }
        }

        if (formData.addressFrom.val().trim().split(" ").length < 3) {
            formData.addressFrom.closest('.data-box').addClass('error');
            button.removeClass("disabled");

            return;
        }

        if (formData.addressTo.val().trim().split(" ").length < 3) {
            formData.addressTo.closest('.data-box').addClass('error');
            button.removeClass("disabled");

            return;
        }

        const currentDate = new Date().setHours(0, 0, 0, 0);
        const formDate = new Date(formData.date.val()).setHours(0, 0, 0, 0);

        if (!isValidDate(formData.date.val()) || formDate < currentDate) {
            formData.date.closest('.data-box').addClass('error');
            button.removeClass("disabled");

            return;
        }

        console.log(formData.name.val().trim().split(" "));
        if (formData.name.val().trim().split(" ").length !== 2) {
            formData.name.closest('.data-box').addClass('error');
            button.removeClass("disabled");

            return;
        }

        const phoneNumberRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

        if (!phoneNumberRegex.test(formData.phone)) {
            formData.phone.closest('.data-box').addClass('error');
            button.removeClass("disabled");

            return;
        }

        if (+formData.adultAmount.val() < 1) {
            formData.adultAmount.closest('.data-box').addClass('error');
            button.removeClass("disabled");

            return;
        }

        if (+formData.kidsAmount.val() < 0) {
            formData.kidsAmount.closest('.data-box').addClass('error');
            button.removeClass("disabled");

            return;
        }

    });
}

function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString) && !isNaN(Date.parse(dateString));
}

function showStep(step) {
    $('.step').removeClass('active-step');
    $('[data-step="' + step + '"]').addClass('active-step');
}

function initFormValidation() {
    // $("form input[type='tel']").on("keydown", (e) => {
    //     if (isNaN(parseInt(String.fromCharCode(e.which)))) {
    //         e.preventDefault();
    //         return;
    //     }
    //     // let phoneNumber = e.target.value;
    //     // let phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

    //     // if (phoneRegex.test(phoneNumber)) {
    //     //     //alert('Valid phone number!');
    //     // } else {
    //     //     //alert('Invalid phone number! Please enter a valid international phone number.');
    //     // }
    // });
}


// let tg = {
//     token: "6223083628:AAHyIHQ-3b2weEIbbLheqCwLKLNO2LRNDrE",
//     chat_id: "-985036354"
// }

// const phoneRegex = /^\+38 \(0[0-9]{2}\) \d{2}-\d{2}-\d{3}$/;
// const letterRegex = /[a-zA-zа-яА-Я]+/;
// const numberRegex = /[\d]/;

// $(document).ready(function() {
//     setFormInputEventListeners();

//     $('#phone-input').inputmask("+38 (099) 99-99-999");

//     $("#call-me-form").submit(function(event) {
//         event.preventDefault();

//         const button = $("#submit-call");
//         button.addClass("disable");

//         let formData = new FormData(event.target)

//         const name = formData.get('name');
//         let phone = formData.get('phone');

//         if (!isDataValid({ name, phone })) {
//             button.removeClass("disable");
//             return;
//         }

//         phone = phone.replace(/[()-\s]/g, '');

//         sendTelegramMessage({ name, phone });
//     });
// });

// async function sendTelegramMessage(data) {
//     const { name = undefined, phone = undefined } = data;

//     if (!name || !phone) {
//         return;
//     }
//     const loader = $(".loader-block");
//     const button = $("#submit-call");
//     const successMessage = $("#success-message");
//     const failureMessage = $("#failure-message");

//     const textToSend = `\nХочу консультацію.\nІм'я: ${name}\nНомер телефону: ${phone}`;
//     // const fbPhone = await hash(phone.replace("+", ""));
//     const url = `https://api.telegram.org/bot${tg.token}/sendMessage`
//     const obj = {
//         chat_id: tg.chat_id,
//         text: textToSend
//     };

//     loader.addClass("flex-block");
//     button.addClass("disable");

//     window.setTimeout(() => {
//         loader.removeClass('flex-block');
//         successMessage.fadeIn(200);
//         button.removeClass("disable");
//         $('#call-me-form input').val('');

//     }, 5000);

//     try {
//         $.ajax({
//             url: url,
//             type: "POST",
//             contentType: "application/json; charset=UTF-8",
//             data: JSON.stringify(obj),
//             success: function(responseData) {
//                 loader.removeClass('flex-block');
//                 successMessage.fadeIn(200);
//                 $('#call-me-form input').val('');
//             },
//             error: function(xhr, status, error) {
//                 loader.removeClass('flex-block');
//                 failureMessage.fadeIn(200);
//             },
//             complete: function() {
//                 button.removeClass("disable");

//                 window.setTimeout(() => {
//                     successMessage.fadeOut(400);
//                     failureMessage.fadeOut(400);
//                 }, 5000);
//             }
//         });
//     } catch (e) {
//         console.log(e);

//         loader.removeClass('flex-block');
//         successMessage.fadeOut(400);
//         failureMessage.fadeOut(400);
//         button.removeClass("disable");
//     }
// }

// function setFormInputEventListeners() {
//     $('form #name').on('input', function(event) {
//         event.preventDefault();

//         const inputText = event.target.value;
//         const nonNumericAndNonSymbolText = inputText.replace(/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '');

//         if (nonNumericAndNonSymbolText !== inputText) {
//             event.target.value = nonNumericAndNonSymbolText;
//         }

//         const value = $(this).val();

//         if (value.length > 0) {
//             $(this).addClass('has-value');
//             $(this).parent().removeClass('invalid');
//         } else {
//             $(this).removeClass('has-value');
//             $(this).parent().addClass('invalid');
//         }
//     });

//     $('#phone-input').focusout(function(e) {
//         e.preventDefault();

//         const value = $(this).val()
//         if (value.length != 19 || !phoneRegex.test(value)) {
//             $(this).parent().addClass('invalid');
//         } else {
//             $(this).parent().removeClass('invalid');
//         }
//     });

//     $('#offert').change(function() {
//         const submitBtn = $("#submit-call");

//         if ($(this).is(':checked')) {
//             submitBtn.removeClass('disable');
//         } else {
//             submitBtn.addClass('disable');

//         }
//     });
// }

// function isDataValid(formDatas) {
//     const { name = undefined, phone = undefined } = formDatas;

//     if (!name || name.length < 3 || !letterRegex.test(name)) {
//         $('#name-input').parent().addClass('invalid');
//         return false;
//     }


//     if (!phone || !phone.length || !phoneRegex.test(phone)) {
//         $('#phone-input').parent().addClass('invalid');
//         return false;
//     }

//     return true;
// }

function parseStringToDate(dateString, intputDateFormat = "yyyy-MM-dd HH:mm") {
    const formatParts = intputDateFormat.match(/[a-zA-Z0-9]+/g);
    const dateParts = dateString.match(/\d+/g);

    if (!formatParts || !dateParts || formatParts.length !== dateParts.length) {
        throw new Error('Invalid date format or date string.');
    }

    const dateInfo = {
        year: 2000,
        month: 0,
        day: 1,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0
    };

    formatParts.forEach((token, i) => {
        const value = parseInt(dateParts[i], 10);

        switch (token) {
            case 'yyyy':
                dateInfo.year = value;
                break;
            case 'MM':
                dateInfo.month = value - 1;
                break;
            case 'dd':
                dateInfo.day = value;
                break;
            case 'HH':
                dateInfo.hours = value;
                break;
            case 'mm':
                dateInfo.minutes = value;
                break;
            case 'ss':
                dateInfo.seconds = value;
                break;
            case 'SSS':
            case 'SS':
                dateInfo.milliseconds = value;
                break;
        }
    });

    return new Date(dateInfo.year, dateInfo.month, dateInfo.day, dateInfo.hours, dateInfo.minutes, dateInfo.seconds, dateInfo.milliseconds);
}

function parseDateToString(date, outputDateFormat = "yyyy-MM-dd HH:mm") {
    if (!(date instanceof Date && !isNaN(date))) {
        throw new Error('Invalid date format');
    }

    const tokens = outputDateFormat.match(/[a-zA-Z0-9]+/g);

    if (!tokens) {
        throw new Error('Invalid dateFormat.');
    }

    const uniqueTokens = [...new Set(tokens)];

    let formatted = outputDateFormat;

    uniqueTokens.forEach(token => {
        let replacement = '';

        switch (token) {
            case 'yyyy':
                replacement = date.getFullYear();
                break;

            case 'MM':
                replacement = date.getMonth() + 1;
                break;

            case 'dd':
                replacement = date.getDate();
                break;

            case 'HH':
                replacement = date.getHours();
                break;

            case 'mm':
                replacement = date.getMinutes();
                break;

            case 'ss':
                replacement = date.getSeconds();
                break;

            case 'SSS':
            case 'SS':
                replacement = date.getMilliseconds();
                break;

            default:
        }

        formatted = formatted.replace(token, replacement);
    });

    if (formatted) {
        return formatted;
    }

    throw new Error('Invalid date format');
}