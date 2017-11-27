'use strict';

var title = void 0;
var width = void 0;
var height = void 0;
module.exports = {
    set: function set(_parent, _width, _height) {
        width = _width;
        height = _height;
        title = document.createElement('div');
        title.style.position = 'absolute';
        title.style.left = 0;
        title.style.top = height / 10 + 'px';
        title.style.width = width + 'px';
        title.style.height = height / 9 + 'px';
        title.style.fontSize = height / 9 + 'px';
        title.style.textAlign = 'center';
        title.style.color = '#cccccc';
        title.style.fontFamily = 'monospace';
        title.style.opacity = 0.5;
        _parent.appendChild(title);
    },
    text: function text(_text) {
        title.innerHTML = _text;
    },
    show: function show() {
        title.style.display = 'block';
    },
    hide: function hide() {
        title.style.display = 'none';
    }
};