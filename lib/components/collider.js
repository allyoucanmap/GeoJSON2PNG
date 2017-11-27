'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var inside = function inside(p, a) {
    var ins = false;
    for (var i = 0, j = a.length - 1; i < a.length; j = i++) {
        if (a[i][1] > p[1] !== a[j][1] > p[1] && p[0] < (a[j][0] - a[i][0]) * (p[1] - a[i][1]) / (a[j][1] - a[i][1]) + a[i][0]) {
            ins = !ins;
        }
    }
    return ins;
};

var COLLIDER = function COLLIDER() {
    var _options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this._elements = _options.elements || null;
    return this;
};

COLLIDER.prototype.add = function (elements) {
    var currentElements = this._elements || [];
    this._elements = [].concat(_toConsumableArray(currentElements), _toConsumableArray(elements)) || null;
    return this;
};

COLLIDER.prototype.use = function (current) {
    var f = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    if (!this._elements) {
        return null;
    }
    this._elements = this._elements.filter(function (el) {
        return !el._removed;
    });
    if (current && !current._touch) {
        this._elements.forEach(function (el) {

            if (el._id !== current._id) {
                var check = {};
                current._bbox.forEach(function (b, i) {
                    if (inside(b, el._bbox)) {
                        check['p:' + i] = true;
                    }
                });
                if (check['p:0'] && check['p:1'] || check['p:1'] && check['p:2'] || check['p:1']) {
                    current.y(el._y + el._height);
                    f(true, check);
                } else if (check['p:2'] && check['p:3'] || check['p:3'] && check['p:4'] || check['p:3']) {
                    current.x(el._x - current._width);
                    f(true, check);
                } else if (check['p:4'] && check['p:5'] || check['p:5'] && check['p:6'] || check['p:5']) {
                    current.y(el._y - current._height);
                    f(true, check);
                } else if (check['p:6'] && check['p:7'] || check['p:7'] && check['p:0'] || check['p:7']) {
                    current.x(el._x + el._width);
                    f(true, check);
                }
            }
        });
    }
    return this;
};

module.exports = function (_options) {
    return new COLLIDER(_options);
};