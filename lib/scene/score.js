'use strict';

var _time = void 0;
var _collected = void 0;
var _last = void 0;
var width = void 0;
var height = void 0;
module.exports = {
    set: function set(_parent, _width, _height) {
        width = _width;
        height = _height;
        _time = document.createElement('div');
        _time.style.position = 'absolute';
        _time.style.left = width / 2 - height / 7 + 'px';
        _time.style.top = height / 28 + 'px';
        _time.style.width = height / 3.5 + 'px';
        _time.style.height = height / 28 + 'px';
        _time.style.fontSize = height / 35 + 'px';
        _time.style.textAlign = 'center';
        _time.style.fontFamily = 'monospace';
        _parent.appendChild(_time);

        _collected = document.createElement('div');
        _collected.style.position = 'absolute';
        _collected.style.left = width / 2 - height / 7 + 'px';
        _collected.style.top = height / 13 + 'px';
        _collected.style.width = height / 3.5 + 'px';
        _collected.style.height = height / 28 + 'px';
        _collected.style.fontSize = height / 55 + 'px';
        _collected.style.textAlign = 'center';
        _collected.style.fontFamily = 'monospace';
        _parent.appendChild(_collected);

        _last = document.createElement('div');
        _last.style.position = 'absolute';
        _last.style.left = width / 2 - height / 7 + 'px';
        _last.style.top = height / 4.2 + 'px';
        _last.style.width = height / 3.5 + 'px';
        _last.style.height = height / 28 + 'px';
        _last.style.fontSize = height / 48 + 'px';
        _last.style.textAlign = 'center';
        _last.style.fontFamily = 'monospace';
        _last.style.color = '#bbb';
        _parent.appendChild(_last);
    },
    time: function time(value) {
        _time.innerHTML = value + ' sec';
    },
    collected: function collected(count, length) {
        _collected.innerHTML = 'features ' + count + ' of ' + length;
    },
    last: function last(name) {
        _last.innerHTML = name;
    },
    hide: function hide() {
        _time.style.display = 'none';
        _collected.style.display = 'none';
        _last.style.display = 'none';
    },
    show: function show() {
        _time.style.display = 'block';
        _collected.style.display = 'block';
        _last.style.display = 'block';
    }
};