/* simple carousel using Jquery */
(function($){
    $.carousel  = function(options){
        "use strict";

        /* if user does not provide config. then use defaults */
        var defaults = {
            delay : 3000,
            next  : $("#next"),
            prev  : $("#prev"),
            pause : $("#pause"),
            images : $('.carousel-image'),
            container : $("#container")
        };

        // Overwrite default options
        // with user provided ones
        // and merge them into "options".
        var options = $.extend({}, defaults, options);

        /* next button */
        options.next.on('click',function(){
            var current = options.images.filter(':visible');
            current.fadeOut('fast',function(){
                ($(this).next().length) ? $(this).next().fadeIn() : options.images.first().fadeIn();
            });
        });

        /* prev button */
        options.prev.on('click',function(){
            var current = options.images.filter(':visible');
            current.fadeOut('fast',function(){
                ($(this).prev().length) ? $(this).prev().fadeIn() : options.images.last().fadeIn();
            });
        });

        /* pause button */
        options.pause.on('click', function () {
            options.container.toggleClass('paused');
            if(options.container.hasClass('paused')){
                $(this).text('Play');
            }else{
                $(this).text('Pause');
            }
        });

        /* disable the carousel on mouse hover */
        options.container.hover(function () {
            options.container.toggleClass("paused");
        });

        /* Timmer which rotates the images in carousel container */
        setInterval(function(){
            if(!options.container.hasClass('paused')){
                var $active = options.images.filter(":visible");
                var nextimage = $active.next();
                $active.fadeOut('fast',function(){
                    (nextimage.length)? $(this).next().fadeIn() : options.images.first().fadeIn();
                });
            }
        },options.delay);
    }
})($);

