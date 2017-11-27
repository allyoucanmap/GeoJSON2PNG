"use strict";

var animation = null;
var frame = null;
var play = function play() {
    var loop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
    var fps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60;

    var draw = function draw() {
        animation = setTimeout(function () {
            frame = requestAnimationFrame(draw);
        }, 1000 / fps);
        loop();
    };
    draw();
};

var stop = function stop() {
    if (animation) {
        clearTimeout(animation);
        cancelAnimationFrame(frame);
    }
};

module.exports = {
    play: play,
    stop: stop
};