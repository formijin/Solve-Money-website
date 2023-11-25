
$('.otp-input').each(function (index, input) {
    $(input).on('input', function () {
        if ($(this).val()) {
            if (index < $('.otp-input').length - 1) {
                $('.otp-input').eq(index + 1).focus();
            }
        } else if (index > 0) {
            $('.otp-input').eq(index - 1).focus();
        }
    });
});


