$(function(){
// переменные 
	w = window;
	window.b = $("body");
// инит всех методов для всего всего на сайте
	// $(".item-0").height($(window).height())\
	w.item0HEIGHT();
// НАЧАТЬ С НИЖНЕГО УРОВНЯ!!!!!!!!!!!!!"
// НАЧАТЬ С НИЖНЕГО УРОВНЯ!!!!!!!!!!!!!"
(function(window){

	$(".eye").hover(
		function(){
			$(this).addClass("hover");
			 var s = $(this)
			 var l  = s.position().left>$(window).width()-s.position().left?"auto":s.position().left
			$(this).children().css({
				left: l ,
				top: s.position().top-250,
				right: 10
			})
		}, 
		function(){
			$(this).removeClass("hover");

		}
	);

	var  sizer = function(){
			$(".item-1 ").css({
			"padding-bottom" : 100+$(".main-tab-item.active .level-1-header").height() + $(".main-tab-item.active  .level-1-item.active .level-1-item-content").height()  
		});
		$(".main-tab-item.active  .level-1-item.active .level-2").css({
			top: 120+$(".main-tab-item.active  .level-1-item.active .level-1-item-content").height() 
		});
		$(".item-2 ").css({
			"margin-top" : $(".main-tab-item.active  .level-1-item.active .level-2-item.active").height() + 200+$(".main-tab-item.active  .level-1-item.active .level-2-header").height()+$(".main-tab-item.active  .level-1-item.active .level-2-body").height()
		})
		if($(".level-1-item.active .level-2-header").length == 0){
			$(".item-2 ").css({"margin-top": "0"})
		}	
	}

	// Клик по основным табам
	$("body").on("click", ".main-tab-header a:not(.no-pervent)", function(e){
		var i  = $(this).index()
		e.preventDefault();
		$(".main-tab-item.active, .main-tab-header a.active,.main-tab-item .active  ").removeClass("active")
		var active = $(".main-tab-item:eq("+ $(this).addClass("active").index()+")").addClass("active")
		active.find( ".level-1-header:visible a:first").click();
		$( ".main-tab-item.active .level-1-item.active .default .level-2-header a:first").click()
	 	sizer();
	}).on("click", ".level-1-header a", function(e){
		e.preventDefault();
		var p = $(this).parents(".main-tab-item")
		$(".level-1-header a, .level-1-item").removeClass("active");
		p.find(".level-1-item:eq("+ $(this).addClass("active").index()+")").addClass("active");
		$( ".main-tab-item.active .level-1-item.active .activess .level-2-header a:first").click();
	 	sizer();
	}).on("click", ".level-2-header a, .pg span", function(e){
		e.preventDefault();
		var p = $(this).parents(".activess")
		$(".level-2-header a, .level-2-item").removeClass("active");
		p.find(".level-2-item:eq("+ $(this).addClass("active").index()+")").addClass("active");
		p.find(".level-2-header a:eq("+ $(this).addClass("active").index()+")").addClass("active");
		var sw = p.find(".swiper-container").data('swiper')
	 	sizer();
		if(sw){sw.swipeTo($(this).index())}
		$(".pg-2").hide();
		$(".pg-2:eq("+ $(this).addClass("active").index()+")").show();
	}).on("click", ".primvnedr", function(e){
		e.preventDefault();
		var p = $(this).parents(".level-1-item");
		p.find(".bottom-link").removeClass("act")
		$(this).addClass("act")
		p.find(".activess").removeClass("activess")
		p.find(".custom").addClass("activess")
		$( ".main-tab-item.active .level-1-item.active .activess .level-2-header a:first").click();
	}).on("click", ".bottom-link", function(e){
		e.preventDefault();
		var p = $(this).parents(".level-1-item");
		p.find(".primvnedr").removeClass("act")
		$(this).addClass("act")
		p.find(".activess").removeClass("activess")
		p.find(".default").addClass("activess")
		$( ".main-tab-item.active .level-1-item.active .activess .level-2-header a:first").click();
	})

	.on("click", ".tab-1-header a", function(e){
		var i  = $(this).index();
		$(".tab-1-header a, .tab-1-body .tab-2").removeClass("active");
		e.preventDefault();
		$(this).addClass("active")
		$(".tab-1-body .tab-2:eq("+i+")").addClass("active");
		$(".tab-1-body .active .tab-2-header a:first").click();
	}).on("click", ".tab-2-header a", function(e){
		var i  = $(this).index();
		$(".tab-2-header a, .tab-1-body .tab-2-body").removeClass("active");
		e.preventDefault();
		$(this).addClass("active").parents(".tab-2.active").find(".tab-2-body:eq("+i+")").addClass("active");
		$(".item-3").css({
			height: $(".tab-2.active").height()+ $(".tab-2.active .tab-2-body.active").height()+250
		});
	});


	$( ".tab-1-header a:first, .main-tab-header a:first").click()


	$(".slider-level-2>.swiper-container").each(function(){
		// var pg = $(this).parent().find(".pg")[0]
		var s = this;
		var newslider = new Swiper(s, {
	  		slidesPerView: 1,
			onlyExternal: true,
	  		createPagination: true
		});
		$(s).data({swiper: newslider})
	});
	$(".swr .swiper-container").each(function(index){
		var pg = $(this).parents(".slider-level-2").find(".pg-2")[index]
		console.log(pg)
		var s = this;
		var newsliderV = new Swiper(s, {
  		 	mode: 'vertical',
			pagination: pg,
			paginationClickable: true,
			onlyExternal: true,
		});
		$(s).data({swiper: newsliderV})
	});


	window.item5 = new Swiper(".item-5 .swiper-container",{
	    loop: true,
     	slidesPerView: 5
	}); 
	$(".item-5 .controls span").click(function(){
		window.item5[$(this).hasClass("next")?"swipeNext":"swipePrev"]();
	})
})(w)






});


window.item0HEIGHT = function(){
	var i0 = $(".item-0")
	i0.height($(window).height());
	$(window).resize(function() {
		i0.height($(window).height());
	})
};