var mobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
var iPad = /iPad/i.test(navigator.userAgent);
var mobileResolution = function(){ return window.innerWidth <= 680 };
var tabletResolution = function(){ return window.innerWidth <= 1024 };
var IE8 = /MSIE 8/i.test(navigator.userAgent);

/* Loader */
var Loader = {
	firstPage: true,
	resizeTimer: null,
	timer: 400,
	transitionTimer: 800,

	init: function() {
		Loader.wrapper = $('#loader-wrapper');

		if (mobile || mobileResolution()) {
			Loader.wrapper.addClass('mobile');
			return;
		}

		Loader.build();

		$(window).resize(function() {
			clearTimeout(Loader.resizeTimer);

			Loader.resizeTimer = setTimeout(function() {
				Loader.build();
			}, 100);
		});
	},

	build: function() {
		return;
		var html = [];
		var $win = $(window);
		var screenAreaItems = $win.width() / 145 * $win.height() / 145;

		for (var i = 0; i < screenAreaItems; i++) {
			html.push('<div class="losangle losangle-bottom losangle-c-1 losangle-w-template-1"><div class="losangle-content"></div></div>');
		}

		$('.loader-losangles-1, .loader-losangles-2', Loader.wrapper).html(html.join(''));
	},

	show: function(cb) {
		Loader.wrapper.show();
		setTimeout(function() {
			Loader.wrapper.addClass('show');
		}, 1);
		// setTimeout(function() {
		// 	$('.loader-gif', Loader.wrapper).addClass('show');
		// 	setTimeout(cb, Loader.timer);
		// }, 800);

		setTimeout(cb, Loader.timer);

		return;

		$('.losangle', Loader.wrapper).each(function() {
			var $this = $(this);
			setTimeout(function(){
				$this.addClass('show');
			}, Math.random() * Loader.timer);
		});

		setTimeout(function() {
			$('.loader-gif', Loader.wrapper).addClass('show');
			setTimeout(cb, Loader.timer);
		}, Loader.timer + Loader.transitionTimer);
	},

	hide: function() {
		// $('.show', Loader.wrapper).removeClass('show');
		Loader.wrapper.removeClass('show');
		setTimeout(function() {
			Loader.wrapper.hide();
		}, 400);

		return;

		Loader.wrapper.fadeOut('slow', function() {
			$('.show', Loader.wrapper).removeClass('show');
		});

		return;

		$('.losangle', Loader.wrapper).each(function() {
			var $this = $(this);
			setTimeout(function(){
				$this.removeClass('show');
			}, Math.random() * Loader.timer);
		});

		$('.loader-gif', Loader.wrapper).removeClass('show');

		setTimeout(function() {
			Loader.wrapper.hide();
		}, Loader.timer + Loader.transitionTimer);
	},

	pageLoad: function() {
		if (!mobile && !tabletResolution() && !IE8) {
			$('#home-panel-services').height('1461');

  			ParallaxStage && ParallaxStage.avaliable(768) && ParallaxStage.reload();
		}

		if (!mobile || iPad) {
			$(".fancybox").fancybox({
				// scrolling: 'yes',
				keys: {
					next: {
						39: 'left'
					},
					prev: {
						37: 'right'
					}
				},
				scrollOutside: false,
				padding: 2,
				mouseWheel: false,
				nextEffect: 'fade',
				prevEffect: 'fade'
			});
		} else {
			$('.fancybox').on('click', function(ev) {
				ev.preventDefault();
			});
		}

		if (mobile || tabletResolution()) {
			window.scrollTo(0, 0);
		}

		updateGalleries();

		/* Apply scroll go to */
		$('[data-scroll]').click(function() {
			var scroll = mobileResolution() ? $(this).data('mobile-scroll') : $(this).data('scroll') - middleHeight;
			window.scrollTo(0, scroll);
		});

	}
};

Loader.init();

/* Routes */
Path.map('(/)(:language)(/:main)(/:sub)(/:params)').to(function() {
	updateLanguageLinks((this.params.main ? '/' + this.params.main : '') + (this.params.sub ? '/' + this.params.sub : ''));

	var path = this.params.language + '/';
	path += this.params.main || 'home';
	if (this.params.sub) {
		path += '/' + this.params.sub || '';
	}

  Loader.firstPage = false;

	app.TemplateController.loadTemplate(path, '#container-wrapper', Loader.pageLoad);
});

Path.history.listen(true);

//((location.href.split('/').length <= 3) || (location.href.split('/').length == 4 && location.href.substring(location.href.length-1) == '/')) && Path.history.pushState({}, '', '/home');

/* Events */
$(function() {
	$('.button-nav, nav a').on('click', function() {
		if (mobile || mobileResolution()) {
			$('#general').toggleClass('nav-opened');
			$('.button-nav').toggleClass('active');
		}
	});

	$('body').on('click', 'a[data-push-state]', function(ev) {
        var href = $(this).data('push-state') || $(this).attr('href');
		Path.history.pushState({}, '', href);
		ev.preventDefault();
	});
});

var generalResize = null;
var middleHeight = $(window).height() / 2;

$(window).resize(function() {
	middleHeight = $(window).height() / 2;

	clearTimeout(generalResize);

	generalResize = setTimeout(function() {
		if (mobile || mobileResolution()) {
			window.parallax && window.parallax.destroy();
		}/* else {
			parallax && parallax.rebuild();
			parallax && parallax.start();
		}*/
	}, 100);
});

/* Gallery */
var updateGalleries = function() {
	if (window.Gallery) {
		$('[data-gallery]').each(function() {
			var element = $(this);
			var maxWidth = element.data('gallery-max-width');

			if (maxWidth && Modernizr.mq('(min-width:' + maxWidth + 'px)')) return true;

			new Gallery({
				parent: this,
				elements: element.data('gallery'),
				mobile: mobile //&& maxWidth

			});
		});
	}
};

/* Languages */
var updateLanguageLinks = function(path) {
	$('a[rel=language]').each(function() {
		var lang = $(this).data('lang');
		this.href = '/' + lang + path;
	});
};

/* Brands */
var Clients = {};

Clients.timer = null;
Clients.animating = false;

Clients.update = function() {
	return;
	
	if (Clients.animating || (window.parallax && !window.parallax.stopped)) return;
	clearTimeout(Clients.timer);

	Clients.timer = setTimeout(function() {

		$('[data-brands]').each(function() {
			Clients.animating = true;

			var element = $(this);
			var losangles = element.find('.losangle').not('.clients-box-center');
			var brands = element.data('brands').split(',');
			var rand = Math.floor((Math.random()*losangles.length)+0);

			var losangle = losangles.eq(rand);

			var animation = {};

			losangle.animate({ rotateY: 90, scale: 0.7 }, { duration: 200, easing: 'easeInQuad', complete: function() {
				var content = losangle.find('.losangle-content');
				var brand = brands.shift();
				brands.push(content.find('img').attr('src').match(/brands-(.*)\./)[1]);

				element.data('brands', brands.join(','));

				content.html('<img src="img/brands/img-brands-' + brand + '.png">');
				losangle.animate({ rotateY: 0, scale: 1 }, {duration: 300, easing: 'easeOutQuad', complete: function() {
					Clients.animating = false;
					Clients.update();
				}});
			}});
		});

	}, 1500);
};

$(window).scroll(function() {
	clearTimeout(Clients.timer);
});

$(window).load(function() {
	Loader.pageLoad();
});
