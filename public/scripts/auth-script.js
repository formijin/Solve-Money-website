let currentPage = 0;

function showPage(pageIndex) {
    $(".form-card").each(function (index) {
        if (index === pageIndex) {
            $(this).css("display", "flex");
        } else {
            $(this).css("display", "none");
        }
    });
}

function handleNextClick() {
    if (currentPage < $(".form-card").length - 1) {
        currentPage++;
        showPage(currentPage);
    }
}

$(".next-btn").each(function () {
    $(this).on("click", handleNextClick);
});

showPage(currentPage);


$("#register-1").submit(function (event) {
    // Check if any input field is in an invalid state
    if ($(this).find('input:invalid').length > 0) {
        // alert("There are invalid inputs!");
        event.preventDefault(); // Prevent form from submitting
    }

});



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


// $('#password2').on('blur', function() {
//     const password1Value = $('#password1').val();
//     const password2Value = $(this).val();
//     const password1IsValid = $('#password1')[0].checkValidity();
//     const password2IsValid = $('#password2')[0].checkValidity();
    
//     // Reset rule colors to default first
//     $(".matchingRule, .otherRules").css('color', ''); 

//     if (password1Value !== password2Value) {
//         $(".matchingRule").css('color', 'red');
//     } 
    
//     if (!password1IsValid || !password2IsValid) {
//         $(".otherRules").css('color', 'red');
//     }
// });