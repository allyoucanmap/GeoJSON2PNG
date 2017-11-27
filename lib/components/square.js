'use strict';

var div = require('./div');

var SQUARE = function SQUARE() {
    var _parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

    var _class = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    this._ = div(_parent, ' a-square' + _class);
    return this;
};

module.exports = function (_parent, _class) {
    return new SQUARE(_parent, _class);
};