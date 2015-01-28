$(function(){
// переменные 
	w = window;
	window.b = $("body");
	$('.video-item.fancybox-media')
		.attr('rel', 'media-gallery')
		.fancybox({
			openEffect : 'none',
			closeEffect : 'none',
			prevEffect : 'none',
			nextEffect : 'none',

			arrows : false,
			helpers : {
				media : {},
				buttons : {}
			}
	});
	$('#SEND_FORM').submit(function(){
		$.post(
			$('#SEND_FORM').attr('action'),
			$('#SEND_FORM').serialize(),
			function( result ){
				var m = "";
				if ( result.status ){

					m = result.msg;
					$("#inline").append("<div class='result-status'>"+m+"</div>")
				}else{
					var msg = result.msg;
					for( var i in result.error ) msg += result.error[i];
					m = msg;
					alert("Ошибка.повторите запрос")
				}
			},
			'json'
		).error(function( result ){
			var msg = result.msg;
			for( var i in result.error ) msg += result.error[i];
			alert( msg );
		});
		return false;
	});
	$(".fancybox").fancybox();

	viewHASHlink();

	$("body").on("click", "nav a, .mapssite a", function(e){
		e.preventDefault();
		var href = this.href;
		__scrollTo($(href.substr(href.indexOf("#"))).position().top- 100 );
	});

	$('.catalog [href="#inline"]').click(function(e){
		$(".result-status").remove();
		e.preventDefault();
		$("#inline input:not([type=submit]), #inline textarea").val("")
		$("#inline").css({"top": "633px", 'margin-left': '', 'width': '', 'right': '', "left": ""}).find(".btn").css({bottom: "-96px"});
		setTimeout(function(){
			__scrollTo($("#catalog").position().top- 100)
		}, 300);
	});
	$('.bottom-block [href="#inline"]').click(function(e){
		$(".result-status").remove();
		e.preventDefault();
		$("#inline input:not([type=submit]), #inline textarea").val("")

		$("#inline").css({'top': '2544px', 'left': 'auto', "right": "0",  "width": "44%", "margin-right": "3%"}).find(".btn").css({bottom: "-80px"});
		setTimeout(function(){
			__scrollTo($("#dostavka").position().top- 200 )
		}, 300);
		
	});
	w.initIndexSlider();
	w.initVideoSlider();

	$('.mask-phone').mask("8(000)000-00-00", {placeholder: "8(___)___-__-__"});
	var styles = [{ "stylers": [
	      { "invert_lightness": true },
	      { "gamma": 1.63 },
	      { "saturation": -100 },
	      { "lightness": 14 }
	    ]
	  }
	];
	var styledMap = new google.maps.StyledMapType(styles, {
		name: "Styled Map"
	});
	window.setMap("_true")
	google.maps.map.setZoom(11)


	$("body").on("click", ".searchpane-title", function(){
		$(this).toggleClass("opened");
		// $(".drop").show();
		// $("[data-value").hide();
	}).on("click", ".searchpane-title+.scrollpane .drop a[value]:not(.open)", function(){
		$("#searchpane").val($(this).attr("value")).change();
	}).on("change", "#searchpane", function(){
		$(".hover").removeClass("hover")
		if( this.value == 0 ){
			setTimeout(function(){
			w.setMap("_true");
					$(".open").next().slideToggle();
					$(".open").removeClass("open")
					window.setMap("_true");
					google.maps.map.setZoom(9);
			}, 500);
		}else{
			$(".drop a[value]:not([value="+this.value+"])").removeClass("open")
			var dv = $(".drop [data-value="+this.value+"]");
			var dvn = $(".drop [data-value]:not([data-value="+this.value+"])");
			dvn.slideUp();
			$(".drop a[value="+this.value+"]").toggleClass("open")
			dv.slideToggle().toggleClass("open");
			setTimeout(function(){
				w.setMap();
			}, 500);
		}
	}).on("change", "[uncheckall]", function(){
		$(".toggler label:not([uncheckall]) input").prop("checked", false);
	}).on("change", "label:not([uncheckall]) input", function(){
		$(".toggler [uncheckall] input").prop("checked", false);
	}).on("click", "#inline .close", function(){
		$("#inline").css({top: -999})
	}).on("click", "a[value].open", function(){
		$(".open").removeClass("open")
		$(this).next().slideToggle();
		window.setMap("_true");
		google.maps.map.setZoom(9);
	}).on("change", "[type=tel]", function(){
		$("[type=email]").removeAttr("required");
		$("[type=tel]").attr("required", true)
	}).on("change", "[type=email]", function(){
		$("[type=tel]").removeAttr("required")
		$("[type=email]").attr("required", true)
	}).on("input", "input", function(){
		if($(this).is(":invalid")){
			$(this).addClass("invalid");
		}else{
			$(this).removeClass("invalid");
		}
	}).on("click", ".logo", function(e){
		e.preventDefault();
		__scrollTo(0);
		location.hash="";
	}).on("keydown", function(e){
		if(e.keyCode == 27)	{
			e.preventDefault();
			$(".order-m:visible").css({top:"", left:""});
		}
	}).on("mousedown", function(e){
		var t = $(e.target);
		if( t.parents("#inline").length || t.hasClass("order-m")){
			
		}else{
			$(".order-m:visible").css({top:"", left:""});
		}
	});

	$(".scrollpane").jScrollPane({
		autoReinitialise: true
	});
});

// скролл топ
var __scrollTo = function(y){
	$("html, body").animate({"scrollTop": y});
}
// return hash
var returnHASHurl = function(){
	return  location.hash
}
// нужный хэш или нет? если да то скроллим
var goScroll = function(){
	var hash = returnHASHurl();

	if(hash=="#catalog" ||  hash=="#dostavka" || hash=="#media"|| hash=="#map" )
		__scrollTo($(returnHASHurl()).position().top- 100 );
}
// нсобычие изменеия хеша
var viewHASHlink = function(){
	goScroll()
	$(window).on('hashchange', function(e) {
		goScroll();
	});
}

window.initIndexSlider = function(){
	window.indexSlider = new Swiper('.slider .swiper-container',{
		loop: true,
		pagination: ".slider .swiper-paginator",
		paginationClickable: true,
		createPagination: true,
		autoplay: 3000
	});  
	$("body").on("click", ".slider .swiper-left, .slider  .swiper-right", function(){
		window.indexSlider[$(this).hasClass("swiper-right")?"swipeNext":"swipePrev"]()
	});
};
window.initVideoSlider = function(){
	window.index2Slider = new Swiper('.video .swiper-container',{
		loop: true,
		pagination: ".video .swiper-paginator",
		paginationClickable: true,
		createPagination: true,
		autoplay: 3000
	});  
	$("body").on("click", ".video .swiper-left, .video  .swiper-right", function(){
		window.index2Slider[$(this).hasClass("swiper-right")?"swipeNext":"swipePrev"]()
	});
};

window.setMap = function(e){
	var places1 = [];
	var i = 0;
	var r=e
	var selector = "[data-id]"+ ( r!=true?":visible":"");
	selector = r=="_true"?"[data-id]" : selector;

	$(selector).each(function(){
		var data = $(this).data();
		if(r!=true){
			data.id = i
		}
		$(this).attr("data-id", data.id);
		$(this).data("data-id", data.id);
		places1[i] = [data.coord, data.name, data.id];
		i++;	
	});
	console.log(places1)
	window.gMaps.init.call(google.maps);
	if( google.maps && document.getElementById( google.maps.id )){
		google.maps.addMarkers( places1 );
		places1  = []
		window.gMaps.actions();

	}
};


//  инит гугламапс
window.gMaps = {
	init: function(opts){
	//Опции
	var o = $.extend({
		id:'mapcart',
		zoom: 14,
		centerY:63.9369183,
		centerX:30.3230151,
		places: [],
		scrollwheel: true,
		draggable:true,
		styles: null,
		stylesName:"Styled Map",
		markerImgUrl:'images/map-marker-sprite.png',
		animation: null,
	}, opts);
	//Инициализация
		var styles = [
			  {
			    "stylers": [
			      { "invert_lightness": true },
			      { "gamma": 1.63 },
			      { "saturation": -100 },
			      { "lightness": 14 }
			    ]
			  }
			]
		var styledMap = new google.maps.StyledMapType(styles, {
			name: "Styled Map"
		});
		if ( !document.getElementById(o.id) ) return;
		this.map = new google.maps.Map(document.getElementById(o.id),{
			center: new google.maps.LatLng(o.centerY,o.centerX),
			zoom:o.zoom,
			scrollwheel: false,
			scrollwheel: false,
			panControl: false,
			mapTypeControlOptions: {
				mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
			},
			zoomControlOptions: {
			   style: google.maps.ZoomControlStyle.LARGE,
			   position: google.maps.ControlPosition.TOP_RIGHT
		  },
		});
		this.map.mapTypes.set('map_style', styledMap);
		this.map.setMapTypeId('map_style');
		this.places = o.places;
		this.markers = [];
		this.id = o.id;
		// this.infoWindow = new google.maps.InfoWindow();
		if( o.styles ){ //Добавляем стили
			var styledMap = new google.maps.StyledMapType(o.styles,
			{name: o.stylesName});
			this.map.mapTypes.set('map_style', styledMap);
			this.map.setMapTypeId('map_style');
		}
		//Методы
		//Добавляем маркеры
		this.addMarkers = function(places){
			if ( !document.getElementById(o.id) ) return;
			var map = this.map;
			var markers = this.markers;
			var latlngbounds = new google.maps.LatLngBounds();
			var ss  = this;
			for (var i =0 ; i<places.length; i++) {
				if(places[i]!=undefined){
					this.getBase64Image(o.markerImgUrl, i, places[i], function( r, p){
						var url = "images/map-marker-sprite.png";
						var myLatLng = new google.maps.LatLng(p[0][0], p[0][1]);
						latlngbounds.extend(myLatLng);
						var image = new google.maps.MarkerImage(url,
							new google.maps.Size(50, 50),
							new google.maps.Point(0, 0),
							new google.maps.Point(0, 0)
						);
						var marker = new google.maps.Marker({
							position: myLatLng,
							map: map,
							title: p[1],
							icon: image ? image : null,
							animation: o.animation,
						});

						var icon1 = new google.maps.MarkerImage(url, new google.maps.Size(50, 50), new google.maps.Point(0, 0), new google.maps.Point(0	, 0	));
						var icon2 = new google.maps.MarkerImage(url, new google.maps.Size(50, 50), new google.maps.Point(50, 0), new google.maps.Point(0, 0	));
						var mark = {
							m: marker,
							i1: icon1,
							i2: icon2,
						};
						ss.markers[r] = mark;
						ss.addDefaultActions(url, r, mark);
					});
				}
			}
		 	this.map.setCenter( new google.maps.LatLng(places[places.length-1][0][0], places[places.length-1][0][1] ) );

			// setTimeout(function(){
			// 	$($(".open").length)
			// 	$(".jspContainer").scrollTo($(".jspContainer .open"))
			// }, 400)
		};
		this.getBase64Image  = function(_img, id, p, func) {
			func(id, p);
		};
		//Добавляем события к маркерам
		this.addDefaultActions = function(u, n, mark){
			var map = this.map,
				sss = this,
				markers = this.markers,
				// iw = this.infoWindow,
				popUpMarkUp = this.popUpMarkUp;
				var TT = false;
			google.maps.event.addListener(mark.m, 'click', function(e) {
				TT  = true
				for (var j =0; j < markers.length; j++) {
					if(markers[j]){
						markers[j].m.setIcon( markers[j].i1);
					}
				}
				this.setIcon(mark.i2);
				map.panTo(new google.maps.LatLng( this.getPosition().lat(), this.getPosition().lng() ));
				var _t =this;
				var rr =  $("a[data-id="+n+"]")
				$("[data-id]").removeClass("hover");
				rr.addClass("hover");
				var w = rr.parents("[data-value]").prev().attr("value")
				$(".drop a[value]:not([value="+w+"])").removeClass("open")
				var dv = $(".drop [data-value="+w+"]");
				var dvn = $(".drop [data-value]:not([data-value="+w+"])");
				if(!rr.is(":visible")){
					rr.parents("ul").prev().click()
					// w.click();
					setTimeout(function(){
						$('[data-id="'+$(".hover").data("id")+'"]').click();
							$(".jspContainer").scrollTo($(".jspContainer .open"));
					}, 1000);
				}
			});		

			google.maps.event.addListener(map, 'click', function(){
				markers[n].m.setIcon(markers[n].i1);
				$("[data-id]").removeClass("hover");
			});
		};

		//Верстка попапа
		this.popUpMarkUp = function(title, id){
			return "";
		};
	},

	actions: function(){
		$('[data-id]').click(function(e){
			e.preventDefault();
			$("[data-id]").removeClass("hover");
			$(this).addClass("hover")
			google.maps.event.trigger(google.maps.markers[ $(this).data('id')].m, "click");
		});
	}

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
