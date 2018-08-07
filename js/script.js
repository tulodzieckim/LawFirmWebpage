document.addEventListener('DOMContentLoaded', function () {

   // Configure slider
   $('#homeCarousel').carousel();




   // counters (and fadeTo) initialize on scroll and being visible
   const $window = $(window);
   const $elem = $('#customers');
   const animElements = $('.animation-group .animation-item');

   $(document).on('scroll', function counterUp() {
      if (isScrolledIntoView($elem, $window)) {
         inicjalizacja(); // counter init
         animRecursion(animElements); // fadeTo init
         $(document).off('scroll', counterUp);
      }
   })



})


// Check if element is visible (i.e. inside view screen)
function isScrolledIntoView($elem) {
   const docViewTop = window.scrollY;
   const docViewBottom = docViewTop + window.innerHeight;

   const elemTop = $elem.offset().top;
   const elemBottom = elemTop + $elem.height();

   return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

// counters
function inicjalizacja() {
   console.log('init');
   counters = document.querySelectorAll('.counter');
   for (let i = 0; i < counters.length; i++) {
      const maxNumber = counters[i].dataset.maxnumber | 0;
      const time = counters[i].dataset.time | 1000;
      counterInit(counters[i], maxNumber, time);
   }

   // Counters init default
   function counterInit(element, maxNumber, time) {
      let number = 0;

      const intervalHandler1 = setInterval(() => {
         number++;
         element.innerText = number;
         if (number >= maxNumber) {
            clearInterval(intervalHandler1);
         }
      }, time / maxNumber);
   }
};

function animRecursion(elements) {
   $(elements[0]).fadeTo('normal', 1, function () {
      this.splice(0, 1);
      animRecursion(this);
   }.bind(elements));
}