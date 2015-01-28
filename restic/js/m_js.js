$(function(){
// переменные 
	w = window;
	window.b = $("body");
	// инит всех методов для всего всего на сайте
	w.pageheight()
	//выстраивание блоков комментарие 
	// графики
	w.initCircleGraph();
	// переключение вкладок
	w.tabToggler();	
	// инит селектов
	w.initSelect();
	w.multiselect();
	// открытие меню
	w.togglemenu();
	// слайдеры
	w.ajustSlider();
	// 404error
	w.errorCounter();
	// отправка отзыва
	w.sendReview();
	// выбор города
	// раскрытие текст блоков
	w.openText();
	// инит карты на странице ресторана
	w.initMapsInRestoranPage();
	// датапикер
	w.dateChoose();
	// маsки
	w.initMasks(); 

	var horizntalSlider = new Swiper('.mobile-slider-app .swiper-container',{
			freeMode: true
		});
		$("body").on("click", ".mobile-slider-app.controls span",function(){
			horizntalSlider[$(this).hasClass("next")?"swipeNext":"swipePrev"]()
		});
	$(".swiper-slide a").fancybox();

	$("body").on("click", "[data-toggle]", function(){$(".modal").modal("hide");})
			.on("click tap",".mobile-map ",  function(e){
				e.preventDefault();
			 	e.stopPropagation();
			})
			.on("click tap", "a.change-city-link", function(){
				$('.search-content-block-drop').click();
				$(".multiselect-wrap>.hidden").click();
			})
			.on("click tap",".show-map, .show-map *",  function(e){
				var m = $(this).parents(".similar-item"),
					i = m.find(".mobile-map")[0],
					d = $(i).data("coord");
				$(i).add(this).toggleClass("open");
			 	e.preventDefault();
			 	e.stopPropagation();
			 	gmap_initialize(i,d)
			}).on("input", ".ccities .search input", function(e){
				var  v = $.trim(this.value.toUpperCase());
				$(".ccities:visible li").hide();
				$(".ccities:visible li").filter(function(){
					return $.trim($(this).find("span").text().toUpperCase()).indexOf(v)+1;	
				}).show();
			});
	$(".restorant-pseudo-map a").each(function(){var s = $(this); $(this).css({"min-width":s.find(".brdrd").width()+25})});
});
window.gmap_initialize = function(_map, coord) {    
	var myLatlng = new google.maps.LatLng(coord[0], coord[1]),
		myOptions = {
		    zoom: 8,
		    center: myLatlng,
		    mapTypeId: google.maps.MapTypeId.ROADMAP
		},
		map = new google.maps.Map(_map, myOptions);
		var infowindow = new google.maps.InfoWindow({
				content: '<div class="popover-inner"><div class="place"><i class="fa fa-map-marker"></i><span class="p">'+$(_map).data("adress")+'</span><span class="m">'+$(_map).data("metro")+'</span></div><div class="phone"><i class="fa fa-phone"></i>'+$(_map).data("phone")+'</div>'
			});
		var image = new google.maps.MarkerImage("images/map-marker-sprite.png",
				new google.maps.Size(74, 74),
				new google.maps.Point(74, 0),
				new google.maps.Point(32, 74)
			);
		var marker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				icon: image,
				title: $(_map).data("name")
			});
		google.maps.event.addListener(marker, 'click', function() {
		    infowindow.open(map,marker);
		});
};
// Списовк анимация для использования
	window.animateARRAY = [
		"fadeInUp", 
		"fadeInDown", 
		"fadeInLeft", 
		"fadeInRight", 
		"bounceInUp", 
		"bounceIn", 
		"flipInY", 
		"flipInX" , 
		"bounceInLeft", 
		"bounceInRight", 
	];
// Варианты размеров
	window.sizesARRAY = [
		"item-1",
		"item-2",
		"item-3",
		"item-4",
		"item-5",
		"item-6"
	];
// инит анимаций на странице
	window.initPageAnimation = {
		// основная анимация
		main: function(){
			$(".map-item").addClass("animated  fadeIn");
			$("header, .reload-says, .index h2").addClass("animated  fadeInDown");
			$(".search-block").addClass("animated  fadeInUp");
			$(".circle.main").addClass("animated  zoomInLeft");
			$(".restoran-main-title .title, .main-title .title, .destorators .table").addClass("animated  flipInY");
			$(".reservation .bg-img").addClass("animated  fadeInRight");
		},
		// вылетающие блок
		oftenSays: function(){
			var len = animateARRAY.length, i = 0, h = sizesARRAY.length;
			$(".says-wrapper .item, .restorant-pseudo-map a").each(function(){
				var s = $(this),
					r = Math.floor(Math.random()* len);
				setTimeout(function(){
					z = Math.floor(Math.random()* h);
					s.addClass("animated " + animateARRAY[r] + " "+ sizesARRAY[z]);
				   	s.eq(b).addClass('class_name')
				}, ++i*100);
			});
		},
		// карта баров на фотке
		pseudoMap: function(){ if($(".restorant-pseudo-map").length) this.oftenSays(); },
		// инит блоков, с анимацией
		scrollAnmateStart: function(){
			$(".presentation-blocks.animate-scroll ul, .presentation-blocks.animate-scroll h2, .presentation-blocks.animate-scroll .bg-img, .presentation-blocks.animate-scroll  .grd-btn, .presentation-blocks.animate-scroll form").css({"opacity": 0});
			window.setAnimate  = function(){
				$(".presentation-blocks.animate-scroll").each(function(){
					var s = $(this);
					if(s.offset().top < window.calcY(100) ){
						s.find("h2, .grd-btn").addClass("animated  "+ (s.hasClass("left")?"fadeInLeft":"fadeInRight"));
						s.find(".bg-img").addClass("animated  "+ (!s.hasClass("left")?"fadeInLeft":"fadeInRight"));
						s.find("ul:not(.select2-results), p, form").addClass("animated  fadeInUp");
					}
				});
			}
			window.calcY = function(delta){return $(window).scrollTop()+$(window).height()-(delta?delta:0);}
			window.setAnimate();
			$(window).scroll(function(){
				window.setAnimate();
			});
		}
	};

// Метод для выстраивания блоков
	window.setOftenSays = function(){
		window.initPageAnimation.oftenSays();
	};

//цвета и сопоставление
	window.colorCircle = function(R){
		return (R<3?"#cf4130":(R<4?"#f7b946":"#19a05b"));
	};
// одиночная инициализация круговой диаграммы
	window.circleItemInit = function(index, t){
		var circle = $(t),
			_index = index,
			_p = circle.data("counter"),
			p = (_p*100)/5,
			Rat = circle.find(".rating-counter"),
			countries=  circle.find(".countries")[0].getContext("2d"),
			rating_counter = 0,
			pieData = [ 
				{ value : p, color :   window.colorCircle(_p),}, 
				{ value :  100-p, color : "transparent",} 
			],
			pieOptions = {
				animateScale: false,
				animationSteps: 150,
				segmentStrokeWidth: 0,
				percentageInnerCutout: 80, 
				segmentStrokeColor: "transparent",
			};
		// врубаем инит графика
		new Chart(countries).Doughnut(pieData, pieOptions);
		if(circle.hasClass("main")){
			// таймер для счетчика, если главный заголовок
			circle.addClass("fadeIn animated");
			window.circleTimers[index] = setInterval(function(e){
				rating_counter+=.1;
				if(rating_counter<=_p){
					Rat.html(rating_counter.toFixed(1));
				}else{
					clearInterval(window.circleTimers[_index]);
					rating_counter = 0;
				} 
			}, 40);
		}else{
			// инче просто обновляем цифру, дыбы не накидывать нагрузки
			Rat.html(_p.toFixed(1));
		}
	};
// инит круговых графиков
	window.initCircleGraph = function(){
		var C = $(".circle");
		if(C.length ){
			window.circleTimers = [];
		    C.each(function(index, elem){
		    	window.circleItemInit(index, this)
	   	 	});	
		}
	};

// табы на странице ресторана
	window.tabToggler = function(){
		$("body").on("click", ".tab-toggler .toggle-tabs a", function(e){
			e.preventDefault();
			$(".tab-toggler .toggle-content, .tab-toggler .toggle-tabs a").removeClass("active");
			$(this.id).add(this).addClass("active");
			// $(".tab-toggler .toggle-tabs").prepend(this)
		});
	};

// мультиселекст с чекбоксами
	/*
	Элемент multiselect с выпадающими чекбоксами в попапе - полноценный элемент. 
	В дело идут именно эти чекбоксы, которые в html
	отправляются тоже они
	СОБЫТИЕ НА ИЗМЕНЕНИЕ  ПИШЕТСЯ ТАК:
		$("body").on("multiselect", ".multiselect-wrap", function(){
			$(this).find(":checked") - все чекнутые
		});

	на сам див я повесил событие, обрабочик которого называется "multiselect"
	*/
	window.multiselect = function(){
		$(".multiselect-wrap").each(function(){
			var s = $(this),
				l = s.find("a"),
				d = s.data(),  // dataPlaceholder
				c = s.find(".drop").clone(true),
				i = s.find(".multiselect-counter");
			l.click(function(){
				var b = $("<div class='"+d.dropdownCssClass+"'></div>");
				$("body").append(b.append(c.show()));
				if($("body").hasClass("mobile")){
					// b.append('<a href="javascript:;" onclick="$(\".search-content-block-drop\").click();" class="grn-btn"></a>')
				}
				var cssDrop = {
					left: (b.find(".drop").width()+s.offset().left>$(window).width())? "auto" : s.offset().left,
					right: 0,
					top: s.offset().top+s.height(),
				}
				b.find(".drop").css(cssDrop);
				b.find(":checkbox").change(function(){
					s.trigger("multiselect");
					s.find(".drop ul").remove();
					s.find(".drop").append(b.find(".drop ul").clone());
					i.html(s.find(".drop :checked").length);
				});
			});
		});
		// closed
		$("body").on("click", ".search-block-drop", function(event){
			if($(event.target).parents(".drop").length || $(event.target).hasClass("drop")){
			}else $(this).remove();
		});
		// $("body").on("multiselect", ".multiselect-wrap", function(){});
	};

// Инит всех селектов2
	window.initSelect = function(){
		// Обычные селекты
		$(".search-block select, .search-content-block .select-wrap select").each(function(){
			var a = $(this),
				d = a.data();
			a.select2({
				dropdownCssClass: d.dropdownCssClass,
			  	allowClear: d.allowClear?d.allowClear:false
			});
		});
		// селект
		var reservationTypehead = $(".search-select input[type=hidden].select");
		if(reservationTypehead.length){
			var fnformat = function(state, _is_option){
				if (!state.id) return state.text; 
				return  state.text+(_is_option?("<span class='restoraunt-rating'><i class='fa fa-star'></i>"+ parseFloat(state.rating).toFixed(1)+"</span>"):"");
			};
			reservationTypehead.each(function(){
				var s = $(this);
				s.select2({
					data: s.data().dataArray,
					formatResult: function(state){return fnformat(state, true);},
					formatSelection: function(state){return fnformat(state);},
					dropdownCssClass: s.data().dropdownCssClass,
				});	
			});
			
		}
	};

// открытие меню
	window.togglemenu = function(){
		var  self = $(".body");
		b.on("click", ".main-menu a,  .menu-open section , .toggle-menu", function(e){
			self.toggleClass("menu-open");
			$("nav, header").toggleClass("showopen");
		});
	};

// фикс заблуренной фотки, для открытого меню(она растягивает на нериальную высоту о0 о0 о0 !!!)
	window.fixIMGMainBg = function(){	
		var fx=50,
			mgb = $(".img-main-bg"),
			wh = $(window).height();
		mgb.animate({"height": wh}, 0, function(){
			mgb.animate({"height": (wh+fx)+"px", top: "-=30px"}, 1000);
		});
	};

// высота карты и блока с фильтром в ПОИСКЕ
	window.pageheight = function(){
		var s = $("section"),
			hh = $("header").height(),
			w  = $(window),
			c = function(){s.css({"min-height":w.height()-hh})}
		c();
		$(this).resize(function(){
			c();
		});
	};

// инит слайдера ajust
	window.ajustSlider = function(){
		window.myAjustSwiper = new Swiper('.ajust-slider .swiper-container',{
		    loop: true,
		    pagination: ".ajust-slider .pagination",
		    paginationClickable: true,
		    createPagination: true
		});  
	};

// счетчик ошибкок загрузки страницы
	window.errorCounter = function(){
		var a=$("[data-error-code]"), b = a.find(".counter"), c = 0;
		if(a.length&&b.length){
			window.errorType = (a.data("error-code"));	
			window.errorTimer = setInterval(function(e){
				c+=6;
				if(c<window.errorType){ b.html(c);
				}else{
					c = window.errorType
					b.html(c);
					clearInterval(window.errorTimer);	c = 0;
				} 
			}, 10);	
		}
	};

// Отсавить отзыв
	window.sendReview = function(e){
		$(".index .bot .new-review").css({"opacity": 0, display: "none"});
		$("body").on("click", ".bot [type=button]", function(e){
			$(".bot .new-review").css({ "display": "inline-block"}).animate({"opacity": 1});
			$(".bot .new-review .circle").data({counter: 3.3})
			window.circleItemInit(0, $(".bot .circle")[0]);
		});	
	};

// выбор города
	window.changecities = function(){
		var a = $(".change-city-link"),
			l = a.find("span"),
			h = a.find("input[type=hidden]"),
			m = $("#changecities"),
			d = m.find(".set").text();
		h.val(d);
		l.text(d);
		a.click(function(){
			var t = $(this);
			var cssDrop = {
				left: t.find("span").offset().left,
				top: t.offset().top+t.height(),
			}
			m.css(cssDrop);
			$("body").append(m).append("<div class='drop-changecities'></div>");
		});
		$("body")
			.on("click", "#changecities [data-target], .drop-changecities", function(e){
				e.preventDefault()
				m.css({"top": "", "left": ""});
				$(".drop-changecities").remove();
			})
			.on("click", "#changecities a:not([data-target])", function(e){
				var s = $(this),
					c = s.text();
				h.val(c);
				l.text(c);
			 	m.css({"top": "", "left": ""}).find(".set").removeClass("set");
				s.addClass("set");
				$(".drop-changecities").remove();
			});
	};

// открытие/зактрытие текста
	window.openText = function(){
		var toggletext = $(".text-wrap p");
		if(toggletext.length){
			toggletext.filter(function(){var val = this.innerHTML; return $.trim(val).length<=190}).next().next().remove();
			toggletext.filter(function(){var val = this.innerHTML; return $.trim(val).length>190}).css({height: 80});
			$("body").on("click", ".opinion-item .toggler", function(e){
				e.preventDefault();
				$(this).add($(this).parents(".text-wrap")).toggleClass("up");
			});
		}
	};

// инит яндекскарт на странице ресторана. 
	/*
	*данные для карты берутся из data-* атрибутов блока с картой 
	*код вхзят от сюда, и доработан под себя https://tech.yandex.ru/maps/jsbox/2.1/balloon_autopan )
	*/
	window.initMapsInRestoranPage = function(){
		if($("#map-rest-cart").length)
			window.gmap_initialize($("#map-rest-cart")[0], $("#map-rest-cart").data("coord") )
	};

// datepicker
	window._months = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
	window.dateChoose = function(){
		if($(".calendar").length){
			$(".calendar").pickmeup({
				flat: true, 
				date: new Date(),
				change:function(formatted_date){
					var dd = formatted_date,
						d = dd.substr(0, 2),
						y = dd.substr(dd.lastIndexOf("-")+1, 4),
						m = dd.substr(dd.indexOf("-")+1,  2)
					formatted_date = d + " " + _months[m-1] + ", "+y;
					$(".choosendatevalue input").val(dd);
					$(".choosendatevalue span").text(formatted_date);
				}
			});
			$(".pmu-today").click();
		}
	};

//  инит масок для инпутов
	window.initMasks = function(){
		$('input:text').unmask();
		$("input.time").mask('00:00');
		$("input.count").mask('0000');
		$("input.phone").mask('+7 000 0000000');
	};
