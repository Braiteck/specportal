$(() => {
	// Есть ли поддержка тач событий или это apple устройство
	if (!is_touch_device() || !/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) $('html').addClass('custom_scroll')


	// Ленивая загрузка
	setTimeout(() => {
		observer = lozad('.lozad', {
			rootMargin: '200px 0px',
			threshold: 0,
			loaded: (el) => el.classList.add('loaded')
		})

		observer.observe()
	}, 200)


	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll() + 'px')


	// Маска ввода
	$('input[type=tel]').inputmask('+7 (999) 999-99-99')

	// Кастомный select
	$('select:not(.multiple)').niceSelect()

	$('select.multiple').each(function () {
		$(this).select2({
			placeholder: $(this).data('placeholder'),
			dropdownParent: $(this).closest('.field')
		})
	})


	// Табы
	var locationHash = window.location.hash

	$('body').on('click', '.tabs button', function (e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			const $parent = $(this).closest('.tabs_container'),
				activeTab = $(this).data('content'),
				$activeTabContent = $(activeTab),
				level = $(this).data('level')

			$parent.find('.tabs:first button').removeClass('active')
			$parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			$activeTabContent.addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		const $activeTab = $('.tabs button[data-content=' + locationHash + ']'),
			$activeTabContent = $(locationHash),
			$parent = $activeTab.closest('.tabs_container'),
			level = $activeTab.data('level')

		$parent.find('.tabs:first button').removeClass('active')
		$parent.find('.tab_content.' + level).removeClass('active')

		$activeTab.addClass('active')
		$activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}


	// Мини всплывающие окна
	$('body').on('click', '.mini_modal_btn', function (e) {
		e.preventDefault()

		const modalId = $(this).data('modal-id'),
			parent = $(this).closest('.modal_cont')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.mini_modal').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.mini_modal_btn').removeClass('active')
			$(this).addClass('active')

			$('.mini_modal').removeClass('active')

			modalId === undefined
				? parent.find('.mini_modal').addClass('active')
				: $(modalId).addClass('active')

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click((e) => {
		if ($(e.target).closest('.modal_cont').length === 0) {
			$('.mini_modal, .mini_modal_btn').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})

	// Закрываем всплывашку при клике на крестик во всплывашке
	$('body').on('click', '.mini_modal .close_btn', (e) => {
		e.preventDefault()

		$('.mini_modal, .mini_modal_btn').removeClass('active')

		if (is_touch_device()) $('body').css('cursor', 'default')
	})


	// Аккордион
	$('body').on('click', '.accordion .accordion_item:not(.visible) .head', function (e) {
		e.preventDefault()

		const $item = $(this).closest('.accordion_item'),
			$accordion = $(this).closest('.accordion')

		if ($item.hasClass('active')) {
			$item.removeClass('active')
			$accordion.find('.accordion_item:not(.visible) .data').slideUp(300)
		} else {
			$accordion.find('.accordion_item').removeClass('active')
			$accordion.find('.accordion_item:not(.visible) .data').slideUp(300)

			$item.addClass('active').find('.data').slideDown(300)
		}
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.l10n = {
		CLOSE: "Закрыть",
		NEXT: "Следующий",
		PREV: "Предыдущий",
		MODAL: "Вы можете закрыть это модальное окно нажав клавишу ESC"
	}

	// Всплывающие окна
	$('body').on('click', '.modal_btn', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: $(this).data('content'),
			type: 'inline'
		}])
	})

	$('body').on('click', '.modal .close_btn', function (e) {
		e.preventDefault()

		Fancybox.close()
	})

	// Увеличение картинки
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false,
		},
		Thumbs: {
			autoStart: false,
		}
	})


	// Плавная прокрутка к якорю
	$('.scroll_btn').click(function (e) {
		e.preventDefault()

		let href = $(this).data('anchor'),
			addOffset = 0

		if ($(this).data('offset')) addOffset = $(this).data('offset')

		$('html, body').stop().animate({ scrollTop: $(href).offset().top - addOffset }, 1000)
	})


	// Моб. версия
	fiestResize = false

	if ($(window).width() < 375) {
		$('meta[name=viewport]').attr('content', 'width=375, user-scalable=no')

		fiestResize = true
	}
})



$(window).resize(() => {
	// Моб. версия
	if (!fiestResize) {
		$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
		if ($(window).width() < 375) $('meta[name=viewport]').attr('content', 'width=375, user-scalable=no')

		fiestResize = true
	} else {
		fiestResize = false
	}
})



// Вспомогательные функции
const setHeight = (className) => {
	let maxheight = 0

	className.each(function () {
		const elHeight = $(this).outerHeight()

		if (elHeight > maxheight) maxheight = elHeight
	})

	className.outerHeight(maxheight)
}


const is_touch_device = () => !!('ontouchstart' in window)


const widthScroll = () => {
	let div = document.createElement('div')

	div.style.overflowY = 'scroll'
	div.style.width = '50px'
	div.style.height = '50px'
	div.style.visibility = 'hidden'

	document.body.appendChild(div)

	let scrollWidth = div.offsetWidth - div.clientWidth
	document.body.removeChild(div)

	return scrollWidth
}