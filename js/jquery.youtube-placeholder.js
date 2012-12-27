;(function ($, window, document, undefined) {
	var pluginName = 'youtubePlaceholder';
	var defaults = {
		video: {
			width: 560,
			height: 315
		},
		button: {
			src: 'icon-youtube-play.png',
			width: 107,
			height: 106
		}
	};

	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype = {
		init: function() {
			var me = this;

			this.createImagePreview(this.element, this.options);

			$('.youtube-preview-image, .youtube-play-button').on('click', me.swapPlaceholderWithIframe);
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
			var preview = $(this).closest('.youtube-placeholder');
			var videoId = $(preview).data('youtubeId');

			var iframe = $('<iframe></iframe>').attr({
				width: 560,
				height: 315,
				src: "http://www.youtube.com/embed/" + videoId + "?rel=0&autoplay=1",
				frameborder: 0,
				allowfullscreen: true
			})

			$(preview).html(iframe);
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