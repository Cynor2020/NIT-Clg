/* full-screen-jquery-content-slider
 * <https://github.com/jacobxperez/full-screen-jquery-content-slider>
 * Copyright (C) 2020 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
------------------------------------------------------------------------------*/
$(function() {

	// Slider
	$(".slider").each(function() {
		var slider = $(this),
			slides = slider.find(".slide"),
			totalSlides = slides.length,
			currIndex = 0,
			imgCache = [],
			intervalTime = 7000,
			sliderInterval;

		// fades in and out slides
		function cycleItems() {
			var currSlide = slides.eq(currIndex);

			slides.fadeOut(50).css("z-index", 1);
			currSlide.fadeIn(200).css("z-index", 5);
		} // end cycleItem

		// Changes slides
		function changeSlide() {
			currIndex += 1;

			if (currIndex > totalSlides - 1) {
				currIndex = 0;
			}

			cycleItems();
		} // end changeSlide

		// Timer for changeSlide
		function startSlider() {
			clearInterval(sliderInterval);

			sliderInterval = setInterval(function() {
				changeSlide();
			}, intervalTime);
		} // end startSlider

		// preload the img before starting the Slider
		(function preloader() {
			if (currIndex < totalSlides) {
				// load img
				imgCache[currIndex] = new Image();
				imgCache[currIndex].src = slides.eq(currIndex).find("img").attr("src");
				imgCache[currIndex].onload = function() {
					currIndex += 1;
					preloader();
				};
			} else {
				currIndex = 0;
				cycleItems();
				startSlider();
			}
		}()); // end preloader

		// click on next
		$(".next-slide").on("click", function() {
			currIndex += 1;

			if (currIndex > totalSlides - 1) {
				currIndex = 0;
			}

			cycleItems();
			startSlider(intervalTime = 10000);
		}); // end click of next

		// click on prev
		$(".prev-slide").on("click", function() {
			currIndex -= 1;

			if (currIndex < 0) {
				currIndex = totalSlides - 1;
			}

			cycleItems();
			startSlider(intervalTime = 10000);
		}); // end click on prev
	}); // end Slider

});
