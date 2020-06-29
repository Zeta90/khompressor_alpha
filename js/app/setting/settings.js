




var settings_open = false;

$('.settings_led_btn').click(function () {
    console.log(9)
    if (settings_open == false) {
        settings_open = true;
        $('.kh_display_board').css('display', 'none');
        $('.kh_display_digital_pad').css('display', 'initial');
    } else {
        settings_open = false;
        $('.kh_display_board').css('display', 'initial');
        $('.kh_display_digital_pad').css('display', 'none');
    }

})