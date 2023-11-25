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