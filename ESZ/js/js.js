$(function(){
	// инит всех методов для всего всего на сайте
		window.initscrlpxl();
		window.initPartnerSlider();
		window.initSelect();
		window.initDatePicker();
		window.initMasks();

	// События
	$("body")
		// скрытие модалього при открытии нового
			.on("click", "[data-toggle]", function(){
				$(".modal").modal("hide");
				window.initMasks();
			})
		//  Видео блок НА ГЛАВНОЙ	
			.on("click", ".video .controls .play, .video .controls .close", function(){
				$(".video")[($(this).hasClass("play")?"add":"remove")+"Class"]("w100");
				$(".video .controls .play").toggle();
			})
		// change силизованнвх селектов  
			.on("change", "select", function(){
				var self  = $(this)
				var wrapper = self.parent();
				wrapper.find(".stylizselect .placeholder .current-value").text(self.find(":selected").text());
			})
		// выбор кастомного опшина
			.on("click", ".dropdown a", function(){
				var self  = $(this)
				var wrapper = self.parents(".select");
				wrapper.find("option").filter("[value='"+self.data().value+"']")[0].selected = true;
				wrapper.find(".stylizselect .placeholder").text(wrapper.find(":selected").text());
				wrapper.removeClass("opened");
				wrapper.find("select").change()
			})
		// открытие кастомного селекта
			.on("click", ".placeholder", function(){
				var self  = $(this)
				var wrapper = self.parents(".select");
				wrapper.addClass("opened");
			})
		// закрытие кастомного селекта
			.on("click",  function(event){
				if( $(".opened").length > 0){
			     	if( $(event.target).closest(".placeholder").length)  return;
					$(".opened").removeClass("opened");
					event.stopPropagation();			
				}
			})
		// таблица в ЛИЧНОМ КАБИНЕТЕ и чекбоксы
			.on("change", ".cell.item-1 select", function(){
				switch( parseInt(this.value)){
					case 1: window.tablecheked.selectAll(); break;
					case 2: window.tablecheked.read(true); break;
					case 3: window.tablecheked.read(false); break;
					case 4: window.tablecheked.partner(false); break;
					case 5: window.tablecheked.aside(false); break;
					case 6: window.tablecheked.remove(false); break;
				}
			})
		// fileupload
			.on("click", ".file .view", function(){
				$(this).parent().find("input:file").click();
			})
		// file change
			.on("change", ".file input:file", function(){
				var value = $(this)[0]['files'][0]['name'];
				$(this).parent().attr("title", value).find("span").text(value)
			})
		// добавление телефонов
			.on("click", ".adds-item a:not(.rm)", function(){
				var clone = $(this).parents(".adds-item").clone();
				$(this).toggleClass("rm");
				$(this).parent().before(clone)
				clone.find("input").val("");
				// window.initMasks();
			})
		// Удаление телефона
			.on("click", ".adds-item a.rm", function(){
				var clone = $(this).parents(".adds-item").remove();
			})
		// открытие формы для пре=дложени заявки
				.on("click", ".viewform a", function(){
					$(this).parents(".orderform").toggleClass("p");
				}).on("click", ".create-order", function(){
					$(".orderform").removeClass("hidden");
					$(this).parents(".wrap-btn").addClass("hidden");
				}).on("click", ".cancel-order", function(){
					$(".orderform").addClass("hidden");
					$(".bttm.wrap-btn").removeClass("hidden");
				});

});


// МЕТОДЫ ДЛЯ ОБРАБОТКИ ТАБЛИЦЫ ЛК АДМИНА
	window.tablecheked = {
		// флаг выделаения всех чекбоксов. по дефолту - фалс
		all_isSeklected: false,
		// выделить все/снять выделение
			selectAll: function(){
				this.all_isSeklected = !this.all_isSeklected;
				$(".item-1 :checkbox").prop("checked" , this.all_isSeklected);
				var text = 	!this.all_isSeklected?"Выделить все":"Снять все";
				$(".current-value:contains("+(this.all_isSeklected?"Выделить все":"Снять все")+")").text(text)
			},
		// true прочитанное/ false не прочитанное/. 
			read: function(flag){
				$(".admin-table .tbody .row").filter(function(){ return $(this).find(":checked").length==1})[!flag?"addClass":"removeClass"]("hightlight")

			},
		// партнеры
			partner: function(){
				alert("Отправить выделенное партнерам бла бла бла")
			},
		// отложить
			aside: function(){
				alert("отложить")
			},
		// удалить
			remove: function(){
				$(".admin-table .tbody .row").filter(function(){ return $(this).find(":checked").length==1}).remove();
				alert("remove")
			}
	}


// select styliz
	window.initSelect = function(){
		$(".stylizselect").remove();
		var tmp_select = '<div class="stylizselect"> <a href="javascript:;" class="placeholder"></a><div class="dropdown"><ul></ul></div></div>'
		$(".select").each(function(){
			var self = $(this);
			self.data({
				wrapper: self,
				select: self.children(),
				option: self.find("option")
			});
			var new_select = $(tmp_select),
				options = self.data("option");
			for(var item=0; item<options.length; item++){
				var itm = options[item],
					newoption = $("<a href='javascript:;' title='"+itm.innerHTML+"'><span class='current-value'>"+itm.innerHTML+"</span></a>").data({value: itm.value});
				if( $(itm).data() ){
					if($(itm).data("counter")){
						newoption.append("<span class='counter'>"+$(itm).data("counter")+"</span>");
						if($(itm).data("not-view")) newoption.find(".counter").append("<span>("+$(itm).data("not-view")+")</span>");
					}
				}
				new_select.find("ul").append($("<li></li>").append(newoption)).end().find(".placeholder").text(self.find(":selected").text());
				self.append(new_select);
			}
		});
		
	}
// подсветка блоков при скролле
	window.initscrlpxl = function(){
		var win = $(window)
		if( $(".scrlpxl:not(.isview)").length> 0 ){
			win.scroll(function(){
				var time = 0,
					timepilus = 6000, //( view in css : 6s )
					prlx = win.scrollTop()+win.height() - ($(".advantages .scrolling")["offset"]().top+50);
				// делам запуск токо один раз, как достиглу нужной точки скролла. 
				//как достигли - убираем событие скролла
				if (prlx>0) {
					win.unbind("scroll")
					// подствечиваем кнопку
					$(".scrolling-item").each(function(index){
						var el_scroll = $(this);
						time+=timepilus;
						// если самый первый блок - то подсвечиваем без задержки
						if(el_scroll.hasClass("scrolling-item-1")) 	time = 0;
						// и добавляем клаасс для анимации
						setTimeout(function(){
							el_scroll.addClass("isview").find(">*").addClass("isview");
						}, time);
					});
					// приьавляем сверху еще timepilus, тк первый запуск был с 0сек
					setTimeout(function(){ $(".bordered-red-btn").addClass("isview"); }, time+timepilus);
				}
			});		
		}
	}
// слайдер партнеров
	window.initPartnerSlider = function() {
		var logolenght = $(".logotypes .swiper-container .swiper-slide").length;
		if(logolenght){
			window.partnerSlider = new Swiper('.logotypes .swiper-container', { // инит слайдера
				autoplay: 5000,
				loop: true,
				slidesPerView: (logolenght>=6?6:logolenght), // выводим не больше 6
			});
			$(document).on("click", ".slider-controls a", function(){// переключение слайдов
				window.partnerSlider["swipe"+($(this).data('type')<0?"Prev":"Next")]();
			});
		}

	}
// Датапикер для админики - для фильтра. http://nazar-pc.github.io/PickMeUp/
	window.globalmonth = ["дек","янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"];
	window.initDatePicker = function(){
		if($('#dpd1').length){
			$('#dpd1').pickmeup({
				mode: "range",
				format: "d-m-Y",
				calendars: 2,
				prev: "",
				next: "",
				change: function(formatted_date){
					var leng = formatted_date.length,
						newdata = "";
					if(leng == 2){
						for(var i = 0; i<leng; i++ ){
							var d =  formatted_date[i].substr(0, 2);
							var m =  formatted_date[i].substr(3, 2) ;
								m =  window.globalmonth[(m[0]==0)?m[1]:m];
							var y =  parseInt(formatted_date[i].substr(6));
							formatted_date[i] = d+" "+m+" "+y;
						}
						$(".date-choose>span").html(formatted_date[0] + " - "+ formatted_date[1]);
						// выбор даты
					}
				}
			});
		}
	}



//  инит масок для инпутов
	window.initMasks = function(){
		$('input:text').unmask();
		$(".percent input:text").mask('000');
		$(".phones input:text,.phone input:text").mask('+7 000 0000000');
	}