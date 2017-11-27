'use strict';

var div = require('./div');

var CIRCLE = function CIRCLE() {
    var _parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

    var _class = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    this._ = div(_parent, ' a-circle' + _class);
    this._.borderRadius = '50%';
    return this;
};

module.exports = function (_parent, _class) {
    return new CIRCLE(_parent, _class);
};