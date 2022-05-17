$(() => {
	// Основной слайдер на главной
	if ($('.main_slider .swiper-container').length) {
		new Swiper('.main_slider .swiper-container', {
			loop: true,
			speed: 750,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		})
	}


	// Премиум обьявление
	if ($('.ads .ad.premium').length) {
		var sliders = []

		$('.ads .ad.premium').each(function (index) {
			$(this).find('.images .big .swiper-container').addClass('s' + index)
			$(this).find('.images .thumbs button').data('slider-index', index)

			const slider = new Swiper('.s' + index, {
				loop: false,
				speed: 500,
				watchSlidesVisibility: true,
				slideActiveClass: 'active',
				slideVisibleClass: 'visible',
				spaceBetween: 8,
				slidesPerView: 1,
				on: {
					slideChange: swiper => {
						setTimeout(() => {
							$(this).find('.images .thumbs button').removeClass('active')
							$(this).find('.images .thumbs button').eq(swiper.activeIndex).addClass('active')
						})
					}
				}
			})

			sliders.push(slider)
		})

		$('.ads .ad.premium .images .thumbs button').click(function (e) {
			e.preventDefault()

			let sliderIndex = $(this).data('slider-index')

			sliders[sliderIndex].slideTo(parseInt($(this).data('slide-index')), 500)
		})
	}


	// Товары
	if ($('.products .swiper-container').length) {
		let sliders = []

		$('.products .swiper-container').each(function (i) {
			let slides = $(this).find('.slide').length,
				this_ID = $(this).attr('id'),
				options = {
					loop: false,
					speed: 500,
					watchSlidesVisibility: true,
					slideActiveClass: 'active',
					slideVisibleClass: 'visible',
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev'
					},
					breakpoints: {
						0: {
							spaceBetween: 16,
							slidesPerView: 'auto'
						},
						480: {
							spaceBetween: 24,
							slidesPerView: 'auto'
						},
						1024: {
							spaceBetween: 20,
							slidesPerView: 3
						}
					},
					on: {
						init: swiper => {
							setTimeout(() => {
								productHeight($(swiper.$el), $(swiper.$el).find('.product').length)
							})
						},
						resize: swiper => {
							setTimeout(() => {
								productHeight($(swiper.$el), $(swiper.$el).find('.product').length)
							})
						}
					}
				}

			sliders[i] = new Swiper('#' + this_ID, options)

			if (slides > sliders[i].params.slidesPerView) {
				options.loop = true
				sliders[i].destroy(true, true)
				sliders[i] = new Swiper('#' + this_ID, options)
			}
		})
	}


	// Боковая колонка - фильтр
	$('aside .mob_btns .filter_btn').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active')

		$(this).hasClass('active')
			? $('aside .filter').slideDown(200)
			: $('aside .filter').slideUp(200)
	})


	$('.filter .title').click(function (e) {
		e.preventDefault()

		!$(this).hasClass('active')
			? $(this).toggleClass('active').next().slideDown(300)
			: $(this).toggleClass('active').next().slideUp(200)
	})


	$('aside .filter .spoler_btn').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.item')

		$(this).toggleClass('active')
		parent.find('.hide').slideToggle(300)
	})


	// Страница товара
	if ($('.product_info .images').length) {
		const productThumbs = new Swiper('.product_info .thumbs.swiper-container', {
			loop: false,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			slidesPerView: 4,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			breakpoints: {
				0: {
					spaceBetween: 12,
					direction: 'horizontal'
				},
				768: {
					spaceBetween: 16,
					direction: 'vertical'
				}
			}
		})

		const productSlider = new Swiper('.product_info .big .swiper-container', {
			loop: false,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 20,
			slidesPerView: 1,
			thumbs: {
				swiper: productThumbs
			}
		})
	}


	// Обьявление в/из избранно(е/го)
	$('.favorite_btn').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active')
	})


	// Обьявление скрыть/показать
	$('.ad > .views .btn').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active')
		$(this).closest('.ad').toggleClass('hidden')
	})


	// ЛК - Обьявление - Заявка - Спойлер в описании
	$('.ad_info .orders .order .description .spoler_btn').click(function (e) {
		e.preventDefault()

		$(this).closest('.description').find('.text').toggleClass('full')
		$(this).toggleClass('active')
	})


	// ЛК - Обьявление - Заявка - Смена статуса
	$('.ad_info .orders .order .status select').change(function () {
		setTimeout(() => {
			let parent = $(this).closest('.order'),
				statusVal = $(this).val()

			if (statusVal == 1) {
				parent.removeClass('rejected')
				parent.find('.status .exp').hide()
				parent.find('.status .exp1').fadeIn(300)
			}

			if (statusVal == 2) {
				parent.addClass('rejected')
				parent.find('.status .exp').hide()
			}

			if (statusVal == 3) {
				parent.addClass('rejected')
				parent.find('.status .exp').hide()
				parent.find('.status .exp3').fadeIn(300)
			}
		})
	})


	// ЛК - Добавление обьявления
	$('.ad_add .form .section .item .title.spoler_btn').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active')
		$(this).next('.data').slideToggle(300)
	})


	$('.ad_add .form .add_field_btn').click(function (e) {
		e.preventDefault()

		let template = $(this).next('.template').html()

		$(this).before(template)
		$(this).prev('.field').find('select').niceSelect()
	})


	$('body').on('click', '.ad_add .form .delete_btn', function (e) {
		e.preventDefault()

		let field = $(this).closest('.field')

		field.remove()
	})


	$('body').on('click', '.form .files .file .remove_btn', function (e) {
		e.preventDefault()

		let files = $(this).closest('.files'),
			file = $(this).closest('.file')

		file.remove()


		if (files.find('.file').length == 0) files.remove()
	})


	$('.ad_add .form .checkboxs label').click(function () {
		let template = $(this).next('.template').html()

		$(this).closest('.checkboxs').next().slideToggle(300)
	})


	$('.ad_add .form .with_tips').keydown(function () {
		let _self = $(this),
			parent = $(this).closest('.line')

		setTimeout(() => {
			if (_self.val().length > 0) {
				parent.find('.tips .scrollbar > *').hide()
				parent.find('.tips .scrollbar > *:contains("' + $(this).val() + '")').show()
				parent.find('.tips').addClass('show')
			} else {
				parent.find('.tips').removeClass('show')
			}
		})
	})

	$('.form .tips .tip').click(function () {
		let parent = $(this).closest('.line')

		parent.find('.input').val($(this).text())
		parent.find('.tips').removeClass('show')
	})


	// Календарь
	moment.locale('ru', {
		months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
	})

	$('input.date_input').daterangepicker({
		opens: 'left',
		locale: {
			format: 'DD MMMM YYYY',
			applyLabel: 'Готово',
			cancelLabel: 'Сбросить',
			fromLabel: 'С',
			toLabel: 'По',
			customRangeLabel: 'Custom',
			daysOfWeek: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
			monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			firstDay: 1
		}
	}, function (start, end, label) {
		console.log(start)
	})


	// Залипание элемента при прокрутке
	$('.sticky').stick_in_parent()


	// Поле пароля в форме
	$('.form .view_btn').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.field')

		$(this).toggleClass('active')

		$(this).hasClass('active')
			? parent.find('.input').attr('type', 'text')
			: parent.find('.input').attr('type', 'password')
	})


	// Форма - чекбоксы
	$('.form .checks > .field label').click(function () {
		let _self = $(this),
			parent = $(this).closest('.field')

		setTimeout(() => {
			_self.prev().prop('checked')
				? parent.find('.sub_checks input[type=checkbox]').prop('checked', true)
				: parent.find('.sub_checks input[type=checkbox]').prop('checked', false)
		})
	})

	$('.form .sub_checks label').click(function () {
		let _self = $(this),
			subСhecks = $(this).closest('.sub_checks'),
			parent = subСhecks.closest('.field')

		setTimeout(() => {
			subСhecks.find('input[type=checkbox]:checked').length
				? parent.find('> input[type=checkbox]').prop('checked', true)
				: parent.find('> input[type=checkbox]').prop('checked', false)
		})
	})


	// Вакансии - Вакансия
	$('.vacancies .vacancy .info > .btns .btn.respond_btn, .vacancy_accordion .respond_btn:not(.modal_btn)').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active')
	})


	// Страница вакансии
	$('.vacancy_info .contacts .show_btn').click(function (e) {
		e.preventDefault()

		$(this).remove()
		$('.vacancy_info .contacts .info').fadeIn(300)
	})


	// Резюме
	$('.resumies .resume .info > .btns .invite_btn').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active')
	})


	// Моб. каталог
	$('.catalog .mob_spoler_btn').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active')

		$(this).hasClass('active')
			? $('.content .catalog .category.mob_hide').fadeIn(200)
			: $('.content .catalog .category.mob_hide').fadeOut(200)
	})


	// Моб. меню
	$('.mob_header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('body').toggleClass('menu_open')
		$('.mob_header .mob_menu_btn').toggleClass('active')
		$('header').toggleClass('show')

		$('body').hasClass('menu_open')
			? $('.overlay').fadeIn(200)
			: $('.overlay').fadeOut(200)
	})
})



$(window).on('load', () => {
	// Фикс. шапка
	moHeaderInit = true,
		mobHeaderHeight = $('.mob_header').outerHeight()

	$('.mob_header').wrap('<div class="mob_header_wrap"></div>')
	$('.mob_header_wrap').height(mobHeaderHeight)

	moHeaderInit && $(window).scrollTop() > 0
		? $('.mob_header').addClass('fixed')
		: $('.mob_header').removeClass('fixed')
})



$(window).resize(() => {
	// Фикс. шапка
	moHeaderInit = false
	$('.mob_header_wrap').height('auto')

	setTimeout(() => {
		moHeaderInit = true
		mobHeaderHeight = $('.mob_header').outerHeight()

		$('.mob_header_wrap').height(mobHeaderHeight)

		moHeaderInit && $(window).scrollTop() > 0
			? $('.mob_header').addClass('fixed')
			: $('.mob_header').removeClass('fixed')
	}, 100)
})



$(window).scroll(() => {
	// Фикс. шапка
	typeof moHeaderInit !== 'undefined' && moHeaderInit && $(window).scrollTop() > 0
		? $('.mob_header').addClass('fixed')
		: $('.mob_header').removeClass('fixed')
})



// Выравнивание товаров
function productHeight(context, step) {
	let start = 0,
		finish = step,
		$products = context.find('.product')

	$products.find('.name').height('auto')

	$products.each(function () {
		setHeight($products.slice(start, finish).find('.name'))

		start = start + step
		finish = finish + step
	})
}