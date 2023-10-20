let currentPage = 0;

function showPage(pageIndex) {
    $(".form-card").each(function(index) {
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

$(".next-btn").each(function() {
    $(this).on("click", handleNextClick);
});

showPage(currentPage);
