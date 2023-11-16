const today = new Date();
const outputDateFormat = 'yyyy-MM-dd';
const postalCodeRegex = /^[a-zA-Z\s]*[0-9\s-]+[a-zA-Z\s]*$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const nameRegex = /^[a-zA-Zа-яА-ЯґҐєЄіІїЇ]{2,}\s[a-zA-Zа-яА-ЯґҐєЄіІїЇ]{2,}$/;
const phoneNumberRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
//const phoneNumberRegex = /^\+38 \(0[0-9]{2}\) \d{2}-\d{2}-\d{3}$/;
const mainForm = $('#make-order-form');
const tg = {
    token: "6976184116:AAH1cIq40dzwXLWwVYj4NRX0zp927B4dKag",
    chat_id: "-4089559580"
}

$(document).ready(function() {
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
    initFormValidation();
});

function getFormInputs(form = mainForm) {
    if (!form) {
        return;
    }

    return {
        addressFrom: form.find('input[name="addressFrom"]'),
        addressTo: form.find('input[name="addressTo"]'),
        date: form.find('input[name="date"]'),
        name: form.find('input[name="name"]'),
        phone: form.find('input[name="phone"]'),
        adultAmount: form.find('input[name="adultAmount"]'),
        kidsAmount: form.find('input[name="kidsAmount"]'),
        additionalInfo: form.find('textarea[name="additionalInfo"]')
    }
}

function initDatas() {
    const formInputs = getFormInputs();

    if (!formInputs) {
        return;
    }

    const currentDate = new Date();
    const maxDate = new Date(currentDate);
    maxDate.setDate(maxDate.getDate() + 30);

    const datePickerFormat = "dd.MM.yyyy";
    const minDateString = parseDateToString(currentDate, datePickerFormat);
    const maxDateString = parseDateToString(maxDate, datePickerFormat);

    const dateContainer = formInputs.date;

    if (!dateContainer.length) {
        return;
    }

    dateContainer.pickadate({
        min: minDateString,
        max: maxDateString,
        format: 'dd.mm.yyyy',
        clear: '',
        today: '',
        onStart: function() {
            this.set('select', currentDate);
        },
        onSet: function(context) {
            if (!context.select) {
                return;
            }

            const selectedDay = new Date(context.select);
            const selectedDayString = parseDateToString(selectedDay, "yyyy-MM-dd");
            dateContainer.attr("value", selectedDayString);
            dateContainer.attr("min", minDateString);
            dateContainer.attr("max", maxDateString);
        }
    });

    formInputs.phone.inputmask("+38 (099) 99-99-999");
}

function resetFormInputs(form) {
    const formInputs = getFormInputs(form);

    if (!formInputs) {
        return;
    }

    formInputs.addressFrom.val("");
    formInputs.addressTo.val("");
    formInputs.date.val(formInputs.date.attr("min"));
    formInputs.name.val("");
    formInputs.phone.val("");
    formInputs.adultAmount.val(formInputs.adultAmount.attr("min"));
    formInputs.kidsAmount.val(formInputs.kidsAmount.attr("min"));
    formInputs.additionalInfo.val("");
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
        $("body").addClass("modal-open");
    });

    $(".close").click(function() {
        $("#fullscreenModal").fadeOut();
        $("body").removeClass("modal-open");
    });

    $(window).click(function(event) {
        if (event.target === $("#fullscreenModal")[0]) {
            $("#fullscreenModal").fadeOut();
            $("body").removeClass("modal-open");
        }
    });

    $('.step').click(function() {
        let step = $(this).data('step');
        showStep(step);
    });

    showStep(1);

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
            answer.slideToggle("slow");
        });
    });

    const vehiclesSeiper = new Swiper('.vehicles-swiper', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 3,
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

    let countriesSwiper;

    function toogleCountriesSwiper() {
        if ($(window).width() <= 580) {
            countriesSwiper = new Swiper('.countries-swiper', {
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
        } else {
            if (countriesSwiper) {
                countriesSwiper.destroy();
            }
        }
    }

    toogleCountriesSwiper();

    $(window).resize(function() {
        toogleCountriesSwiper()
    });

    let currentStep = 1;
    showStep(currentStep);

    $(window).on('scroll', function() {
        const steps = $('.step');
        const windowScrollTop = $(window).scrollTop() + (($(window).height() / 2) - 50);

        for (let i = 0; i < steps.length; i++) {
            const step = $(steps[i]);
            const stepTop = step.offset().top;

            if (windowScrollTop >= stepTop) {
                currentStep = step.data('step');
            }
        }

        showStep(currentStep);
    });

    $('form input[name="name"]').on('input', function(event) {
        event.preventDefault();

        const inputText = event.target.value;
        const nonNumericAndNonSymbolText = inputText.replace(/[0-9!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]/g, '');

        if (nonNumericAndNonSymbolText !== inputText) {
            event.target.value = nonNumericAndNonSymbolText;
        }

        const value = $(this).val();
        const wordsInName = value.trim().split(" ");

        if (wordsInName.length !== 2) {
            $(this).closest(".data-box").addClass('error');
        } else {
            for (let i = 0; i < wordsInName.length; i++) {
                if (wordsInName[i].length < 2 || wordsInName[i].split('').every(char => char === '-')) {
                    $(this).closest(".data-box").addClass('error');
                    return;
                }
            }

            $(this).closest(".data-box").removeClass('error');
        }
    });

    // $('form input[name="phone"]').on('focusout', function(e) {
    //     e.preventDefault();

    //     const value = $(this).val()
    //     if (value.length != 19 || !phoneNumberRegex.test(value)) {
    //         $(this).closest('.data-box').addClass('error');
    //     } else {
    //         $(this).closest(".data-box").removeClass('error');
    //     }
    // });

    // $('#offert').change(function() {
    //     const submitBtn = $("#submit-call");

    //     if ($(this).is(':checked')) {
    //         submitBtn.removeClass('disable');
    //     } else {
    //         submitBtn.addClass('disable');

    //     }
    // });

    mainForm.submit(function(event) {
        event.preventDefault();

        const form = $(this);
        const formData = getFormInputs(form);

        if (!formData) {
            return;
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

        const addressFrom = formData.addressFrom.val().trim();

        if (!isAddressValid(addressFrom)) {
            formData.addressFrom.closest('.data-box').addClass('error');

            return;
        }

        const addressTo = formData.addressTo.val().trim();

        if (!isAddressValid(addressTo)) {
            formData.addressTo.closest('.data-box').addClass('error');

            return;
        }

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const formDateValue = formData.date.attr("value");
        const formDate = new Date(formDateValue);
        formDate.setHours(0, 0, 0, 0);

        if (!isValidDate(formDateValue) || formDate < currentDate) {
            formData.date.closest('.data-box').addClass('error');

            return;
        }

        const passengerName = formData.name.val().trim();

        if (!nameRegex.test(passengerName)) {
            formData.name.closest('.data-box').addClass('error');

            return;
        }

        let passengerPhoneNumber = formData.phone.val().trim();
        passengerPhoneNumber = passengerPhoneNumber.replace(/[()-\s]/g, '');

        if (!phoneNumberRegex.test(passengerPhoneNumber)) {
            formData.phone.closest('.data-box').addClass('error');

            return;
        }

        const adultPassengersAmount = +formData.adultAmount.val();

        if (adultPassengersAmount < 1 || adultPassengersAmount > 100) {
            formData.adultAmount.closest('.data-box').addClass('error');

            return;
        }

        const kidsPassengersAmount = +formData.kidsAmount.val();

        if (kidsPassengersAmount < 0 || kidsPassengersAmount > 100) {
            formData.kidsAmount.closest('.data-box').addClass('error');

            return;
        }

        const additionalInfo = formData.additionalInfo.val().trim();

        if (additionalInfo.length > 300) {
            formData.additionalInfo.closest('.data-box').addClass('error');

            return;
        }

        const textToSend = `
        \nХочу забронювати місце. Мої дані:
        \nІм'я: ${passengerName}
        \nНомер телефону: ${passengerPhoneNumber}
        \nЗвідки: ${addressFrom}
        \nКуди: ${addressTo}
        \nКоли: ${parseDateToString(formDate, "dd.MM.yyyy")}
        \nДорослих: ${adultPassengersAmount}
        \nДітей: ${kidsPassengersAmount}
        \nДодаткова інформація: ${additionalInfo}`;

        sendTelegramMessage(form, textToSend);
    });
}

function isAddressValid(address) {
    if (!address) {
        return false;
    }

    const isValidPostalCode = postalCodeRegex.test(address);
    const addressLength = address.length;
    const wordsInAddress = address.split(" ").length;

    if (!isValidPostalCode || (wordsInAddress === 1 && addressLength < 3)) {
        if (wordsInAddress < 1) {
            return false;
        }
    }

    return true;
}

function isValidDate(dateString) {
    return dateRegex.test(dateString) && !isNaN(Date.parse(dateString));
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

async function sendTelegramMessage(form, text) {
    if (!form.length || !text) {
        return;
    }

    const button = form.find(".order-btn").addClass("disabled loading");
    const messagesBlock = form.find(".messages-block");
    const successMessage = messagesBlock.find("#success-message");
    const failureMessage = messagesBlock.find("#failure-message");

    const url = `https://api.telegram.org/bot${tg.token}/sendMessage`
    const obj = {
        chat_id: tg.chat_id,
        text: text
    };

    try {
        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(obj),
            success: function(responseData) {
                successMessage.fadeIn(200);

                console.log("Ok");
            },
            error: function(xhr, status, error) {
                failureMessage.fadeIn(200);

                console.log("failure");
            },
            complete: function() {
                button.removeClass("disabled loading");
                // form.find('input').val('')
                resetFormInputs(form);

                window.setTimeout(() => {
                    successMessage.fadeOut(500);
                    failureMessage.fadeOut(500);
                }, 10000);
            }
        });
    } catch (e) {
        console.log(e);

        button.removeClass("disabled loading");
        successMessage.fadeOut(500);
        failureMessage.fadeOut(500);
    }
}

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