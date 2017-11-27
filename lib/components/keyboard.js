'use strict';

var KEYBOARD = function KEYBOARD() {
    var _this = this;

    this.keys = {};
    window.addEventListener('keydown', function (e) {
        _this.keys[e.key] = true;
    });

    window.addEventListener('keyup', function (e) {
        _this.keys[e.key] = false;
    });
    return this;
};

KEYBOARD.prototype.get = function (value) {
    return this.keys[value];
};

module.exports = function () {
    return new KEYBOARD();
};