let currentPage = tempUser||message? 1:0;


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



