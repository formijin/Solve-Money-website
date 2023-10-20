$(window).scroll(function () {
  // Get the navbar element
  const navbar = $("nav");
  if ($(window).scrollTop() > 0) {
      navbar.addClass("sticky");
  } else {
      navbar.removeClass("sticky");
  }
});