(function ($) {
 "use strict";

 // MENU
 $(".navbar-collapse a").on("click", function () {
  $(".navbar-collapse").collapse("hide");
 });

 // CUSTOM LINK
 $(document).ready(function () {
  // Show/hide the "Navigate to Top" icon based on scroll position
  $(window).scroll(function () {
   if ($(this).scrollTop() > 100) {
    // Adjust the scroll amount as needed
    $(".navbar-icon").removeClass("hidden");
   } else {
    $(".navbar-icon").addClass("hidden");
   }
  });

  // Smooth scroll to top when the icon is clicked
  $(".navbar-icon").click(function () {
   var header_height = $(".navbar").height(); // Adjust to your header's height
   var totalScroll = 0;

   $("body,html").animate(
    {
     scrollTop: totalScroll,
    },
    800
   );
   return false;
  });

  function isScrollIntoView(elem, index) {
   var docViewTop = $(window).scrollTop();
   var docViewBottom = docViewTop + $(window).height();
   var elemTop = $(elem).offset().top;
   var elemBottom = elemTop + $(window).height() * 0.5;
   if (elemBottom <= docViewBottom && elemTop >= docViewTop) {
    $(elem).addClass("active");
   }
   if (!(elemBottom <= docViewBottom)) {
    $(elem).removeClass("active");
   }
   var MainTimelineContainer = $("#vertical-scrollable-timeline")[0];
   var MainTimelineContainerBottom =
    MainTimelineContainer.getBoundingClientRect().bottom -
    $(window).height() * 0.5;
   $(MainTimelineContainer)
    .find(".inner")
    .css("height", MainTimelineContainerBottom + "px");
  }

  var timeline = $("#vertical-scrollable-timeline li");
  Array.from(timeline).forEach(isScrollIntoView);
 });

 //  carousal
 var multipleCardCarousel = document.querySelector("#carouselExampleControls");

 if (window.matchMedia("(min-width: 576px)").matches) {
  var carousel = new bootstrap.Carousel(multipleCardCarousel, {
   interval: false,
  });
  var carouselWidth = $(".carousel-inner")[0].scrollWidth;
  var cardWidth = $(".carousel-item").width();
  var scrollPosition = 0;
  $("#carouselExampleControls .carousel-control-next").on("click", function () {
   if (scrollPosition < carouselWidth - cardWidth * 3) {
    scrollPosition += cardWidth;
    $("#carouselExampleControls .carousel-inner").animate(
     { scrollLeft: scrollPosition },
     600
    );
   }
  });
  $("#carouselExampleControls .carousel-control-prev").on("click", function () {
   if (scrollPosition > 0) {
    scrollPosition -= cardWidth;
    $("#carouselExampleControls .carousel-inner").animate(
     { scrollLeft: scrollPosition },
     600
    );
   }
  });
 } else {
  $(multipleCardCarousel).addClass("slide");
 }
})(window.jQuery);
