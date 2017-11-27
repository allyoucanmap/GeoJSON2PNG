'use strict';

var line = require('./line');

var coo = [[10, 20], [100, 200], [400, 500], [300, 300]];

var POLYLINE = function POLYLINE() {
    var _parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

    var _class = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    this.lines = coo.map(function (c, i) {
        return i < coo.length - 1 ? line(_parent, _class, coo[i][0], coo[i][1], coo[i + 1][0], coo[i + 1][1]) : null;
    }).filter(function (c) {
        return c;
    });
    return this;
};

module.exports = function (_parent, _class) {
    return new POLYLINE(_parent, _class);
};