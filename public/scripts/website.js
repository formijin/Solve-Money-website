$(window).scroll(function () {
  // Get the navbar element
  const navbar = $("nav");
  if ($(window).scrollTop() > 0) {
      navbar.addClass("sticky");
  } else {
      navbar.removeClass("sticky");
  }
});

function formatNumber(input) {
  // Remove non-numeric characters and leading zeros
  let value = input.value.replace(/\D+/g, '').replace(/^0+/, '');
  
  // Add commas to format the number
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  // Update the input value
  input.value = value;
}
function selectChip(element) {
  // Remove the 'active' class from all buttons within the parent element
  $(element).siblings().removeClass("active");
  // Add the 'active' class to the clicked button
  $(element).addClass("active");
}