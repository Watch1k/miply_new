head.ready(function(){

	$('#loader').fadeOut('fast');

	// mobile slider
	if (phoneInd) {
		if ($('.grid__list').length) {
			$('.grid__list').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: true,
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				autoplaySpeed: 10000,
				speed: 1500
			});
		}
	}

	// mobile nav
	$('#menu_toggle').on('click', function(){
		$(this).toggleClass('is-active');
		$('.navigation').toggleClass('is-active').slideToggle();
	});

	// grid
	if (!phoneInd) {
		var gridInterval = null;
		var gridTime;
		var setTime = [];
		var userTimeAFK = 7000;
		// grid animation
		function gridAnimation() {
			var textTitleSpeed = 1000,
				titleOpacitySpeed = 500,
				tooltipSpeed = 600, // css grid__tooltip transition time
				tooltipHold = 3000;
			gridTime = 2*textTitleSpeed + tooltipHold + tooltipHold/2 + 5*(2*tooltipSpeed + tooltipHold) + 1000;
			function showTitle() {
				$('.grid__title').show();
		    	$('.grid__title').animate({opacity: '1'}, titleOpacitySpeed);
		    	$('.grid__title-text').css('top', '-20px').animate({top: '50%'}, textTitleSpeed);
			};
			function hideTitle(){
				$('.grid__title-text').animate({top: '110%'}, textTitleSpeed);
				setTimeout(function(){
					$('.grid__title').animate({opacity: '0'}, titleOpacitySpeed, function(){
						$(this).hide();
					});
				}, (textTitleSpeed + titleOpacitySpeed)/2);
			};
			function animateEl(){
				var numberEl = 0;
				$('.grid__list li').each(function(){
					if ($(this).is(':visible')) {
						numberEl++;
					}
				});
				var randomEl = Math.floor(Math.random() * numberEl);
				$('.grid__list li').eq(randomEl).find('.grid__tooltip').css({top: '0'});
				setTime[0] = setTimeout(function(){
					$('.grid__tooltip').css({top: '100%'});
				},tooltipHold + tooltipSpeed);
			};

			function gridAnimationLogic() {
				$('.grid__tooltip').css({top: '100%'});
				$.when(showTitle()).done(function(){
		    		setTime[1] = setTimeout(function(){
		    			$.when(hideTitle()).done(function(){
		    				setTime[2] = setTimeout(function(){
		    					for (var i = 0; i < 5; i++) {
		    						setTime[3 + i] = setTimeout(function(){
		    							animateEl();
		    						}, i * (2 * tooltipSpeed + tooltipHold));	
		    					}
		    				}, tooltipHold / 2);
		    			});    			
		    		},tooltipHold);
		    	});
			};

		    $(document).idleTimer(userTimeAFK);

		    $(document).on("idle.idleTimer", function (event, elem, obj) {
		    	gridAnimationLogic();
		    	gridInterval = setInterval(function(){
		    		gridAnimationLogic();
		    	}, gridTime);
			});

			$(document).on("active.idleTimer", function (event, elem, obj, e) {
				clearInterval(gridInterval);
				for (var i = 0; i < setTime.length; i++) {
					clearTimeout(setTime[i]);
				};
				hideTitle();
				$('.grid__tooltip').css({top: '100%'});
			});
		};

		// resize grid blocks
		function gridResize() {
			$('.grid__list li').css('height', $('.grid__list li').eq(0).width() * 2 / 3);
		};

		if ($('.grid-wrap').length) {
			$('.grid__list li').hover(function(){
				$(this).find('.grid__tooltip').css('top', '0');
			}, function(){
				$(this).find('.grid__tooltip').css('top', '100%');
			});
			if (!phoneInd) {
				gridResize();
				$(window).on('resize', function(){
					gridResize();
				});
				gridAnimation();
			}
		}
	}
	
});