$(function(){
// переменные
	w = window;
	window.b = $("body");
// инит всех методов для всего всего на сайте
	w.pageheight()
	//выстраивание блоков комментарие
	w.setOftenSays();
	// графики
	w.initCircleGraph();
	// анимация главная
	w.initPageAnimation.main();
	w.initPageAnimation.pseudoMap();
	w.initPageAnimation.scrollAnmateStart();
	// переключение вкладок
	w.tabToggler();
	// инит селектов
	w.initSelect();
	w.multiselect();
	// фикс заблуренной фотки, для открытого меню(она растягивает на нериальную высоту о0 о0 о0 !!!)
	w.fixIMGMainBg();
	// открытие меню
	w.togglemenu();
	// слайдеры
	w.ajustSlider();
	// 404error
	w.errorCounter();
	// отправка отзыва на главной
	w.sendReview();
	// выбор города
	w.changecities();
	// раскрытие текст блоков
	// инит карты на странице ресторана
	w.initMapsInRestoranPage();
	// датапикер
	w.dateChoose();
	// маsки
	w.initMasks();
	//инит лоадера
	w.loader.init();
	//рандомные картинки
	w.hoverRest();
	//3 шага заказа 
	w.stepsGo();
	// 
	w.openText();

	w.horizntalSlider();

	// скрываем модально, показыая другое
	$("body")
		.on("click", "[data-toggle]", function(){
			$(".modal").modal("hide");
		})
		.on("click", ".btn-bottom a", function(e){
			var r = $(this).parent()
			e.preventDefault();
			w.loader.show($(this).parent());

			var TEMP_AJAX	=	$(this).parent().prevAll().slice(0, 3).clone();

			setTimeout(function(){
				console.log("Прогруженно")
				r.before(TEMP_AJAX.addClass("animated  fadeInUp"))
				w.loader.hide();
			}, 500);
		});

});


	window.horizntalSlider = function(){
		var horizntalSlider = new Swiper('.slider-app .swiper-container',{
			mode: 'vertical',
			slidesPerView: 4,
			// loop: true
		});
		$("body").on("click", ".slider-app .controls span",function(){
			horizntalSlider[$(this).hasClass("next")?"swipeNext":"swipePrev"]()
		});
		$("body").on("click", ".slider-app .swiper-slide:not(.active)", function(){
			var h = $(this).index();
			
			var d = $(".slider-app .active").index();	
			console.log(h,d)
			// var trans = {
			// 	'transform': 'translate3d( 0, '++'100%, 0px)',
			// 	'-webkit-transform': 'translate3d(0, '++'100%, 0px)'
			// }
			var s = $(this),
				newIMG = $("<div class='img'>").css({
					"opacity": 1,
					"background-image": "url("+s.data().url +")",
					'transform': 'translate3d( 0, '+(h<d?"-":"")+'100%, 0px)',
					'-webkit-transform': 'translate3d(0, '+(h<d?"-":"")+'100%, 0px)'
				});
			$(".slider-app .swiper-slide.active").removeClass("active");

			s.addClass("active");

			var notThis = $(".device .img")

			$(".device .ov-hidden").append(newIMG);
			setTimeout(function(){
				newIMG.css({
					"transform": 'translate3d( 0, 0%, 0px)',
					"-webkit-transform": 'translate3d(0, 0%, 0px)'
				});
			},100)
			
			setTimeout(function(){

				notThis.remove();
			}, 1000);
		});
		$(".slider-app .swiper-slide.swiper-slide-visible:first").click()
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

// варианты картинок для ховера
	window.picHover = [
		"images/resta_item_random_5.jpg",
		"images/resta_item_random_2.jpg",
		// "images/resta_item_random_6.jpg",
		"images/resta_item_random_3.jpg",
		"images/resta_item_random_1.jpg",
		"images/resta_item_random_4.jpg",
	];
//  ползунок на форме бронирования
	window.initSliderBron = function(){
		var s = $(".slider-time-bron");
		if( s .length == 0 ) return false;

		var t24 = 24*60-1,
			w24 = s.width();
			step = w24/t24;
		s.slider({
			min: 0,
			max: t24,
			step: 5,
			slide: function( event, ui ) {
				var h = parseInt(ui.value/60),
					m = ui.value - h*60
					m = m<10? "0"+m : m;
					h = h<10? "0"+h : h;
					h = h == 24 ? 23: h;
					m = h ==24 ? 59 : m
				$(ui.handle).attr({"data-value": h+":"+m })
				$(".tmp_rm-b-slider").remove();
				$("#reservation input.time").val(h+":"+m)
			}
		});
		$("body").on("keyup" ,"#reservation input.time", function(){
			var v = this.value;
			var h =v.substr(0, v.indexOf(":"));
			var m =v.substr(v.indexOf(":")+1);
			var ff = parseInt(h*60)+parseInt(m)
			$(".slider-time-bron").data({'time': ff})
			$(".slider-time-bron").slider("value", ff)
			$(".slider-time-bron a").attr({"data-value": h+":"+m })
			$(".tmp_rm-b-slider").remove();
		})
	
	}

	window.imgstep3Array = [
		"images/bg-bron_1.png",
		"images/bg-bron_2.png",
		"images/bg-bron_3.png",
		"images/bg-bron_4.png",
		"images/bg-bron_5.png",
		"images/bg-bron_6.png"
	];
	window.stepsGo = function(){
		// TO DO
		// ЗАПИСЫАТЬ В ОБЪЕКТ ВСЕ ЧТО ВВОБИТСЯ И ОБНОВЛЯТЬ ДАНЫЕ НА ВСЕХ ШАГАХ
		// НАПРИМЕР ВРЕМЯ, количество человек, Имя и тд
		var f = $(".form-transition-wrapper"),
			reservation = $('#reservation'),
			ff = function(t){
				f.animate({height: $("[data-step="+t+"]").height()}, 100,  function(){
					$(".form-transition-wrapper").scrollTo($("[data-step="+t+"]"), 500)
				});
			},
			setPag = function(r){
				$(".steps-paginators .active").removeClass("active");
				$(".steps-paginators span").slice(0, r).addClass("active")
			}, 
			setStep = function(g){
				ff(g);
				setPag(g);
			}
		// обработчик на отмену скролла)
		reservation.mousedown(function(e){ 
			if(reservation.is(":visible")){
				var t = $(e.target);  return (t.is("input") || t.is("ins")|| t.hasClass("checkbox") || t.hasClass(".calendar"));
			}
		})	
		reservation.on('shown.bs.modal', function (e) {
			setStep(1);
			var l = window.imgstep3Array.length;
			$("#reservation .ineedmessage").css({"background-image": "url("+window.imgstep3Array[Math.floor(Math.random()*l)]+")"})

		});
		reservation.on('hidden.bs.modal', function (e) {
			f.height(0);
			reservation.unbind("mousedown");
		});
		$("body").on("click", "[data-go-step], .steps-paginators .active", function(e){
			var i = $(e.target).hasClass("active")?  $(this).index()+1 : $(this).data("go-step")
			setStep(i);
		});
		window.initSliderBron();
	}

// loader
	window.loader = {
		img: "images/loader.png",
		init: function(f){
			var	img = new Image(),
				angle = -3;

			img.src = "images/loader.png"	;
			this.loader = $("<div class='loader'></div>");
			this.loader.html(img);

		},
		show: function(g){
			$(".loader:visible").remove()
			$(this.loader).css({
				"position": "relative",
				"z-index": 999
			});
			this.clone = this.loader.clone()
			g.append(this.clone );
		},
		hide: function(){
			var s = $(".loader:visible");
			s.fadeOut(function(){
				s.remove();
			})
		}
	};


	// установка картинок
	window.hoverRest = function(){
		if($(".similar-item .text-wrap-bg").length == 0) return false;
		preloadImages(window.picHover);
		$(".similar-item .text-wrap-bg").each(function(){
			var l =window.picHover.length, 
				r = {"background":  "url("+window.picHover[Math.floor(Math.random()*l)]+")"}
			$(this).css(r);
		});
	};

	window.preloadImages = function(a){
	  for(var i = 0; i<a.length; i++) $("<img />").attr("src", a[i]);
	}
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
			$('.says-wrapper .item').removeClass('animated bounceInLeft  bounceInRight  '); 

			var len = animateARRAY.length, i = 0, h = sizesARRAY.length;
			$(".says-wrapper .item, .restorant-pseudo-map a").each(function(){
				var s = $(this),
					r = Math.floor(Math.random()* len);
					// установка ширины для псевокарты
				s.removeClass(s.data('class'))
				s.css({"min-width":s.find(".brdrd").width()+35});
				setTimeout(function(){
					z = Math.floor(Math.random()* h);
					var c  = "animated " + animateARRAY[r] + " "+ sizesARRAY[z];
					s.data({class: c})
					s.addClass(c);
				   	s.eq(b).addClass('class_name')
				}, ++i*100);
			});
		},
		// карта баров на фотке
		pseudoMap: function(){ if($(".restorant-pseudo-map").length) this.oftenSays(); },
		// инит блоков, с анимацией
		scrollAnmateStart: function(){
			$(".animate-scroll ul,.animate-scroll h2, .animate-scroll .bg-img, .animate-scroll  .grd-btn, .animate-scroll form, .animate-scroll h4").css({"opacity": 0});
			window.setAnimate  = function(){
				$(".animate-scroll").each(function(){
					var s = $(this);
					if(s.offset().top < window.calcY(100) ){
						s.find("h2, .grd-btn, h4").addClass("animated  "+ (s.hasClass("left")?"fadeInLeft":"fadeInRight"));
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

//цвета и сопоставление для диаграмм
	window.colorCircle = function(R){
		return (R<3?"#cf4130":(R<4?"#f7b946":"#19a05b"));
	};
// одиночная инициализация круговой диаграммы
	window.circleItemInit = function(index, t){
		var circle = $(t),
			_index = index,
			_p = parseFloat(circle.data("counter")),
			p = (_p*100)/5,
			Rat = circle.find(".rating-counter"),
			countries=  circle.find(".countries")[0].getContext("2d"),
			rating_counter = 0,

			pieData = [
				{ value : p, color :   window.colorCircle(_p),},
				{ value :  100-p, color : "transparent",}
			],

			pieOptions = {
				animationSteps: 200,
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
		}).on("click", ".close-multiselect", function(){
			$(".search-block-drop").remove();
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
				var R = parseFloat(state.rating).toFixed(1), c = window.colorCircle(R)
				return  state.text+(_is_option?("<span style='background: "+c+"' class='restoraunt-rating'>"+ parseFloat(state.rating).toFixed(1)+"</span>"):"");
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
			m = $(".search-content-block, .map-cart"),
			hh = $("header").height(),
			w  = $(window),
			c = function(){s.css({"min-height":w.height()-hh})},
			f = function(){m.height(w.height()-hh)};
		f();c();
		$(this).resize(function(){f(); c();});
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
			var t = this;
			window.loader.show($(this).parent().parent());

			// Типа аякс запрос
			setTimeout(function(){
				$(".bot .new-review .circle").data({counter: 3.3});
				$(".bot .new-review").css({ "display": "inline-block"}).animate({"opacity": 1});
				window.circleItemInit(0, $(".bot .circle")[0]);
				window.loader.hide();
			}, 500);

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
			toggletext.filter(function(){var val = this.innerHTML; return $.trim(val).length<=390}).next().next().remove();
			toggletext.filter(function(){var val = this.innerHTML; return $.trim(val).length>390}).css({height: 80});
			$("body").on("click", ".toggler", function(e){
				e.preventDefault();
				$(this).add($(this).parents(".text-wrap")).toggleClass("up");
			});
		}
	};


window.gmap_initialize = function(_map, coord) {
	var myLatlng = new google.maps.LatLng(coord[0], coord[1]),
		myOptions = {
		    zoom: 8,
	      	scrollwheel: false,
		    center: myLatlng,
		    mapTypeId: google.maps.MapTypeId.ROADMAP
		},
		mm = '<div class="popover-inner"><div class="place"><i class="fa fa-map-marker"></i><span class="p">'+$(_map).data("adress")+'</span><span class="m">'+$(_map).data("metro")+'</span></div><div class="phone"><i class="fa fa-phone"></i>'+$(_map).data("phone")+'</div>',
		map = new google.maps.Map(_map, myOptions),
		infowindow = new google.maps.InfoWindow({
		  	  content: mm
			}),
			image = new google.maps.MarkerImage("images/map-marker-sprite.png",
              new google.maps.Size(74, 74),
              new google.maps.Point(74, 0),
              new google.maps.Point(32, 74)
      		),
      		marker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				icon: image,	
				title: $(_map).data("name")
			});

		google.maps.event.addListener(marker, 'click', function() {
		    infowindow.open(map,marker);
		});
}

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
	}

// это для блоков с метками ресторанов на главной странице
	$(function(){
		$("#add-rest").click(function(){
			var name = prompt("введите название ресторана"),
				url = prompt("введите сссылку на страницу ресторана"),
				cook = prompt("введите Название кухни"),
				price = prompt("Введите среднюю цену"),
				time = prompt("Введите время работы"),
				r = prompt("Рейтинг"),
				newblock = $('<a href="'+url+'"><div class="title"><i></i><span class="brdrd"><span class="label">'+name+'</span></span></div><div class="info"><div class="circle"  data-counter="'+r+'"><canvas class="countries" width="100%" height="100%"></canvas><span class="rating-counter">0</span></div><div class="list"><div class="item-1"><i></i><span>'+cook+'</span></div><div class="item-2"><i></i><span>'+price+'</span></div><div class="item-3"><i></i><span>'+time+'</span></div></div></div></a>');
			newblock.draggable({
				start: function(){ $("#remover").fadeIn(); },
				stop: function(){ $("#remover").fadeOut();}
			});
			$(".restorant-pseudo-map").append(newblock);
		});
		$("#remover").droppable({
			greedy:true ,
			hoverClass: "ui-state-active",
			drop:function(event, ui){
				$(ui.draggable).remove();
				$("#remover").fadeOut();
			}
		});
		$("#gen-rest").click(function(){
			console.log($(".restorant-pseudo-map").html());
			$("#coder").val($(".restorant-pseudo-map").html())
			$(document).scrollTop(9999);
			SelectText(0, $("#coder").val().length);
		})
	});
	function SelectText(begin, end) {ta = document.getElementById("coder");if (ta.createTextRange) {tr = ta.createTextRange();tr.move("character", begin);tr.moveEnd("character", end-begin);tr.select();} else  if (ta.setSelectionRange) {ta.setSelectionRange(begin, end);}}



var keys = [37, 38, 39, 40];



function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
             e.preventDefault();
            return;
        }
    }
}
function wheel(e) {
  e.preventDefault();
}
function disable_scroll() {
  if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
}
function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
}





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
