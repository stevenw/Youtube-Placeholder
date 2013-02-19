;(function ($, window, document, undefined) {
	var pluginName = 'youtubePlaceholder';
	var defaults = {
		video: {
			width: 560,
			height: 315
		},
		button: {
			src: 'img/icon-youtube-play.png',
			width: 107,
			height: 106
		}
	};

	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);
		this.options.video.width = $(this).data('youtubeWidth');
		this.options.video.height = $(this).data('youtubeHeight');
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype = {
		init: function() {
			var me = this;

			me.createImagePreview(me.element, this.options);

			$(me.element).on('click', '.youtube-preview-image, .youtube-play-button', function (event) {
				me.swapPlaceholderWithIframe(me.element, me.options);
			});
		},
		createImagePreview: function(element, options) {
			var videoId = $(element).data('youtubeId');

			var image = $('<img>').attr({
				src: "http://img.youtube.com/vi/" + videoId + "/0.jpg",
				width: options.video.width,
				height: options.video.height
			}).addClass('youtube-preview-image');

			var play = $('<img>').attr(options.button).addClass('youtube-play-button');

			$(element).html(image);
			$(element).append(play);
		},
		swapPlaceholderWithIframe: function (element, options) {
			var videoId = $(element).data('youtubeId');

			var iframe = $('<iframe></iframe>').attr({
				width: options.video.width,
				height: options.video.height,
				src: "http://www.youtube.com/embed/" + videoId + "?rel=0&autoplay=1",
				frameborder: 0,
				allowfullscreen: true
			})

			$(element).html(iframe);
		},
	};

	$.fn[pluginName] = function (options ) {
		return this.each(function () {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this, options));
			}
		});
	};
}(jQuery, window, document));