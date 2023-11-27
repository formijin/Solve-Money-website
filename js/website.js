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

  calculateLoanTerm();
}
function selectChip(element) {
  // Remove the 'active' class from all buttons within the parent element
  $(element).siblings().removeClass("active");
  // Add the 'active' class to the clicked button
  $(element).addClass("active");

  calculateLoanTerm();

}

function calculateLoanTerm() {
  const principle = parseFloat($("#loan-amount").val().replace(/\D+/g, '').replace(/^0+/, ''));
  console.log(principle);

  const tenure = parseFloat($(".chips.active").attr('id'));
  console.log(tenure);

  if (isNaN(principle) || isNaN(tenure)) {
    console.log("Invalid principle or tenure value. Please check your input.");
    return;
  }

  const rate = tenure > 9 ? 0.05 : 0.09;
  console.log(rate);

  const totalPayment = (rate * principle * tenure) + principle;
  console.log(totalPayment);

  $('#principle').text('₦ ' + principle.toLocaleString('en-US'));
  $('#rate').text((rate*100)+'%');
  $('#totalPayment').text('₦ '+ totalPayment.toLocaleString('en-US'));
}


// Carousel 
document.querySelector('.prev').addEventListener('click', function() {
  changeSlide(-1);
});

document.querySelector('.next').addEventListener('click', function() {
  changeSlide(1);
});

let slideIndex = 0;
showSlide(slideIndex);

function changeSlide(n) {
  showSlide(slideIndex += n);
}

function showSlide(n) {
  let slides = document.querySelectorAll('.carousel-item');
  if (n >= slides.length) {
      slideIndex = 0;
  } else if (n < 0) {
      slideIndex = slides.length - 1;
  }

  for (let slide of slides) {
      slide.style.display = 'none';
  }
  slides[slideIndex].style.display = 'flex';
}

