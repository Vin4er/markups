$(function(){
// переменные
	w = window;
	window.b = $("body");
// инит всех методов для всего всего на сайте
	
	window.fancyInit();
	window.swiperSliderInit();
	window.resizeWindow();
	window.srollable();
	window.goScrollTop();
	window.masonryRelod();
	window.sliderUI();
	window.tabsPrice();
	window.scrollAnmateStart();

	$(".tel-mask").mask('+7 000 0000000');
	$(".calendar").mask('00.00');
	$(".calendar").pickmeup({format: "d.m"});

});

window.scrollAnmateStart = function(){
	if($(".stat-item").length){
		$(".stat-item").css({"opacity": "0"});
		window.setAnimate  = function(){
			var j = 1;
			$(".stat-item").each(function(){
				var s = $(this);
				if(s.offset().top < window.calcY() && !s.hasClass("animated") ){
					console.log(s, s.position().top)
					setTimeout(function(){
						s.addClass("animated fadeInLeft");
					}, 200*j);
					j++;
				}
			});
		}
		window.calcY = function(delta){return $(window).scrollTop()+ $(window).height()+(delta?delta:0);}
		window.setAnimate();
		$(window).scroll(function(){
			window.setAnimate();
		});
	}
};

window.swiperSliderInit =function(){
	if($(".swiper-container").length){
		$(".swiper-container").each(function(){
			var DOM  = this,
				jdata = $(DOM).data(),
				slider = new Swiper(DOM,{
					slidesPerView: jdata.slidesperview,
					loop: jdata.loop?true:false,
					speed: 1000,
					autoplay: jdata.autoplay?jdata.autoplay: "",
				});
			$(DOM).data({swiper: slider})
		});
		$("body").on("click", ".control .arrow",function(){
			var parents = $(this).parent().parent().find(".swiper-container").data().swiper;
			parents[$(this).hasClass("icons-arrow-next")?"swipeNext":"swipePrev"]();
		}).on("mouseenter mouseleave", ".swiper-container", function(e){
			$(this).data().swiper[e.type=="mouseenter"?"stopAutoplay":"startAutoplay" ]();
		});
	}
};

window.fancyInit  = function(){
	if ( $(".certifications [rel=theme_1]").length ) $(".certifications [rel=theme_1]").fancybox();
	if ( $(".clients [rel=gal]").length ) $(".clients [rel=gal]").fancybox();
	if ( $(".fancybox").length ) $(".fancybox").fancybox();
}

window.fixHeightOfServices = function(){
	if($(".service").length){
		var minHeight = 0;
		$(".valign-fix").remove();
		$(".title").each(function(){
			var seftHeight = $(this).height();
			if(seftHeight>=minHeight){
				minHeight =  seftHeight;
			}else{
				$(this).children().prepend("<div class='valign-fix'>&nbsp;</div>");
			}
		});
	}
};


window.srollable = function(){
	if(location.hash){
		var srll = function(){
			var top2 = $(location.hash).offset().top-$("header").height();
			$(document).scrollTo(top2, 400);
		}
		if( location.hash == "#calc2" ||  location.hash == "#calc1" ){
			$(location.hash).parent().click();
			setTimeout(srll, 500)
		}else{
			srll()
		}
	}

	if( $(".service").length ){
		$(".top-services .title a, a.title-title, .services-item-item ul a").click(function(e){
			e.preventDefault();
			var top = $(this.hash).offset().top-$("header").height();
			$(document).scrollTo(top, 400);
		})
	}
};

window.resizeWindow = function(){
	var time, resizeFunctions = function(){
		window.fixHeightOfServices();
		// Сюда пишем новые функции

	};

	resizeFunctions();
	// Сюда пишем новые функции

	$(window).resize(function(e){
		if (time) 	clearTimeout(time);
		time = setTimeout(function(){
			resizeFunctions();
		}, 500);
	});
};


window.goScrollTop = function(){
	$("#go-top").hide().click(function(){
		$(document).scrollTo(0, 400);
	});
	$(window).scroll(function(){
		$("#go-top")[($(window).scrollTop() > $(document).height()/2)?"show":"hide"]();
	});
};


window.masonryRelod = function(){
	var M = $(".masonry");
	if(M.length){
		setTimeout(function(){
			M.masonry();
			setTimeout(function(){
				M.children().css({opacity: 1})
			}, 100);
		}, 300);
	}
};

window.sliderUI = function(){
	if($(".sl").length){
		$(".sl").slider({
			range: "min",
			slide: function( event, ui ) {
			   $(ui.handle).parents(".slider").find(".sl-label").html( ui.value );
		 	}
		});
		$(".sl").each(function(){
		   $(this).parents(".slider").find(".sl-label").html( $( this ).slider( "value" ));
		})
	}
};

window.tabsPrice = function(){
	$(".calculator .title:first").toggleClass("toggle").next().stop().slideToggle()
	$(".title2").hide();

	$(".calculator .type-2 .title:not(.toggle)").click(function(e){

		$(this).addClass("toggle")
		$(this).parents(".type-2").stop().animate({"margin-top": -$(".type-1").height()}, 300)
		$(this).next().stop().slideDown()
	
		$(".title2").show().click(function() {
			$(".calculator .type-2 .title").removeClass("toggle")
			$(this).parents(".type-2").stop().animate({"margin-top": ""}, 300)
			$(this).hide().next().next().stop().slideUp()
		});
		// $(this).parents(".type-2").animate({"margin-top": ""}, 300)
		// $(".title2").hide();
	// 	var S = $(this);
	// 	e.preventDefault();
	// 	$(".calculator .wrap").prepend(S.parent());
	// 	$(".calculator .title").not(this).next().slideUp();
	// 	S.next().slideDown();
	});
};


/*!
 * jQuery.scrollTo
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * @projectDescription Easy element scrolling using jQuery.
 * @author Ariel Flesler
 * @version 1.4.14
 */
;(function (define) {
	'use strict';

	define(['jquery'], function ($) {

		var $scrollTo = $.scrollTo = function( target, duration, settings ) {
			return $(window).scrollTo( target, duration, settings );
		};

		$scrollTo.defaults = {
			axis:'xy',
			duration: 0,
			limit:true
		};

		// Returns the element that needs to be animated to scroll the window.
		// Kept for backwards compatibility (specially for localScroll & serialScroll)
		$scrollTo.window = function( scope ) {
			return $(window)._scrollable();
		};

		// Hack, hack, hack :)
		// Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
		$.fn._scrollable = function() {
			return this.map(function() {
				var elem = this,
					isWin = !elem.nodeName || $.inArray( elem.nodeName.toLowerCase(), ['iframe','#document','html','body'] ) != -1;

					if (!isWin)
						return elem;

				var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;

				return /webkit/i.test(navigator.userAgent) || doc.compatMode == 'BackCompat' ?
					doc.body :
					doc.documentElement;
			});
		};

		$.fn.scrollTo = function( target, duration, settings ) {
			if (typeof duration == 'object') {
				settings = duration;
				duration = 0;
			}
			if (typeof settings == 'function')
				settings = { onAfter:settings };

			if (target == 'max')
				target = 9e9;

			settings = $.extend( {}, $scrollTo.defaults, settings );
			// Speed is still recognized for backwards compatibility
			duration = duration || settings.duration;
			// Make sure the settings are given right
			settings.queue = settings.queue && settings.axis.length > 1;

			if (settings.queue)
				// Let's keep the overall duration
				duration /= 2;
			settings.offset = both( settings.offset );
			settings.over = both( settings.over );

			return this._scrollable().each(function() {
				// Null target yields nothing, just like jQuery does
				if (target == null) return;

				var elem = this,
					$elem = $(elem),
					targ = target, toff, attr = {},
					win = $elem.is('html,body');

				switch (typeof targ) {
					// A number will pass the regex
					case 'number':
					case 'string':
						if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
							targ = both( targ );
							// We are done
							break;
						}
						// Relative/Absolute selector, no break!
						targ = win ? $(targ) : $(targ, this);
						if (!targ.length) return;
					case 'object':
						// DOMElement / jQuery
						if (targ.is || targ.style)
							// Get the real position of the target
							toff = (targ = $(targ)).offset();
				}

				var offset = $.isFunction(settings.offset) && settings.offset(elem, targ) || settings.offset;

				$.each( settings.axis.split(''), function( i, axis ) {
					var Pos	= axis == 'x' ? 'Left' : 'Top',
						pos = Pos.toLowerCase(),
						key = 'scroll' + Pos,
						old = elem[key],
						max = $scrollTo.max(elem, axis);

					if (toff) {// jQuery / DOMElement
						attr[key] = toff[pos] + ( win ? 0 : old - $elem.offset()[pos] );

						// If it's a dom element, reduce the margin
						if (settings.margin) {
							attr[key] -= parseInt(targ.css('margin'+Pos)) || 0;
							attr[key] -= parseInt(targ.css('border'+Pos+'Width')) || 0;
						}

						attr[key] += offset[pos] || 0;

						if(settings.over[pos])
							// Scroll to a fraction of its width/height
							attr[key] += targ[axis=='x'?'width':'height']() * settings.over[pos];
					} else {
						var val = targ[pos];
						// Handle percentage values
						attr[key] = val.slice && val.slice(-1) == '%' ?
							parseFloat(val) / 100 * max
							: val;
					}

					// Number or 'number'
					if (settings.limit && /^\d+$/.test(attr[key]))
						// Check the limits
						attr[key] = attr[key] <= 0 ? 0 : Math.min( attr[key], max );

					// Queueing axes
					if (!i && settings.queue) {
						// Don't waste time animating, if there's no need.
						if (old != attr[key])
							// Intermediate animation
							animate( settings.onAfterFirst );
						// Don't animate this axis again in the next iteration.
						delete attr[key];
					}
				});

				animate( settings.onAfter );

				function animate( callback ) {
					$elem.animate( attr, duration, settings.easing, callback && function() {
						callback.call(this, targ, settings);
					});
				}
			}).end();
		};

		// Max scrolling position, works on quirks mode
		// It only fails (not too badly) on IE, quirks mode.
		$scrollTo.max = function( elem, axis ) {
			var Dim = axis == 'x' ? 'Width' : 'Height',
				scroll = 'scroll'+Dim;

			if (!$(elem).is('html,body'))
				return elem[scroll] - $(elem)[Dim.toLowerCase()]();

			var size = 'client' + Dim,
				html = elem.ownerDocument.documentElement,
				body = elem.ownerDocument.body;

			return Math.max( html[scroll], body[scroll] ) - Math.min( html[size]  , body[size]   );
		};

		function both( val ) {
			return $.isFunction(val) || $.isPlainObject(val) ? val : { top:val, left:val };
		}

		// AMD requirement
		return $scrollTo;
	})
}(typeof define === 'function' && define.amd ? define : function (deps, factory) {
	if (typeof module !== 'undefined' && module.exports) {
		// Node
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery);
	}
}));
